FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

ENV PORT=3050

RUN apk add --no-cache \
    build-base \
    python3

COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

COPY .env .env

EXPOSE ${PORT}

# Serve the app
CMD ["npm", "run", "dev"]