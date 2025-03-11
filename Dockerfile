# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Inject environment variable at build time
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Build the Next.js application
RUN npm run build

# Runtime Stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app ./

# Ensure the ENV is set at runtime
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NODE_ENV=production

# Expose the Next.js port
EXPOSE 3000

# Run Next.js
CMD ["npm", "run", "start"]
