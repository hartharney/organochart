# Use official Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# ✅ Pass environment variable at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# ✅ Build the Next.js app (env is now available during build)
RUN npm run build

EXPOSE 3000

# ✅ Start in production mode
CMD ["npm", "run", "start"]
