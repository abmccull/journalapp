# Security Guidelines for Guided Journal App

## Objective

As an AI agent developing this application, your primary goal is to generate code that is secure, resilient, and trustworthy by design. This document outlines the essential security principles and requirements you must adhere to throughout the entire development lifecycle. Integrate these practices proactively into every component you build.

## Core Security Principles

1.  **Security by Design:** Embed security considerations from the initial design phase through implementation, testing, and deployment. Do not treat security as an afterthought.
2.  **Least Privilege:** Grant components, users, and services only the minimum permissions necessary to perform their intended functions.
3.  **Defense in Depth:** Implement multiple layers of security controls so that the failure of one control does not lead to a complete system compromise.
4.  **Input Validation & Output Encoding:** Treat all external input (from users, APIs, files, environment) as untrusted. Rigorously validate and sanitize inputs, and properly encode outputs to prevent injection and scripting attacks.
5.  **Fail Securely:** Ensure that failures (e.g., errors, exceptions, connection timeouts) do not leave the application or data in an insecure state. Avoid revealing sensitive information in error messages.
6.  **Keep Security Simple:** Complex security mechanisms are harder to implement correctly and maintain. Strive for clarity and simplicity in security controls.
7.  **Secure Defaults:** Configure all components and features with secure settings by default.

## Key Security Requirements & Implementation Areas

### 1. Authentication & Access Control

*   **Implement Robust Authentication:** Ensure strong user identification mechanisms. Avoid missing or weak authentication on any endpoint or resource requiring protection.
*   **Enforce Strong Password Policies:** Mandate complexity, length, and rotation where applicable. Use secure hashing algorithms (e.g., Argon2, bcrypt) with unique salts for password storage.
*   **Secure Session Management:** Generate unpredictable session identifiers, store them securely, enforce timeouts (idle and absolute), and provide mechanisms for secure session termination (logout). Protect against session fixation.
*   **JWT Security:** If using JSON Web Tokens, ensure proper algorithm selection (avoid 'none'), signature validation, expiration checks (exp), and secure key management. Prevent credential stuffing and brute-force attacks.
*   **Implement Multi-Factor Authentication (MFA):** Provide options for MFA, especially for sensitive accounts or actions.
*   **Enforce Role-Based Access Control (RBAC):** Clearly define roles and permissions. Ensure authorization checks are performed server-side for every sensitive operation, preventing privilege escalation. Validate tokens and permissions rigorously.

### 2. Input Handling & Processing

*   **Prevent Injection Attacks:** Use parameterized queries, prepared statements, or reputable ORMs to prevent SQL/NoSQL injection. Sanitize inputs rigorously to prevent command injection. Properly parse and validate XML/JSON inputs.
*   **Mitigate Cross-Site Scripting (XSS):** Implement context-aware output encoding for all user-supplied data displayed in web pages. Utilize content security policies (CSP). Sanitize HTML input effectively.
*   **Validate Redirects & Forwards:** Ensure redirection targets are validated against an allow-list to prevent unvalidated redirects.
*   **Secure File Uploads:** Validate file types, extensions, sizes, and content. Store uploaded files outside the webroot or with restricted permissions. Scan uploads for malware. Prevent path traversal in filenames.
*   **Server-Side Validation:** Never rely solely on client-side validation; always perform comprehensive validation on the server.
*   **Prevent Template Injection:** Sanitize user input before incorporating it into server-side templates.

### 3. Data Protection & Privacy

*   **Encrypt Sensitive Data:** Encrypt sensitive data both at rest (in storage/databases) and in transit (using TLS 1.2+). Never store sensitive data (passwords, PII, API keys) in plaintext.
*   **Use Strong Cryptography:** Employ current, industry-standard encryption algorithms (e.g., AES-256) and secure hashing functions (e.g., SHA-256 or better for integrity checks, Argon2/bcrypt for passwords).
*   **Manage Secrets Securely:** Avoid hardcoding secrets (API keys, passwords, credentials) in source code, configuration files, or environment variables. Use dedicated secrets management solutions (e.g., HashiCorp Vault, AWS Secrets Manager, Azure Key Vault).
*   **Prevent Information Leakage:** Do not expose sensitive information (e.g., stack traces, internal paths, PII) in error messages, logs, or API responses. Implement data masking where appropriate.
*   **Secure Database Connections:** Use secure credentials, encrypt connections, and limit database user privileges.
*   **Protect Personally Identifiable Information (PII):** Adhere to relevant data privacy regulations (e.g., GDPR, CCPA) regarding the collection, storage, processing, and deletion of PII.

### 4. API & Service Security

*   **Enforce HTTPS:** Mandate TLS encryption for all API communication.
*   **Implement Rate Limiting & Throttling:** Protect APIs against denial-of-service and brute-force attacks.
*   **Secure Cross-Origin Resource Sharing (CORS):** Configure CORS policies restrictively, allowing only trusted origins.
*   **Validate and Sanitize API Inputs:** Apply rigorous input validation to all data received via API endpoints.
*   **Proper Authentication & Authorization:** Secure every API endpoint appropriately; avoid exposing unauthenticated or overly permissive endpoints.
*   **Minimize Data Exposure:** Design API responses to return only the necessary data for the specific request (avoid excessive data exposure).
*   **Use Appropriate HTTP Methods:** Enforce correct HTTP verbs (GET, POST, PUT, DELETE, etc.) for intended actions.
*   **Implement API Versioning:** Manage API changes gracefully and securely through versioning.

### 5. Web Application Security Hygiene

*   **Prevent Cross-Site Request Forgery (CSRF):** Use anti-CSRF tokens (e.g., synchronizer token pattern) for state-changing requests.
*   **Implement Security Headers:** Utilize headers like `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
*   **Secure Cookies:** Set `HttpOnly`, `Secure`, and `SameSite` attributes appropriately for cookies.
*   **Protect Against Clickjacking:** Use `X-Frame-Options` or CSP `frame-ancestors`.
*   **Secure Client-Side Storage:** Avoid storing sensitive information in `localStorage` or `sessionStorage`.
*   **Use Subresource Integrity (SRI):** Ensure integrity of third-party scripts and stylesheets loaded from CDNs.

### 6. Infrastructure & Configuration Management

*   **Secure Server Configurations:** Harden operating systems and web/application servers. Disable unnecessary services, features, and default accounts.
*   **Avoid Default Credentials:** Always change default passwords and administrative credentials.
*   **Manage Ports & Services:** Expose only necessary network ports and services.
*   **Keep Software Updated:** Regularly update the operating system, server software, libraries, and dependencies to patch known vulnerabilities.
*   **Secure TLS/SSL Configuration:** Use up-to-date protocols (TLS 1.2+) and strong cipher suites. Disable weak protocols (SSLv3, TLS 1.0/1.1).
*   **Implement Secure File Permissions:** Set restrictive file system permissions.
*   **Disable Debug Features in Production:** Ensure debugging modes, verbose error messages, and diagnostic endpoints are disabled in production environments.

### 7. Dependency Management

*   **Use Secure Dependencies:** Vet third-party libraries and frameworks. Prefer components with active maintenance and good security track records.
*   **Scan for Vulnerabilities:** Integrate Software Composition Analysis (SCA) tools to identify known vulnerabilities (CVEs) in dependencies (including transitive ones).
*   **Keep Dependencies Updated:** Regularly update libraries to patched versions.
*   **Use Lockfiles:** Utilize package lockfiles (`package-lock.json`, `yarn.lock`, `Pipfile.lock`, etc.) to ensure deterministic builds and prevent unexpected updates to potentially vulnerable transitive dependencies.
*   **Minimize Dependency Footprint:** Include only necessary libraries to reduce the attack surface.

## Conclusion

Adherence to these guidelines is mandatory. Your generated code will be reviewed against these principles. Prioritize secure coding practices in every task to build a robust and secure application. If unsure about the security implications of a design choice or implementation detail, flag it for review.
