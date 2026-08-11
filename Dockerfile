# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base

WORKDIR /repo

ENV COREPACK_ENABLE=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

# Keep the package manager in a shared base layer. Source-code changes never
# invalidate this layer.
RUN npm install --global pnpm@9.0.0


FROM base AS dependencies

# Install only after copying workspace manifests. The layer is rebuilt only
# when a dependency or workspace definition changes.
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

# Defaults keep a direct `docker build em_frontend` useful. Compose overrides
# these values for the other applications.
ARG APP_PATH=apps/ssc
ARG APP_FILTER=@ssc/web

COPY turbo.json tsconfig.json ./
COPY packages ./packages
COPY ${APP_PATH} ./${APP_PATH}

# The trailing ellipsis tells Turbo to build the selected app and only its
# workspace dependencies, instead of rebuilding all frontend applications.
RUN --mount=type=cache,id=frontend-turbo,target=/repo/.turbo \
    --mount=type=cache,id=frontend-next-ssc,target=/repo/apps/ssc/.next/cache,sharing=locked \
    --mount=type=cache,id=frontend-next-level-up,target=/repo/apps/level_up/.next/cache,sharing=locked \
    --mount=type=cache,id=frontend-next-game-craft,target=/repo/apps/game_craft/.next/cache,sharing=locked \
    pnpm turbo run build --filter="${APP_FILTER}..."


FROM node:20-alpine AS runner

ARG APP_PATH=apps/ssc

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

WORKDIR /app

# The standalone directory contains only the traced production server and its
# runtime dependencies. Static and public assets are intentionally separate.
COPY --from=builder --chown=node:node /repo/${APP_PATH}/.next/standalone ./
COPY --from=builder --chown=node:node /repo/${APP_PATH}/.next/static ./${APP_PATH}/.next/static
COPY --from=builder --chown=node:node /repo/${APP_PATH}/public ./${APP_PATH}/public

USER node
WORKDIR /app/${APP_PATH}

EXPOSE 3000

CMD ["node", "server.js"]
