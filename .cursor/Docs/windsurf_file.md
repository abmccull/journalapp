# .windsurfrules

## Project Overview
- **Type:** Mobile & Web Guided Journal App
- **Description:** A guided journaling app to help users capture life’s moments quickly and easily through prompts, voice/text input, and AI polishing.
- **Primary Goal:** Enable users to capture daily journal entries in under two minutes with AI-assisted polishing while ensuring privacy by default.

## Project Structure
### Framework-Specific Routing
- **Directory Rules:**
  - React Native (Expo SDK 48): Use `src/navigation` with `createNativeStackNavigator` for screen-based routing.
  - Next.js 14 (Pages Router): Use `pages/[route].tsx` for marketing site pages.
  - Fastify (Node.js): Use `src/routes` directory with route files registering endpoints in `server.ts`.
- Example 1: Next.js (Pages Router) → `pages/index.tsx`, `pages/about.tsx`, `pages/press.tsx`
- Example 2: React Native → `src/navigation/index.tsx` with `Stack.Screen` components
- Example 3: Fastify → `src/routes/journal.ts` exporting async handlers for CRUD

### Core Directories
- **Versioned Structure:**
  - mobile/src: React Native & Expo TS codebase (screens, components, services)
  - web/pages: Next.js marketing site pages and public assets
  - backend/src: Fastify server with `routes`, `controllers`, `models`, `plugins`
  - shared/utils: Utility functions and type definitions

### Key Files
- **Stack-Versioned Patterns:**
  - App.tsx: Entry point for Expo app initializing navigation
  - src/navigation/index.tsx: React Navigation 6 stack configuration
  - pages/_app.tsx: Next.js Pages Router customization for global styles
  - pages/index.tsx: Marketing site homepage
  - backend/src/server.ts: Fastify server setup
  - backend/src/routes/journal.ts: Journal entry API routes

## Tech Stack Rules
- **Version Enforcement:**
  - react-native@0.71: Must use TypeScript, no deprecated lifecycle methods
  - expo@48: EAS build config required, use `expo-notifications` and `expo-updates`
  - next@14: Pages Router required, no `app/` directory
  - firebase@9: Use modular imports for Firestore, Auth, Storage
  - fastify@4: Register plugins under `src/plugins`; use async/await handlers

## PRD Compliance
- **Non-Negotiable:**
  - "Frictionless capture: < 2 minutes per session.": Journal flow UI and API latency must allow completion under two seconds per step
  - "Privacy by default: End-to-end encryption, user-controlled keys.": All journal content must be encrypted at rest on client and server with user-managed keys

## App Flow Integration
- **Stack-Aligned Flow:**
  - Mobile App Flow → `src/navigation/index.tsx`:
    - SplashScreen → AuthScreen → OnboardingScreen → HomeScreen → JournalFlowScreen → HistoryScreen → InsightsScreen → SettingsScreen
  - Journal Flow → `mobile/src/screens/JournalFlowScreen.tsx` uses Expo Audio & Whisper fallback, image picker, and GPT-4o API
  - Fastify API → `backend/src/routes/journal.ts` with POST `/journal/entry`, GET `/journal/history`, secured via Firebase Auth token