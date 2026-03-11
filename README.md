# EdTech Frontend

Frontend built with **Next.js**, **Tailwind CSS**, and **TanStack Query**.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

- `NEXT_PUBLIC_API_URL` - base URL of the backend API.
  - default: `https://ed-tech-3vlc.onrender.com`

## Frontend routes

- `/` - dashboard (health + courses)
- `/health` - health-only view
- `/courses` - courses-only view

## Backend route compatibility

The frontend tries multiple common endpoint patterns:

- Health: `/health`, `/api/health`, `/api/v1/health`
- Courses: `/courses`, `/api/courses`, `/api/v1/courses`
