# Portable image for the Express API — works on Railway, Fly.io, Cloud Run or a
# plain VPS. Mount a persistent volume and point DATA_DIR at it.
FROM node:20-alpine

WORKDIR /app

# Install dependencies first so a code-only change reuses this layer.
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Content store, uploads, leads and admin accounts are written here. Without a
# volume mounted at this path they are lost on every redeploy.
ENV NODE_ENV=production \
    DATA_DIR=/var/data \
    PORT=4000
RUN mkdir -p /var/data && chown -R node:node /var/data /app
VOLUME ["/var/data"]

EXPOSE 4000

# Run unprivileged.
USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/index.js"]
