FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package*.json
COPY package*.json ./

# Nettoyer et installer les dépendances
RUN npm cache clean --force
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Configuration pour éviter les problèmes de permissions avec les volumes
RUN mkdir -p node_modules/.vite

# Exposer le port pour Vite
EXPOSE 5173

# Définir explicitement la commande de démarrage
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
