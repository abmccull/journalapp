# Tech Stack Document for Guided Journal App

## Frontend Technologies

*   **React Native**: This framework allows us to build a mobile app using a single codebase for both iOS and Android, which saves time and resources. It also supports over-the-air updates, meaning we can push updates to users without them needing to download a new version from the app store.
*   **Expo EAS**: A set of tools and services built around React Native that simplifies the development process, especially for building, deploying, and updating the app.
*   **Inter Typography**: A modern and clean font that enhances readability and user experience.
*   **Tabler Icons**: Provides a consistent and visually appealing icon set that aligns with our design system.

These technologies ensure that the app is visually appealing, easy to navigate, and performs well across different devices.

## Backend Technologies

*   **Supabase**: Used for both authentication and database management. It provides a Postgres database with real-time capabilities and built-in authentication, which simplifies user management and data storage.
*   **Node.js with Fastify/NestJS**: These frameworks are used to build our backend API. They are known for their speed and efficiency, which is crucial for handling secure GPT calls and background jobs.
*   **DigitalOcean Droplet**: A virtual private server that hosts our backend, providing a reliable and scalable environment for our application.

These backend technologies work together to ensure that data is managed efficiently and securely, supporting the app's functionality.

## Infrastructure and Deployment

*   **Vercel**: Hosts our web and marketing site using Next.js, which allows for fast static delivery and easy deployment.
*   **Expo Notifications & Updates**: Ensures reliable cross-platform push notifications and over-the-air updates, keeping users engaged and informed.
*   **GitHub**: Used for version control, allowing multiple developers to collaborate effectively and track changes in the codebase.

These infrastructure choices ensure that the app is reliable, scalable, and easy to deploy, providing a seamless experience for both developers and users.

## Third-Party Integrations

*   **GPT-4o**: Used for AI polishing of journal entries, providing high-quality summarization and enhancing the user experience by turning raw input into polished narratives.
*   **Whisper**: Provides transcription services for voice recordings, ensuring that users can capture their thoughts in any format they prefer.

These integrations enhance the app's functionality, making it more versatile and user-friendly.

## Security and Performance Considerations

*   **End-to-End Encryption**: Ensures that only the user can decrypt their entries, providing the highest level of privacy and security.
*   **Auto-Compression for Photos**: Reduces file size before upload, optimizing storage and sync performance.
*   **Server-Side At-Rest Encryption**: Provides an additional layer of security for data stored on the server.

These measures ensure that the app is secure and performs well, providing a smooth user experience.

## Conclusion and Overall Tech Stack Summary

The technology choices for the Guided Journal App are designed to create a seamless, secure, and engaging user experience. By leveraging modern frameworks and tools like React Native, Supabase, and GPT-4o, we ensure that the app is both functional and delightful to use. The focus on privacy and performance sets this project apart, aligning with our goal of providing a habit-forming journaling experience that respects user privacy.
