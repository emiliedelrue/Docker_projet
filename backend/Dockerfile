FROM node:latest

WORKDIR /app
 
RUN apt -y update && apt -y upgrade
 
RUN apt -y install curl less vim zsh
 
RUN yes | sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
 
RUN npm install -g npm@11.1.0

# Installer nodemon globalement
RUN npm install -g nodemon

# La commande sera définie dans le script de démarrage
CMD ["zsh"]
