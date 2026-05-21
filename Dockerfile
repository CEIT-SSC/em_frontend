# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /repo

# Disable Corepack entirely to avoid Corepack fetching failures
ENV COREPACK_ENABLE=0

# Configure npm to use Runflare mirror
RUN npm config set registry https://mirror-npm.runflare.com && \
    npm config set strict-ssl false

# Install pnpm globally using npm (this bypasses Corepack entirely)
RUN npm install -g pnpm@9.0.0

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.json ./

# Copy source directories
COPY apps ./apps
COPY packages ./packages

# Configure pnpm explicitly
RUN pnpm config set registry https://mirror-npm.runflare.com && \
    pnpm config set strict-ssl false

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the Next.js applications
RUN pnpm build

# ---- run stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV COREPACK_ENABLE=0

# Configure npm & install pnpm globally in runner stage too
RUN npm config set registry https://mirror-npm.runflare.com && \
    npm config set strict-ssl false && \
    npm install -g pnpm@9.0.0

# Copy everything from builder
COPY --from=builder /repo .

EXPOSE 3000

# Default command (overridden by docker-compose)
CMD ["pnpm", "start"]
