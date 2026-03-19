<div align="center">

<img src="public/zap.svg" alt="ProfileForge Logo" width="64" height="64" />

# ProfileForge

**The all-in-one developer portfolio platform.**  
Aggregate your coding stats, projects, certificates, and badges from across the web — and expose them through a clean REST API.

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

ProfileForge lets developers build a single, unified profile by connecting their accounts on platforms like **GitHub**, **LeetCode**, **Codeforces**, and **Credly**. All of your coding stats, open-source contributions, competitive programming ratings, certificates, and badges are pulled together into one stylish dashboard.

You can also generate **REST API keys** to serve your profile data to any third-party website, portfolio, or bot — no scraping required.

---

## Features

| Feature | Description |
|---|---|
| 🔗 **Platform Integrations** | Connect GitHub, LeetCode, Codeforces, and Credly in one place |
| 📊 **Coding Stats** | Live problem counts, contribution graphs, and contest ratings |
| 🏆 **Badges & Certificates** | Import Credly badges and track certificates with credential links |
| 🗂️ **Project Portfolio** | Showcase projects with images, tech-stack tags, and links |
| 🔑 **API Key Management** | Generate/revoke API keys and monitor usage quotas |
| 🖼️ **Profile Customization** | Upload a profile photo, update your display name, and more |
| 📖 **Built-in API Docs** | Interactive documentation at `/docs` and inside the dashboard |
| 🔒 **Secure Auth** | Email/password signup with code-based email verification |

---

## Tech Stack

### Frontend
- **[React 19](https://react.dev/)** — component-based UI
- **[Vite 7](https://vitejs.dev/)** — fast dev server and optimized builds
- **[React Router 7](https://reactrouter.com/)** — client-side routing
- **[Tailwind CSS 4](https://tailwindcss.com/)** — utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** — accessible headless components (Dialog, Tooltip, Separator)
- **[Framer Motion](https://www.framer.com/motion/)** — animations
- **[Embla Carousel](https://www.embla-carousel.com/)** — smooth carousel for badges
- **[Lucide React](https://lucide.dev/)** — icon library
- **[Axios](https://axios-http.com/)** — HTTP client

### Tooling
- **[ESLint](https://eslint.org/)** — code linting
- **[Vercel](https://vercel.com/)** — deployment platform

### Design System
- **Neo-brutalism** aesthetic — bold 2 px borders, offset drop shadows
- Custom fonts: [Cabinet Grotesk](https://www.fontshare.com/fonts/cabinet-grotesk) (headings) and [Satoshi](https://www.fontshare.com/fonts/satoshi) (body)
- Accent palette: black `#000`, white `#fff`, yellow `#ffe17c`, sage `#b7c6c2`

---

## Getting Started

### Prerequisites

- **Node.js 18+** and **npm** (or yarn / pnpm)
- A running instance of the ProfileForge backend API

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/prammbhs/ProfileForge.git
cd ProfileForge

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend REST API (should end with `/api/v1`, no trailing slash) |

> **Note:** Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the App

```bash
# Start the development server (http://localhost:5173)
npm run dev

# Create a production build (output → dist/)
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

---

## Project Structure

```
ProfileForge/
├── public/                  # Static assets (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── auth/            # Auth guard wrapper
│   │   ├── docs/            # Embedded API documentation
│   │   ├── landing/         # Landing page sections (Hero, Features, …)
│   │   ├── layout/          # AppSidebar, DashboardLayout, Navbar
│   │   └── ui/              # Reusable UI primitives (NeoButton, Carousel, …)
│   ├── context/
│   │   └── AuthContext.jsx  # Global authentication state
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   └── api.js           # Pre-configured Axios instance
│   ├── pages/               # Route-level page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── ConfirmSignupPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ApiKeysPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── CertificatesPage.jsx
│   │   ├── ExternalProfilesPage.jsx
│   │   ├── PublicDocsPage.jsx
│   │   └── DashboardDocsPage.jsx
│   ├── App.jsx              # Route definitions
│   └── main.jsx             # React entry point
├── .env                     # Local env (git-ignored)
├── components.json          # shadcn/ui config
├── eslint.config.js
├── jsconfig.json            # Path alias (@/ → src/)
├── vercel.json              # Vercel SPA rewrite rules
└── vite.config.js
```

---

## API Reference

ProfileForge communicates with a RESTful backend. Below is a summary of the endpoints used by the frontend.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/login` | Log in with email and password |
| `POST` | `/signup` | Register a new account |
| `POST` | `/confirmsignup` | Verify email with the code sent on signup |
| `POST` | `/logout` | End the current session |
| `GET` | `/profile` | Fetch the authenticated user's profile |

### Profile

| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/profile/name` | Update display name |
| `PUT` | `/profile/image` | Upload a profile photo (`multipart/form-data`) |
| `DELETE` | `/profile/delete` | Permanently delete the account |

### API Keys

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/keys` | List all API keys |
| `POST` | `/keys` | Generate a new API key |
| `DELETE` | `/keys/:id` | Revoke an API key |
| `GET` | `/keys/quota` | Check current usage quota |

### External Profiles

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/external-profile/:platform` | Fetch data from a connected platform (`github`, `leetcode`, `codeforces`, `credly`) |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/projects` | List projects |
| `POST` | `/projects` | Create a project |
| `PUT` | `/projects/:id` | Update a project |
| `DELETE` | `/projects/:id` | Delete a project |
| `POST` | `/projects/presign` | Get a presigned S3 URL for image upload |

### Certificates

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/certificates` | List certificates |
| `POST` | `/certificates` | Add a certificate |
| `PUT` | `/certificates/:id` | Update a certificate |
| `DELETE` | `/certificates/:id` | Delete a certificate |

### Stats & Badges

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/codingStats` | Fetch aggregated coding statistics |
| `GET` | `/badges` | Fetch earned badges |

Full interactive documentation is available inside the app at `/docs`.

---

## Deployment

The project is pre-configured for **[Vercel](https://vercel.com/)**.

```json
// vercel.json — rewrites all paths to index.html for SPA routing
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Steps:**
1. Push your fork to GitHub.
2. Import the repository in Vercel.
3. Add `VITE_BACKEND_URL` as an environment variable in the Vercel project settings.
4. Deploy — Vercel will run `npm run build` automatically.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** and ensure `npm run lint` passes without errors.
3. **Commit** with a clear, descriptive message.
4. **Open a Pull Request** against the `main` branch and describe what you changed and why.

---

<div align="center">

Made with ☕ and bold borders.

</div>
