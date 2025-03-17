#!/bin/sh

# Generate .env file dynamically at runtime
echo "VITE_API_URL=${VITE_API_BASE_URL}" > /app/.env

# Start the app
exec "$@"
