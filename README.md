# Education City & AI Academy — Technical Portfolio 🎓🚀

This project follows the **Decoupled Architecture** strategy for a professional educational portal, integrating a high-performance frontend with a managed Backend-as-a-Service (BaaS).

## 1. High-Level Architecture
The platform follows a modern decoupled architecture:
- **Frontend**: A high-performance React 19 Single Page Application (SPA).
- **Backend-as-a-Service (BaaS)**: Managed services via **Supabase** for database, authentication, and security policies.
- **Secondary Microservice**: A Python-based FastAPI service for complex logic and AI research demonstrations.

## 2. Frontend (The Interface)
- **Framework**: React 19 + Vite 5
- **Styling**: Vanilla CSS with Glassmorphism and modern Theme Engine tokens.
- **Deployment**: Google Firebase Hosting
- **Hosting URL**: [https://education-city-and-ai-academy.web.app](https://education-city-and-ai-academy.web.app)
- **Mechanism**: Compiled into optimized static assets in the `dist/` folder and deployed to Google’s Global CDN.

## 3. Backend (The Logic & Data)
### Primary Backend: Supabase (BaaS)
- **Database**: PostgreSQL storing courses, announcements, and registrations.
- **Authentication**: Supabase Auth securing the Admin Dashboard via JWT.
- **Client Communication**: Direct browser-to-DB communication via `@supabase/supabase-js`.
- **Security**: Enforced via **Row Level Security (RLS)** policies.

### Secondary Backend: Python AI Labs
- **Framework**: FastAPI (Python)
- **Purpose**: Dedicated environment for AI reasoning and backend data processing.
- **Location**: `/ec-backend/`

## 4. Deployment Workflow
1. **Build**: `npm run build` (Compiles and optimizes assets).
2. **Environment**: `.env` loads Supabase credentials securely.
3. **Deploy**: `firebase deploy` (Pushes new versions live instantly).

## 5. Security Summary
- **JWT Security**: Admin access is strictly governed by Supabase Auth tokens.
- **RLS Policies**: Ensures public users can only read course data, while only authenticated Admins can modify the database.
- **HTTPS**: Globally enforced by Firebase Hosting SSL.

---
© 2026 Education City & AI Academy · Building the Future of Tech Education.
