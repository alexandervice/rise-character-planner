# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for both client and server into the Docker image and install dependencies
COPY client/package*.json ./client/
COPY server/package*.json ./server/
RUN cd client && npm install
RUN cd server && npm install

# Copy the rest of the client and server application files into the Docker image
COPY client ./client
COPY server ./server

# Build the client application for production
RUN cd client && npm run build

# Expose ports 3000 and 8000
EXPOSE 3000
EXPOSE 8000

# Start both the client and the server when the Docker image is run
CMD ["sh", "-c", "cd server && npm start & cd ../client && npm start"]