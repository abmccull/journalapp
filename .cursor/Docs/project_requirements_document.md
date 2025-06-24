# Guided Journal App – Project Requirements Document (PRD)

## 1. Project Overview

The Guided Journal App helps people capture life’s highlights, lessons, and feelings in just a few minutes each day. Instead of an open blank page, users get 3–5 meaningful prompts (e.g., highlight, lesson, gratitude) to answer by typing or speaking. An AI engine then polishes those raw answers into a concise, 200-word narrative that’s easy to read and reflect on. Built-in voice dictation, photo attachments, calendar browsing, and insightful analytics make it feel both delightful and habit-forming—while strong privacy measures keep entries secure and personal.

We’re building this app to solve the friction and abandonment common in traditional journaling. The core objectives for the first release are:

*   **Frictionless capture:** Users spend under 2 minutes per session, answering prompts via text or voice.
*   **Daily retention:** Achieve over 40 % of new users maintaining a 7-day journaling streak.
*   **Beautiful reflection:** Entries are easy to browse, well-formatted, and enjoyable to revisit.
*   **Privacy by default:** True end-to-end encryption, user-controlled keys, and optional social login (Google, Apple).

## 2. In-Scope vs. Out-of-Scope

**In-Scope (MVP)**

*   Guided prompt packs (daily, weekly, monthly) driven from an in-app CMS interface
*   Text and voice capture (native dictation + Whisper fallback)
*   Photo attachments (up to 5 per entry, auto-compressed to 1080×1080)
*   AI polishing with GPT-4o on save, plus manual edit before final save
*   Calendar grid and swipeable Entry Detail view
*   Insights dashboard (streak ring, mood bars, word cloud, monthly top memory)
*   Keyword/date-range search and filter
*   Custom push reminders and smart nudges
*   Email/password plus Google and Apple social authentication
*   True end-to-end encryption for entry data

**Out-of-Scope (Post-MVP)**

*   Data export (PDF, JSON, Markdown)
*   Offline journaling or sync queue
*   Physical book printing or vision-AI photo captions
*   Social feed or public sharing
*   Advanced analytics integrations (Amplitude, Sentry)

## 3. User Flow

When a user launches the app, they see a splash screen while the app checks for an existing session. If they’re not signed in, they land on authentication options (email/password, Google, Apple). After logging in, first-time users go through a short onboarding: choose a prompt pack, set daily reminder time, and confirm privacy settings. Returning users skip onboarding and go straight to the Home screen.

On Home, users see today’s date, their current streak ring, and three main buttons: Start Journaling, Calendar, and Insights. Tapping “Start Journaling” launches the guided prompt flow (3–5 cards supporting text or voice input and photo attachments). After answering, they review raw Q&A, tap “Polish” to run AI summarization, make any final tweaks, and hit “Save.” The entry is encrypted and stored, and the user returns to Home. From Home, users can also browse past entries on the Calendar grid (tap a date, swipe left/right between entries) or view the Insights dashboard via the bottom tab. A Settings tab lets them switch prompt packs, adjust reminders, and manage encryption keys.

## 4. Core Features

*   **Guided Prompt Packs**\
    • Daily (Highlight, Lesson, Gratitude) + weekly/monthly reflections\
    • Editable via simple CMS backend interface
*   **Voice & Text Capture**\
    • Native keyboard dictation on iOS/Android\
    • Fallback audio recording (max 5 min) → on-device Whisper transcription
*   **Photo Attachments**\
    • Up to 5 images per entry, client-side compression to 1080×1080 + captions
*   **AI Polishing**\
    • GPT-4o transforms raw Q&A into ~200-word narrative in Markdown/HTML\
    • Automatic on save, editable side-by-side with raw text
*   **Review & Edit**\
    • 24-hour edit window for raw and polished content
*   **History Browsing**\
    • Calendar grid with filled-circle indicators, tap for Entry Detail\
    • Swipe left/right to move between entries
*   **Insights Dashboard**\
    • Streak ring, mood bars, word cloud, monthly top memory carousel
*   **Search & Filter**\
    • Keyword search, tag chips, date-range filter integrated with calendar
*   **Push Reminders**\
    • Custom daily time, smart nudges if a day is missed, milestone celebrations
*   **Settings**\
    • Prompt pack switcher, reminder scheduler, encryption key management, sign out

## 5. Tech Stack & Tools

*   **Mobile App:** React Native + Expo (EAS) with TypeScript

*   **Web/Marketing Site:** Next.js deployed on Vercel

*   **Authentication & Database:** Supabase (Postgres + Storage + built-in RLS)

*   **Backend API:** Node.js with Fastify on a DigitalOcean Droplet

*   **Voice Processing:** Native dictation APIs + Expo Audio + Whisper fallback

*   **AI Integration:** OpenAI GPT-4o for summarization

*   **Notifications & OTA Updates:** Expo Notifications & Expo Updates

*   **IDE & AI Coding Tools:**

    *   Cursor (real-time AI suggestions)
    *   Windsurf (integrated AI coding assistance)

## 6. Non-Functional Requirements

*   **Performance:**\
    • App opens in <1 s (cold) and <200 ms (warm)\
    • AI polishing call returns within 2 s average\
    • Photo compression + upload under 3 s on typical LTE
*   **Security & Privacy:**\
    • True end-to-end encryption: only user holds decryption keys\
    • TLS in transit + zero-trust server-side logic\
    • GDPR-style data deletion on user request
*   **Usability:**\
    • 200 ms touch-feedback animations\
    • Readable font sizes (min 16 px) and accessible color contrast
*   **Reliability:**\
    • 99.5 % API uptime target\
    • Graceful error handling for network failures

## 7. Constraints & Assumptions

*   **Connectivity:** Always-on internet connection required (no offline mode).
*   **Encryption:** True end-to-end is preferred; server-side at-rest encryption as fallback.
*   **Voice Fallback:** Max 5 min recordings, original audio deleted post-transcription.
*   **Photo Limits:** Up to 5 photos per entry, auto-compressed to 1080×1080.
*   **Edit Window:** 24 hours post-save for raw and polished content.
*   **CMS:** Built in the backend / admin UI; no external CMS.
*   **Analytics:** No third-party analytics (e.g., Amplitude) in MVP.
*   **Accessibility:** Standard touch targets; no screen-reader or large-font support required for MVP.

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limits:** GPT-4o calls can hit quotas—cache prompts and batch requests where possible.
*   **Encryption Key Management:** Users losing keys means lost data—consider backup recovery flow in future.
*   **Transcription Accuracy:** Whisper on-device may mis-transcribe in noisy environments—display text for correction before saving.
*   **Image Upload Performance:** Large file sizes can slow sync—ensure aggressive client-side compression.
*   **Connectivity Requirements:** Without offline support, network outages block journaling—monitor connectivity and inform users promptly.
*   **Cross-Platform Dictation Variance:** iOS vs. Android dictation APIs behave differently—test flows on both devices.

This document fully defines the requirements, user journeys, core features, tech stack, constraints, and potential pitfalls for the Guided Journal App MVP. Subsequent technical blueprints (Tech Stack Doc, Frontend Guidelines, Backend Structure, etc.) can be generated directly from this PRD without ambiguity.
