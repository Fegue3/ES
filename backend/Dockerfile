# ---- Base de build (precisa de devDependencies para compilar Nest) ----
FROM node:20-alpine AS build
WORKDIR /app

# Instala só a partir dos manifests para melhor cache
COPY package*.json ./
RUN npm ci

# Prisma Client precisa do schema em build
COPY prisma ./prisma
RUN npx prisma generate

# Copia o restante código e compila
COPY . .
RUN npm run build

# Remove devDependencies para o runtime ficar leve
RUN npm prune --omit=dev


# ---- Runtime (produção) ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copia apenas o necessário
COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# (opcional mas útil: manter prisma/ para migrate deploy no arranque)
COPY --from=build /app/prisma ./prisma

# Porta da API
EXPOSE 3000

# Script de arranque: aplica migrations e arranca a API
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Arranque padrão (podes sobrescrever no compose/k8s)
CMD ["node", "dist/main.js"]
