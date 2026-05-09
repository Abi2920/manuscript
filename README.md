# History Form

A historical-themed full-stack web application for archiving and managing historical records, manuscripts, and documents. Built with React, Three.js, Node.js, Express, and PostgreSQL.

## Tech Stack

- **Frontend:** React 18 + Vite, Three.js + React Three Fiber, Tailwind CSS, Framer Motion, GSAP
- **Backend:** Node.js + Express.js, Prisma ORM, JWT Authentication, Multer
- **Database:** PostgreSQL (via Prisma)
- **Deployment:** Netlify (frontend), Render/Railway (backend), Neon (PostgreSQL)

## Features

- Immersive historical 3D environment with classical columns, floating manuscripts, dust particles, and an antique orrery
- Warm sepia, gold, and parchment color palette
- JWT-based contributor authentication
- Multi-step archive submission form with category selection and file upload
- Admin dashboard with animated statistics and submission management
- Fully responsive and mobile-friendly

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone and Install

```bash
git clone <repo-url>
cd HistoryForm
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Database Setup

```bash
createdb history_form
npm run db:push
```

### 3. Environment Variables

**server/.env:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/history_form"
JWT_SECRET="your-secret-key"
PORT=5000
```

**client/.env:**
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run Development

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint            | Description       | Auth |
|--------|---------------------|-------------------|------|
| POST   | /api/auth/register  | Register user     | No   |
| POST   | /api/auth/login     | Login user        | No   |
| GET    | /api/auth/me        | Get current user  | Yes  |
| POST   | /api/contact        | Submit form       | No   |
| GET    | /api/contact        | Get submissions   | Yes  |
| DELETE | /api/contact/:id    | Delete submission | Yes  |
| GET    | /api/users          | Get all users     | Yes  |
| GET    | /api/dashboard      | Get stats         | Yes  |

## Three.js Components

- `DustParticles` — 2000 floating dust motes with gentle animation
- `AncientColumns` — Classical Doric-style columns floating in space
- `FloatingManuscript` — Parchment pages drifting with slow rotation
- `ParchmentWave` — Undulating ground plane with warm tones
- `AntiqueOrrery` — Animated mechanical solar system model
- `EmberParticles` — Warm ember-like particles rising

## License

MIT
