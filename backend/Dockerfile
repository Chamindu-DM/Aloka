FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose the port (should match your .env PORT)
EXPOSE 5001

# Start the application
CMD ["node", "src/index.js"]