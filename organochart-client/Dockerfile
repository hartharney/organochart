# Use official Node image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build at image build time
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
