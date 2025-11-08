FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install express

# Install dependencies (don't use --only=production)
RUN npm install

# Copy application code
COPY . .

# Expose the port (should match your .env PORT)
EXPOSE 5001

# Start the application
CMD ["node", "src/index.js"]