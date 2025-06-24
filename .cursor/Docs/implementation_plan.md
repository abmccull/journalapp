### Implementation Plan

#### Phase 1: Environment Setup

1. **Prevalidation**: Check if the current directory is already a project before initializing a new project.

2. **Node.js Installation**: Verify if Node.js v20.2.1 is installed. If not, install it. **(Tech Stack: Core Tools)**
   - **Validation**: Run `node -v` to confirm the correct installation.

3. **Python Installation**: Verify if Python 3.11.4 is installed. If not, install it. **(Tech Stack: Core Tools)**
   - **Validation**: Run `python --version` to confirm the correct installation.

4. **Supabase Configuration**: If Supabase is used, configure it for connecting to MCP.
   - **Cursor**:
     1. Create a `.cursor` directory in the project root if it doesn't exist.
     2. Create a `.cursor/mcp.json` file if it doesn't exist and open it.
     3. Add `.cursor/mcp.json` to .ignore.
     4. Add the following configuration:
        - **macOS**: `{ "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } }}`
        - **Windows**: `{ "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "`<connection-string>`"] } }}`
     5. Display the following link for the user to get the connection string: `https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp`.
     6. Navigate to **Settings/MCP**. Ensure a green active status after the server is successfully connected.
   - **Windsurf**:
     1. Navigate to the Cascade assistant.
     2. Tap on the hammer (MCP) icon, then **Configure** to open the configuration file.
     3. Add the following configuration:
        - **macOS**: `{ "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } }}`
        - **Windows**: `{ "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "`<connection-string>`"] } }}`
     4. Display the following link for the user to get the connection string: `https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp`.
     5. Save the configuration file and reload by tapping **Refresh** in the Cascade assistant.

5. **Cursor Metrics**: Create a `cursor_metrics.md` file in the root of the project and refer to `cursor_project_rules.mdc` to understand what to do with the `cursor_metrics.md` file.

#### Phase 2: Frontend Development

6. **React Native Setup**: Initialize a new React Native project using Expo EAS. **(Tech Stack: Mobile)**
   - **Validation**: Run `expo start` to ensure the project is set up correctly.

7. **UI Components**: Develop UI components for the Splash, Auth, and Onboarding screens. **(PRD Section 7)**
   - **Validation**: Ensure components match the design specs in the PRD.

8. **Routing**: Implement navigation between Splash, Auth, and Onboarding screens using React Navigation. **(User Flow)**
   - **Validation**: Test navigation flow to ensure smooth transitions.

9. **Social Login Integration**: Implement Google and Apple social login alongside email authentication. **(Q&A: Social Login Providers)**
   - **Validation**: Test login functionality for each provider.

#### Phase 3: Backend Development

10. **Supabase Database Setup**: Use Supabase MCP server to create the required tables and relations in PostgreSQL. **(Tech Stack: Auth & DB)**
    - **Schema**:
      ```sql
      users(id, email, tz, prompt_pack, created_at)
      entries(id, user_id, date, raw_json, polished_html, created_at)
      photos(id, entry_id, storage_path, caption)
      ```
    - **Validation**: Verify tables and relations are correctly set up in Supabase.

11. **API Development**: Develop backend APIs using Node (Fastify/NestJS) for user authentication and data management. **(Tech Stack: Backend API)**
    - **Validation**: Test API endpoints using Postman or a similar tool.

12. **End-to-End Encryption**: Implement true end-to-end encryption for user data. **(Q&A: Encryption)**
    - **Validation**: Ensure only users can decrypt their entries.

#### Phase 4: Integration

13. **Frontend-Backend Connection**: Connect the frontend with the backend APIs for authentication and data retrieval. **(App Flow)**
    - **Validation**: Test the complete user flow from login to data display.

14. **Conflict Resolution**: Resolve any integration conflicts between frontend and backend. **(Integration)**
    - **Validation**: Ensure seamless data flow and functionality.

#### Phase 5: Deployment

15. **Cloud Deployment**: Deploy the backend to a DigitalOcean droplet and the frontend to Vercel. **(Tech Stack: Deployment)**
    - **Validation**: Access the deployed application to ensure it is live and functional.

16. **CI/CD Setup**: Implement continuous integration and deployment pipelines for automated testing and deployment. **(Deployment)**
    - **Validation**: Verify the CI/CD pipeline triggers on code commits.

#### Edge Case Handling

17. **Photo Compression**: Implement auto-compression for photo uploads to optimize storage. **(Q&A: Photo Attachments)**
    - **Validation**: Test photo uploads to ensure compression is applied.

18. **Voice Recording Management**: Set a maximum recording length and discard original audio files after transcription. **(Q&A: Voice Recordings)**
    - **Validation**: Ensure recordings are transcribed and originals are deleted.

19. **AI Polishing**: Implement AI polishing for journal entries after submission. **(Q&A: AI Polishing)**
    - **Validation**: Verify AI polishing is applied and users can edit the output.

20. **Error Handling**: Implement error handling for API failures and user input errors. **(Integration)**
    - **Validation**: Test error scenarios to ensure proper handling and user feedback.

This implementation plan outlines the steps necessary to develop and deploy the Guided Journal App, ensuring all technical and functional requirements are met.