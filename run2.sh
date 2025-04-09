#!/bin/bash

# Supprimer le conteneur s'il existe déjà
docker rm -f react-container-app >/dev/null 2>&1

# Supprimer l'image si elle existe déjà
docker rmi node-dev-image >/dev/null 2>&1

echo "Building frontend image..."
docker build ./frontend -t node-dev-image

echo "Starting frontend container..."
if ! docker run --name react-container-app -p 5173:5173 \
    -v "$(pwd)/frontend/src":/app/src \
    -v "$(pwd)/frontend/public":/app/public \
    -v "$(pwd)/frontend/index.html":/app/index.html \
    -v "$(pwd)/frontend/vite.config.js":/app/vite.config.js \
    -v "$(pwd)/frontend/tsconfig.json":/app/tsconfig.json \
    -v "$(pwd)/frontend/tsconfig.node.json":/app/tsconfig.node.json \
    -d node-dev-image; then
    echo "Error: Failed to start frontend container"
    exit 1
fi

echo "Frontend started at http://localhost:5173"
echo "Logs du conteneur frontend:"
docker logs -f react-container-app
