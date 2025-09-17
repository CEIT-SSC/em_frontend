# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /repo
RUN corepack enable

# 1) install workspace deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile

# 2) build the Next.js site
RUN pnpm build

# ---- run stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# 1) Enable Corepack and turn the stub into a real pnpm install
RUN corepack enable && corepack prepare pnpm@8 --activate

# 2) Copy the build output (+ node_modules tree) produced in the builder stage
COPY --from=builder /repo .

# 3) Start only the Next.js app (CMD is overridden in docker compose)
EXPOSE 3000
CMD ["pnpm", "-F", "web", "start"]