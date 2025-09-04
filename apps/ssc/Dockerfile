# Step 1: Base image
FROM node:20-alpine AS base

# Step 2: Working directory
WORKDIR /app

# Step 3: Copy dependency files first
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY apps/ssc/package.json apps/ssc/
COPY packages/core/package.json packages/core/
COPY packages/ui/package.json packages/ui/

# Step 4: Install dependencies
RUN npm install -g pnpm@9 && pnpm install --frozen-lockfile

# Step 5: Copy source code
COPY . .

# Step 6: Build ssc app
WORKDIR /app/apps/ssc
RUN pnpm run build

# Step 7: Expose port (choose 3001 for ssc)
EXPOSE 3001

# Step 8: Start app
CMD ["pnpm", "start"]
