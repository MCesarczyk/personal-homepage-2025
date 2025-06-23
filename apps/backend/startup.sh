#!/bin/sh

cmd="$@"

echo "Waiting for database..."
sleep 5
echo "Running migrations..."
npx prisma migrate deploy
npx prisma generate
echo "Seeding database..."
npx prisma db seed
sleep 5

exec $cmd
