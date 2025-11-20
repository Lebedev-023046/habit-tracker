# Habit Tracker — Monorepo

This repository contains the frontend and backend for the Habit Tracker application.

## 📁 Project Structure

```bash
backend/ — NestJS API (users, habits, tracking, stats)
frontend/ — React/Vue SPA for managing habits and analytics
infra/ — Deployment configs (Docker, NGINX, scripts)
```

## 🚀 Running the project (development)

```bash
docker-compose -f infra/docker-compose.dev.yml up
```

This will start:

- Backend (NestJS)
- Database (PostgreSQL)
- Frontend (Vite dev server)

## 🛠 Technologies

- Backend: NestJS, Prisma, PostgreSQL
- Frontend: Vite + Vue/React
- Deployment: Docker, NGINX, Compose

## 📦 Production Build

```bash
docker compose -f infra/docker-compose.prod.yml up --build -d
```

## 📚 Environment Variables

Each service contains its own **.env.example** file:

- backend/.env.example
- frontend/.env.example

Copy them and fill values before running.
