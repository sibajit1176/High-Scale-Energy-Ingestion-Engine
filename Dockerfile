# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

#  Copy source code
COPY . .

# Build NestJS app
RUN npm run build

# Expose app port
EXPOSE 3000

# Run app in production mode
CMD ["node", "dist/main.js"]
