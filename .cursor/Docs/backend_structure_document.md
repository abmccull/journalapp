# Backend Structure Document

This document outlines the backend architecture, hosting, and infrastructure of the Guided Journal App. It is written in everyday language to ensure clarity for both technical and non-technical readers.

## 1. Backend Architecture

**Overview**  
Our backend is a single Node.js service built with Fastify. It handles user authentication, journal entry storage, AI calls, voice transcription, and background tasks. The service follows a simple layered pattern:

- **Routes/Controllers:** Receive HTTP requests, validate inputs, and send responses.  
- **Services:** Contain business logic (e.g., handling journal entries, calling AI, orchestrating voice processing).  
- **Data Access (Repositories):** Interact with Firestore and Firebase Storage.  
- **Background Workers:** Process long-running tasks (voice transcription via Whisper, scheduled nudges).

**How it supports scalability, maintainability, and performance**  
- **Scalability:** We can run multiple service instances behind a load balancer. Firestore automatically scales to handle many concurrent reads/writes.  
- **Maintainability:** Clear separation of concerns (controllers vs. services vs. repositories) makes the code easy to update and extend.  
- **Performance:** Fastify’s lightweight framework delivers low overhead. We batch Firestore reads/writes where possible and cache frequent reads (e.g., prompt packs).

## 2. Database Management

**Database Technology**  
- Type: NoSQL, document-based.  
- System: Google Firebase Cloud Firestore.

**Data Storage & Access**  
- **Collections & Documents:** Data is organized into top-level collections (`users`, `entries`, `photos`). Each document is a self-contained record.  
- **Real-Time Sync:** Firestore SDK on the mobile app keeps UI in sync with the database.  
- **Offline Support:** Not in MVP—app requires always-on connectivity.  
- **Storage for Media:** User photos and voice recordings are stored in Firebase Storage (backed by Google Cloud Storage).

**Data Management Practices**  
- **Atomic Writes & Transactions:** Used for critical multi-document updates (e.g., creating an entry with photos).  
- **Security Rules:** Firestore rules enforce that users can only read/write their own documents.  
- **Backups:** Firestore’s daily export feature stores backups in a secure GCS bucket.

## 3. Database Schema (NoSQL)

All schemas refer to Firestore collections. Field types are strings, numbers, booleans, timestamps, or nested objects.

1. **users** collection:
   • id (string): Firebase Auth UID  
   • email (string)  
   • tz (string): time zone  
   • prompt_pack (string): current pack ID (daily, weekly, monthly)  
   • created_at (timestamp)

2. **entries** collection:
   • id (string)  
   • user_id (string): reference to users/id  
   • date (string): ISO date (YYYY-MM-DD)  
   • raw_json (object): user’s raw answers and metadata  
   • polished_html (string): AI-polished journal entry  
   • created_at (timestamp)

3. **photos** collection:
   • id (string)  
   • entry_id (string): reference to entries/id  
   • storage_path (string): path in Firebase Storage  
   • caption (string, optional)

4. **notifications** collection (for scheduled nudges):
   • id (string)  
   • user_id (string)  
   • type (string): daily_reminder, smart_nudge  
   • scheduled_for (timestamp)  
   • delivered (boolean)

## 4. API Design and Endpoints

We use a RESTful design. All endpoints require a valid Firebase Auth token in the `Authorization` header (`Bearer <token>`).

Base URL: `https://api.yourjournalapp.com/v1`

### Authentication
- `POST /auth/social-login`  
  • Purpose: Exchange Google or Apple social token for a Firebase custom token.  
  • Body: `{ provider: "google" | "apple", token: string }`  
  • Response: `{ firebaseToken: string }`

### Journal Entries
- `GET /entries?start=YYYY-MM-DD&end=YYYY-MM-DD`  
  • List user entries in a date range.  
- `POST /entries`  
  • Create a new entry.  
  • Body: `{ date, raw_json }`  
- `GET /entries/:entryId`  
  • Fetch a single entry.  
- `PUT /entries/:entryId`  
  • Update raw or polished content (within a 24-hour window).  
- `DELETE /entries/:entryId`  
  • Remove an entry.

### Photos
- `POST /entries/:entryId/photos`  
  • Upload up to 5 photos. Returns signed URLs for direct upload to Firebase Storage.  
- `GET /entries/:entryId/photos`  
  • List photo metadata.  
- `DELETE /photos/:photoId`  
  • Delete a single photo.

### AI Polishing
- `POST /entries/:entryId/polish`  
  • Trigger GPT-4o polishing on raw_json.  
  • Response: `{ polished_html }` (stored automatically).

### Voice Transcription
- `POST /entries/:entryId/transcribe`  
  • Accepts a voice file URL, enqueues a Whisper transcription job.  
  • Response: `{ jobId }`.
- `GET /transcriptions/:jobId`  
  • Check job status and retrieve transcript.

### Insights & Analytics
- `GET /insights/streak`  
  • Returns current streak count.  
- `GET /insights/mood`  
  • Returns mood bar data.  
- `GET /insights/wordcloud`  
  • Returns word frequencies for user entries.

## 5. Hosting Solutions

- **Backend API:** A DigitalOcean Droplet running Ubuntu, with Docker containers for the Node.js service and background workers.  
- **Database & Storage:** Firebase Firestore and Firebase Storage (Google Cloud’s managed services).  
- **Static Assets & Marketing Site:** Next.js deployed on Vercel.  

**Benefits**  
- **Reliability:** Managed services (Firestore/Storage) guarantee 99.9% uptime.  
- **Scalability:** We can resize the Droplet or move to a Kubernetes cluster as traffic grows.  
- **Cost-effectiveness:** Pay-as-you-grow pricing for both DigitalOcean and Firebase.

## 6. Infrastructure Components

- **Load Balancer:** DigitalOcean Load Balancer routes traffic to one or more Droplet instances over HTTPS.  
- **CDN for Media:** Firebase Storage uses Google’s global CDN to serve photos with low latency.  
- **Caching Layer:** In-memory cache (Node.js built-in or Redis) for prompt pack data and frequent reads.  
- **Background Job Queue:** A lightweight queue (e.g., Bull with Redis) runs transcription and scheduled notification jobs separately from the main API.  
- **Reverse Proxy:** Nginx handles TLS termination, request buffering, and health checks before forwarding to Fastify.

## 7. Security Measures

- **Authentication:** Firebase Authentication with email/password, Google, and Apple providers.  
- **Authorization:** Every request checks the Firebase JWT. Firestore Security Rules enforce data isolation per user.  
- **Encryption:**  
  • In transit: TLS 1.2+ on all endpoints.  
  • At rest: Firestore and Storage are encrypted by default.  
- **Input Validation & Sanitization:** Fastify schemas validate all incoming payloads.  
- **Rate Limiting & Throttling:** Protects AI and transcription endpoints from abuse.  
- **Server Hardening:** Ubuntu’s unattended security updates, firewall rules limiting ports to 80/443/22.

## 8. Monitoring and Maintenance

- **Application Monitoring:**  
  • DigitalOcean Monitoring for CPU, memory, disk, and network.  
  • Sentry for Node.js error tracking.  
- **Logging:** Winston logs all requests and errors to a central log file, rotated daily, and shipped to a log-aggregation service.  
- **Alerts:** PagerDuty alerts on high error rates or Droplet resource exhaustion.  
- **Maintenance Strategies:**  
  • Weekly dependency updates via Dependabot.  
  • Monthly security audit of Firebase Rules and server configurations.  
  • Automated backups of Firestore exports and Droplet snapshots.

## 9. Conclusion and Overall Backend Summary

Our backend combines a lightweight Node.js (Fastify) service on DigitalOcean with managed Firebase services to deliver a scalable, maintainable, and secure journal platform. Key highlights:

- **Real-time, document-based storage** with Firestore for seamless syncing.  
- **AI and voice processing** handled centrally to keep the client app simple.  
- **Clear separation** of concerns (API, services, workers) for ease of development.  
- **Robust hosting and monitoring** ensure reliability and quick response to issues.  

This setup aligns with the project’s goals of quick capture, polished reflection, and strong user privacy, providing a solid foundation for future growth and feature expansion.