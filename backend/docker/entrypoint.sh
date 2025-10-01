#!/bin/sh
set -e

# Se houver DATABASE_URL, aplica migrations em produção
if [ -n "$DATABASE_URL" ]; then
  echo "🗄️  Running Prisma migrate deploy..."
  npx prisma migrate deploy
else
  echo "⚠️  DATABASE_URL not set; skipping prisma migrate deploy."
fi

echo "🚀 Starting NestJS..."
exec "$@"
