#!/bin/sh
echo "🚀 Running Prisma migrations (non-blocking)..."
npx prisma migrate deploy || echo "⚠️ Migrations failed, continuing..."

echo "🔥 Starting backend..."
exec node dist/src/main.js