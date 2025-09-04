# Step 1: Use a lightweight Node.js base
FROM node:20-alpine AS base

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy only dependency files first (for caching)
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY apps/game_craft/package.json apps/game_craft/
COPY packages/core/package.json packages/core/
COPY packages/ui/package.json packages/ui/

# Step 4: Install deps with pnpm (monorepo-aware)
RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile

# Step 5: Copy all source code
COPY . .

# Step 6: Build game_craft
WORKDIR /app/apps/game_craft
RUN pnpm run build

# Step 7: Start production server
EXPOSE 3000
CMD ["pnpm", "start"]
