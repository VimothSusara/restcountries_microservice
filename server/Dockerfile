# Use a specific Node.js LTS version
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

ENV PORT=3050

RUN apk add --no-cache \
    build-base \
    python3

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE ${PORT}

# Serve the app
CMD ["npm", "run", "dev"]