# syntax=docker/dockerfile:1.7

# Direct-build entry point. Use the em_frontend directory as build context.
FROM node:20-alpine AS base
WORKDIR /repo
ENV COREPACK_ENABLE=0 PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN npm config set registry https://mirror-npm.runflare.com && \
    npm config set strict-ssl false && \
    npm install --global pnpm@9.0.0

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
COPY apps/level_up ./apps/level_up
RUN --mount=type=cache,id=frontend-turbo,target=/repo/.turbo \
    --mount=type=cache,id=frontend-next-level-up,target=/repo/apps/level_up/.next/cache,sharing=locked \
    pnpm turbo run build --filter="@ssc/level_up..."

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /repo ./
EXPOSE 3000
CMD ["pnpm", "--filter", "@ssc/level_up", "start"]
