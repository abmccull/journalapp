require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Detailed system prompt for polishing journal entries
const systemPrompt = `You are a master memoir editor entrusted with turning one day’s raw reflections, answers, and photo captions into a timeless journal entry that feels unmistakably written by its author.

**Voice & Tone**
• Preserve the writer’s natural word choices, humor, and idioms.  
• Edit lightly for clarity, flow, and vivid imagery; never add facts that aren’t implied.  
• Use first-person, active voice, and sensory detail.  
• Final length target: keep the polished narrative within 100–150 words of the raw input’s word count. Scale up or down only when the raw entry is extremely short (<75 words) or very long (>500 words).

**Narrative Shape**
1. Opening line – set the scene or mood of the day in one sentence.  
2. Body – weave the day’s highlight, lesson learned, and gratitude into a cohesive story (1-3 paragraphs).  
3. Closing reflection – end with a forward-looking or thoughtful takeaway.

**HTML Layout (strict – fill in the placeholders)**
\`\`\`html
<article>
  <h2 class="date">{{DATE}}</h2>
  <section class="entry">
    <p>{{PARAGRAPH_1}}</p>
    <!-- add <p> blocks as needed -->
  </section>
  {{#if PHOTOS}}
  <section class="media">
    {{#each PHOTOS}}
    <figure>
      <img src="{{url}}" alt="{{alt}}">
      <figcaption>{{alt}}</figcaption>
    </figure>
    {{/each}}
  </section>
  {{/if}}
</article>
\`\`\`

**Formatting Rules**
• Convert line breaks in raw input to proper <p> blocks—never <br>.  
• Omit the entire <section class="media"> when no photos exist.  
• No inline styles, external links, additional classes, or IDs.  
• Do not mention that you are an AI.  
• Return only the complete HTML.`;

// Register CORS
fastify.register(require('@fastify/cors'), {
  origin: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : '*',
});

// Rate limiting: 100 requests per 15 minutes per IP by default
fastify.register(require('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '15 minutes',
});

// Authentication preHandler
fastify.decorate('authenticate', async function (request, reply) {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return reply.status(401).send({ error: 'Missing access token' });
  }
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return reply.status(401).send({ error: 'Invalid or expired session' });
  }
  request.user = user;
});

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Get entries for a user with cursor-based pagination
fastify.get('/api/entries', { preHandler: fastify.authenticate }, async (request, reply) => {
  try {
    
        const { limit = 20, cursor } = request.query;

    let query = supabase
      .from('entries')
      .select('*, photos(*)')
      .eq('user_id', request.user.id)
      .order('date', { ascending: false })
      .limit(Number(limit));

    if (cursor) {
      // fetch entries created before the cursor date
      query = query.lt('date', cursor);
    }

    const { data: entries, error: entriesError } = await query;

    if (entriesError) {
      return reply.status(500).send({ error: entriesError.message });
    }

    // Provide nextCursor based on last entry
    const nextCursor = entries.length > 0 ? entries[entries.length - 1].date : null;
    return { entries, nextCursor };
  } catch (error) {
    return reply.status(500).send({ error: 'An unexpected error occurred.' });
  }
});

// Update an entry (edit raw_text)
fastify.patch('/api/entries/:id', { preHandler: fastify.authenticate }, async (request, reply) => {
  const { id } = request.params;
  const { raw_text } = request.body;
  if (!raw_text) return reply.status(400).send({ error: 'raw_text required' });

  const { data, error } = await supabase
    .from('entries')
    .update({ raw_text, polished_html: null })
    .eq('id', id)
    .eq('user_id', request.user.id)
    .select()
    .single();

  if (error) return reply.status(500).send({ error: error.message });
  return data;
});

// Delete an entry
fastify.delete('/api/entries/:id', { preHandler: fastify.authenticate }, async (request, reply) => {
  const { id } = request.params;
  const { error } = await supabase
    .from('entries')
    .delete()
    .eq('id', id)
    .eq('user_id', request.user.id);

  if (error) return reply.status(500).send({ error: error.message });
  return { success: true };
});

// Polish an entry
fastify.post('/api/entries/:id/polish', { preHandler: fastify.authenticate }, async (request, reply) => {
  try {
    const { id } = request.params;
    const { data: entry, error: fetchError } = await supabase
      .from('entries')
      .select('raw_text')
      .eq('id', id)
      .eq('user_id', request.user.id)
      .single();

    if (fetchError) {
      return reply.status(404).send({ error: 'Entry not found.' });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: entry.raw_text },
      ],
      model: 'gpt-4o',
    });

    const polishedHtml = completion.choices[0].message.content;

    const { data: updatedEntry, error: updateError } = await supabase
      .from('entries')
      .update({ polished_html: polishedHtml })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      return reply.status(500).send({ error: updateError.message });
    }

    return updatedEntry;
  } catch (error) {
    return reply.status(500).send({ error: 'An unexpected error occurred.' });
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
