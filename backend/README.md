# Backend — Habit Tracker API

This is the backend service for the Habit Tracker application.
It provides API for authentication, habits, daily check-ins, and progress analytics.

## 🚀 Tech Stack

- NestJS — modular server architecture
- Prisma — ORM
- PostgreSQL — main database
- JWT Auth — access & refresh tokens
- Docker — containerized runtime

## 🔧 Environment Variables

Create .env from .env.example:

```bash
cp .env.example .env
```

Required variables:

```ini
DATABASE_URL=postgresql://user:password@localhost:5432/habits
JWT_SECRET=your-secret
JWT_REFRESH_SECRET=your-refresh-secret
PORT=3000
```

## ▶️ Running in Development

1. Install dependencies

```bash
	npm install
```

2. Run migrations

```bash
	npx prisma migrate dev
```

3. Start dev server

```bash
	npm run start:dev
```

API will be available at:

```arduino
	http://localhost:3000
```

## 🐳 Running via Docker

Build & run backend container:

```bash
	docker build -t habit-backend .
	docker run -p 4000:4000 habit-backend
```

Or using project's docker-compose:

```bash
	docker compose -f ../infra/docker-compose.dev.yml up
```
