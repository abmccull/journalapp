# Frontend Guideline Document

## 1. Frontend Architecture

### Mobile App (Guided Journal App)

*   **Framework & Language**: React Native + Expo (EAS) using TypeScript
*   **Navigation**: React Navigation (stack and bottom tabs)
*   **Data & Auth**: Supabase client (Postgres + Storage + Row Level Security) with JWT tokens
*   **Voice & Media**: Expo Audio + native dictation APIs + Whisper fallback
*   **AI Integration**: OpenAI GPT-4o calls via secure backend endpoints
*   **Notifications & OTA**: Expo Notifications & Expo Updates for push reminders and over-the-air code updates
*   **Build & Deployment**: EAS Build for Android/iOS binaries

This layered approach keeps presentation, business logic, and data access separate. It scales as features grow (new screens, new media types), stays maintainable (TypeScript types, clear folder structure), and performs well (native modules for audio, lazy loaded screens).

### Web/Marketing Site

*   **Framework & Language**: Next.js (React + TypeScript) deployed on Vercel
*   **Styling**: Tailwind CSS for utility-first styling
*   **Content**: Static site generation (SSG) for marketing pages, serverless functions for any dynamic content
*   **Analytics & SEO**: Built-in Next.js support for meta tags, sitemap, and robots

The marketing site uses SSR/SSG for fast load times and good SEO while sharing UI components (brand styles) with the mobile app when possible.

## 2. Design Principles

1.  **Usability**: Minimal taps and clear prompts. Capture sessions take under 2 minutes.
2.  **Accessibility**: High-contrast colors, screen-reader labels, touch targets ≥ 44px, VoiceOver/ TalkBack support.
3.  **Responsiveness**: Flexible layouts that adapt to mobile screens and web breakpoints.
4.  **Consistency**: Reusable components, unified iconography (Tabler Icons), and consistent spacing and motion.
5.  **Privacy by Default**: Visual cues when encryption is active, clear wording around security.

These principles guide every screen and interaction. For example, the journaling screen uses large, legible text inputs and clear “Save” buttons, while the insights dashboard highlights data in easy-to-read charts.

## 3. Styling and Theming

### CSS Methodology

*   **Mobile**: styled-components/native for scoped, theme-driven styles
*   **Web**: Tailwind CSS for rapid utility styling and responsive classes

### Theming

*   Single theme file defining colors, font sizes, spacing, and border radii
*   Theme provider (styled-components ThemeProvider) wraps the app
*   Dark mode ready (future enhancement)

### Visual Style

*   **Look & Feel**: Modern flat design with subtle shadows, light glassmorphism on cards (semi-transparent background blur)
*   **Motion**: 200 ms ease-out slide transitions, 120 ms scale tap animation for interactive elements

### Color Palette

*   Snow White: #FFFFFF
*   Ink Black: #000000
*   Pacific Blue: #1CA7EC
*   Mist Gray: #F4F6F8
*   Lime Accent: #A4C639

### Typography

*   **Font Family**: Inter
*   **Weights**: 700 (bold), 500 (medium), 400 (regular)
*   **Base Size**: 16 px with 1.5 rem line-height

### Iconography

*   Tabler Icons set, 2 px stroke, rounded corners

## 4. Component Structure

*   **src/components/**: Shared UI elements (Button, Card, Input, Icon)
*   **src/screens/** (mobile) or **pages/** (web): Higher-level views composed of components
*   **src/hooks/**: Custom hooks for data fetching, voice recording, permission checks
*   **src/context/**: Context providers for theme, auth, prompts
*   **src/utils/**: Helpers for date formatting, encryption, image compression

**Benefits**: Components are self-contained, reusable, and focused. This speeds up development and makes the code easier to maintain and test.

## 5. State Management

*   **Local UI State**: React Context API + useReducer for global UI concerns (theme, loading indicators)
*   **Server Data**: React Query (TanStack Query) for caching, syncing, and background refetching of journals, prompts, insights
*   **Auth State**: Supabase Auth listener in context, stored in secure storage (Expo SecureStore)

This layered approach ensures smooth UI updates, reduces redundant network calls, and provides offline capabilities for recently fetched data.

## 6. Routing and Navigation

### Mobile App

*   **React Navigation**:

    *   Bottom Tab Navigator: Home, Calendar, Insights, Settings
    *   Stack Navigator: Onboarding flow, Prompt flow, Entry Detail

*   **Deep Linking**: support for URLs to specific entries or dates

### Web/Marketing Site

*   **Next.js Routes**:

    *   `pages/index.tsx`: Home
    *   `pages/about.tsx`, `pages/pricing.tsx`, `pages/login.tsx`
    *   Built-in catch-all for 404s

Navigation components adapt: mobile uses tabs and header back buttons; web uses a top nav bar and footer links.

## 7. Performance Optimization

*   **Code Splitting**: Lazy-load non-critical screens and components (React.lazy + Suspense)
*   **Asset Optimization**: Automatic image compression (Expo Asset, Next.js Image), SVG icons
*   **Lazy Data Fetching**: React Query’s `useQuery` with `enabled` flags to avoid unnecessary calls
*   **Memoization**: React.memo and useCallback on heavy components
*   **Offline Support**: Cache last journal entries for quick access

These techniques keep initial loads fast and keep the app feeling snappy.

## 8. Testing and Quality Assurance

1.  **Unit Tests**: Jest + React Native Testing Library for components and hooks
2.  **Integration Tests**: Testing Supabase interactions via mocking, verifying flow from recording to save
3.  **End-to-End Tests**: Detox (mobile) and Cypress (web) for critical user flows (signup, journaling, browsing)
4.  **Linting & Formatting**: ESLint (with TypeScript support) and Prettier pre-commit hooks
5.  **Type Checking**: Strict TypeScript configuration to catch errors early

This ensures reliability and prevents regressions as the codebase grows.

## 9. Conclusion and Overall Frontend Summary

This Frontend Guideline Document lays out a clear, scalable, and maintainable setup for both the mobile Guided Journal App and the supporting web site. We’ve chosen React Native + Expo and Next.js to leverage a single language (TypeScript) and share design tokens. The component-based structure, combined with React Query, Context API, and well-defined theming, means new features can be added quickly without sacrificing performance or code quality.

Key differentiators:

*   True end-to-end encryption integrated into the UI
*   AI-powered narrative polishing built right into the journaling flow
*   Rich mobile interactions: voice capture, gestures, haptics

Following these guidelines ensures every team member, from designer to junior developer, can contribute confidently to a user-focused, high-quality product.
