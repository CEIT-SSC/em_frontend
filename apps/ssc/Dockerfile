# syntax=docker/dockerfile:1.7

# Direct-build entry point. Use the em_frontend directory as build context.
FROM node:20-alpine AS base
WORKDIR /repo
ENV COREPACK_ENABLE=0 PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN npm install --global pnpm@9.0.0

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/game_craft/package.json ./apps/game_craft/package.json
COPY apps/level_up/package.json ./apps/level_up/package.json
COPY apps/ssc/package.json ./apps/ssc/package.json
COPY packages/core/package.json ./packages/core/package.json
COPY packages/tailwind-config/package.json ./packages/tailwind-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/utils/package.json ./packages/utils/package.json
RUN --mount=type=cache,id=frontend-pnpm-store,target=/pnpm/store,sharing=locked \
    pnpm config set store-dir /pnpm/store && \
    pnpm config set package-import-method copy && \
    pnpm install --frozen-lockfile

FROM dependencies AS builder
COPY turbo.json tsconfig.json ./
COPY packages ./packages
COPY apps/ssc ./apps/ssc
RUN --mount=type=cache,id=frontend-turbo,target=/repo/.turbo \
    --mount=type=cache,id=frontend-next-ssc,target=/repo/apps/ssc/.next/cache,sharing=locked \
    pnpm turbo run build --filter="@ssc/web..."

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
COPY --from=builder --chown=node:node /repo/apps/ssc/.next/standalone ./
COPY --from=builder --chown=node:node /repo/apps/ssc/.next/static ./apps/ssc/.next/static
COPY --from=builder --chown=node:node /repo/apps/ssc/public ./apps/ssc/public
USER node
WORKDIR /app/apps/ssc
EXPOSE 3000
CMD ["node", "server.js"]
