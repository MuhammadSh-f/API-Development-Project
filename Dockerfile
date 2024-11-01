# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app/src

# Copy package.json and install dependencies
COPY package.json tsconfig.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]
