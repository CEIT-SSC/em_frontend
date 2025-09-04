# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /repo
RUN corepack enable                    # enables pnpm

# 1) install workspace deps   (‼ include workspace manifest & turbo.json)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile

# 2) build the Next.js site
# RUN pnpm --filter "@ssc/web" run build   # <- direct build
RUN pnpm build   # <- direct build

# ---- run stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# 1️⃣  Enable Corepack and turn the stub into a real pnpm install
RUN corepack enable && corepack prepare pnpm@8 --activate

# 2️⃣  Copy the build output (+ node_modules tree) produced in the builder stage
COPY --from=builder /repo .

# 3️⃣  Start only the Next.js app
EXPOSE 3000
CMD ["pnpm", "-F", "web", "start"]