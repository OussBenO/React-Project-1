# Étape 1 : Construction de l'application
FROM node:18-alpine AS builder
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le reste
COPY . .

# Construire le projet
RUN npm run build

# Étape 2 : Serveur de production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
