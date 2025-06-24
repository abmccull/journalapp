flowchart TD
Splash --> AuthOnboarding[Auth Onboarding]
AuthOnboarding --> Home[Home]
Home --> StartJournaling[Start Journaling]
StartJournaling --> PromptStack[Prompt Stack]
PromptStack --> ReviewSave[Review And Save]
ReviewSave --> Home
Home --> Calendar[Calendar]
Calendar --> EntryDetail[Entry Detail]
EntryDetail --> Calendar
Home --> Insights[Insights]
Insights --> Home
Home --> Settings[Settings]