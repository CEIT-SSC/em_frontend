# Step 1: Base image
FROM node:20-alpine AS base

# Step 2: Working directory
WORKDIR /app

# Step 3: Copy dependency files first
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY apps/auth/package.json apps/auth/
COPY packages/core/package.json packages/core/
COPY packages/ui/package.json packages/ui/

# Step 4: Install dependencies
RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile

# Step 5: Copy source code
COPY . .

# Step 6: Build auth app
WORKDIR /app/apps/auth
RUN pnpm run build

# Step 7: Expose port (choose 3002 for auth)
EXPOSE 3002

# Step 8: Start app
CMD ["pnpm", "start"]
