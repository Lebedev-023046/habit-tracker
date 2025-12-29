#!/bin/sh
set -e

echo "⏳ Waiting for database..."

until npx prisma db pull >/dev/null 2>&1; do
  sleep 2
done

echo "✅ Database is ready"

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "🔥 Starting backend..."
exec node dist/src/main.js
