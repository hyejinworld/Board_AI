# Base image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port (matched with .env PORT)
EXPOSE 5000

# Start the application
CMD [ "npm", "start" ]
