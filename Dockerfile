# Base stage con dependencias comunes
FROM node:22.21.1-slim AS base
WORKDIR /
COPY package*.json ./
COPY . .

# Stage de Desarrollo
FROM base AS development
ENV NODE_ENV=development
RUN npm install
COPY .env.dev .env
EXPOSE 3080 
CMD ["npx", "nest", "start", "--watch"]

# Stage de builder para producción
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=optional
COPY tsconfig.json ./
COPY src ./src
COPY .env.prod .env
RUN rm -rf build
RUN npm run build

# Stage final de producción
FROM node:22.21.1-slim AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["npx", "node", "build/main.js"]