#!/bin/sh

cmd="$@"

sleep 5
echo "Running migrations..."
npx prisma migrate deploy
npx prisma generate
echo "Seeding database..."
npx prisma db seed

exec $cmd
npx prisma db seed

exec $cmd
