# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only necessary files for building
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the built app with a lightweight image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Set environment to production
ENV NODE_ENV=production
ENV NEXT_PUBLIC_HOST=https://wt.pool2jibi.com/

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
