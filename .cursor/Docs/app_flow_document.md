# Guided Journal App Flow Document

## Onboarding and Sign-In/Sign-Up

When a user first launches the app, they see a brief splash animation while the app checks for an existing session token. If a valid token exists, the user is automatically signed in and taken to the Home screen. If not, the user arrives at the Authentication screen, which offers sign-up and sign-in options. The sign-up flow allows creating an account with email and password or using social login through Google or Apple. After entering their credentials or completing the social login flow, the user is asked to confirm their email address via a link sent to their inbox. If the user forgets their password, they can tap the “Forgot Password” link, enter their email, and receive a reset link. Once they set a new password, they return to the sign-in screen. Signing out is available at any time through the Settings tab, which clears the session token and returns the user to the Authentication screen.

## Main Dashboard or Home Page

After signing in or completing onboarding, the user lands on the Home screen. At the top, today’s date is displayed alongside a circular streak indicator showing consecutive journaling days. Below this, quick-access buttons invite the user to “Start Journaling,” view the Calendar, or explore Insights. The bottom navigation bar allows switching between Home, Calendar, Insights, and Settings. A subtle banner may appear at the top if the app loses network connectivity, reminding the user that entries require an active connection. From this Home view, tapping any of the primary buttons takes the user deeper into journaling or reflection features.

## Detailed Feature Flows and Page Transitions

### Guided Journaling Flow

Tapping the “Start Journaling” button launches a sequence of three to five guided prompts. Each prompt appears on its own screen with space for typed input or voice dictation. The user can attach up to five photos per prompt, each compressed client-side to a maximum of 1080×1080 resolution. After answering all prompts, the user reaches a Review screen that displays their raw question-and-answer responses. A “Polish” button invokes the AI integration, which converts the raw text into a cohesive 200-word narrative. Once the polished narrative appears, the user can toggle between the raw and polished views, make any manual edits within the 24-hour edit window, and then tap “Save.” The entry is encrypted end-to-end, stored in the database, and the user is returned to the Home screen with an updated streak ring.

### History Browsing and Entry Details

From either the Home screen or by tapping the Calendar icon in the bottom bar, the user navigates to the Calendar view. This screen displays a month-grid with each day marked if an entry exists. Selecting a specific date opens the Entry Detail screen, which shows the polished narrative, attached photos with captions, and metadata such as entry timestamp. The user can swipe left or right to move chronologically between entries without returning to the calendar. An Edit icon in the header is active only within 24 hours of entry creation. If tapped, it returns the user to the Review screen where raw and polished content can be updated.

### Insights Dashboard

The Insights screen, accessible from the bottom navigation, visualizes journaling habits. At the top, a streak ring highlights the current streak length. Beneath that, mood bars aggregate mood data over recent entries. A scrolling word cloud shows frequently used terms, while a horizontal carousel surfaces the month’s top memories. At the bottom, summary metrics track average time to complete an entry and AI polishing acceptance rate. From Insights, tapping any data point (for example, a bar or word in the cloud) filters the Calendar or Entry Detail to show matching entries.

### Search and Filter Modal

While on the Calendar or Home screen, tapping the search icon opens a full-screen modal. The user can type keywords, select tag chips, or set a date range. Matching entries appear in a list view sorted by date. Tapping a result navigates directly to its Entry Detail screen. Closing the modal returns the user to their previous view.

## Settings and Account Management

The Settings tab houses personal and app configuration. Within Settings, the user can switch their prompt pack between daily, weekly, or monthly packs. They can configure their daily reminder time for push notifications and toggle smart nudges for missed days. Under Account, the user sees their email address, can initiate a password change, or request account deletion, which explains the consequences before asking for confirmation. The user can also access encryption settings to rotate their key or review end-to-end encryption status. A prominent Sign Out button clears the session and returns to the Authentication screen. At any point after changing settings, tapping the app logo in the header or using the bottom navigation bar returns them to the Home screen.

## Error States and Alternate Paths

If the user enters invalid credentials during sign-in or sign-up, a clear inline error message explains the issue and prompts correction. During journaling, if photo uploads fail or the AI service is unreachable, an inline banner appears with an error icon and message, and buttons to retry or skip the step. Network interruptions trigger a persistent banner on the Home screen warning that an internet connection is required. Attempting to navigate to a feature while offline displays a modal explaining the limitation. If the user taps the AI Polish button and the service times out, they see a retry option. In password recovery, an invalid or expired token yields a message to request a new reset link.

## Conclusion and Overall App Journey

From first launch to daily habit, the Guided Journal App takes a new user through a brief splash, seamless sign-up with email or social providers, and a friendly onboarding flow to choose prompts and reminders. Upon reaching Home, users easily capture daily highlights in minutes through voice or text, attach photos, and enjoy AI-polished stories. Browsing past entries via the calendar and swiping through memories feels natural, while the Insights dashboard keeps motivation high. Settings and account controls remain just a tap away, and error handling ensures users never feel stuck. Over time, the app supports a private, habit-forming journaling experience that delivers consistent value and delightful reflections every day.
