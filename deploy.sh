#!/bin/bash
set -e

echo "Running Laravel migrations..."
docker-compose exec laravel php artisan migrate --force

echo "Starting queue worker..."
docker-compose exec -d laravel php artisan queue:work

echo "Starting websockets server..."
docker-compose exec -d laravel php artisan websockets:serve

echo "Deployment complete. All services are up!" 