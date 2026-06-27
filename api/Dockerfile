# AfterCare API — production image
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# Quest seed JSON is read at runtime by the seed script; include data.
COPY --from=build /app/src/data ./dist/data
# Static web preview (Expo web export) served at /app.
COPY public ./public
EXPOSE 4000
CMD ["node", "dist/index.js"]
