# Étape 1 : image de base compatible (Debian complète)
FROM node:20-bookworm

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
# On désactive les binaires LightningCSS non compatibles
RUN npm install && npm install postcss --save-dev

# Copier le reste du code
COPY . .

# Désactiver LightningCSS via variable d'environnement
ENV NEXT_DISABLE_LIGHTNINGCSS=1
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Exposer le port de dev
EXPOSE 3000

# Lancer Next.js en mode dev (hot reload)
CMD ["npm", "run", "dev"]
