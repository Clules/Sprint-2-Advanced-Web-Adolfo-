# frontend/Dockerfile

# ─── Stage 1: Build del frontend con Node/Vite ─────────────────────────────────
FROM node:18 AS build

WORKDIR /app

# Permite pasar la URL del API al momento de build
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# 1) Copiamos sólo package.json (y package-lock.json si existiera)
COPY package.json ./

# 2) Instalamos dependencias (usa npm install porque no tenemos package-lock.json)
RUN npm install

# 3) Copiamos el resto del proyecto EXCLUYENDO node_modules/dist gracias a .dockerignore
COPY . .

# 4) Ejecutamos build de Vite
RUN npm run build

# ─── Stage 2: Servir estáticos con Nginx ─────────────────────────────────────────
FROM nginx:1.23-alpine

# 5) Limpiamos el contenido estático por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# 6) Copiamos la carpeta dist generada en el build al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 7) Exponemos el puerto 80 para servir la app
EXPOSE 80

# 8) Arrancamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
