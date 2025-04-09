#!/bin/bash

# Créer un réseau Docker si inexistant
if ! docker network inspect network-projet-final &>/dev/null; then
    docker network create network-projet-final
fi

# Supprimer les conteneurs existants
docker rm -f db-container express-app >/dev/null 2>&1

# Démarrer MongoDB
docker run -d --name db-container \
    --network network-projet-final \
    -v mongodb_data:/data/db \
    mongo:latest

# Build de l'image backend
echo "Building backend image..."
docker build ./backend -t express-project

# Démarrer le conteneur backend
echo "Starting backend container..."
docker run -it --name express-app \
    --network network-projet-final \
    -p 3000:3000 \
    -v "$(pwd)/backend":/app \
    -e MONGODB_URI="mongodb://db-container:27017/bookstore" \
    -e PORT=3000 \
    express-project bash -c "cd /app && npm install && npm run dev"