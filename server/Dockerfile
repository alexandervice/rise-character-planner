# Node.js Dockerfile
# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the Docker image
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files into the Docker image
COPY . .

# Expose port 8000 (or the port your app runs on)
EXPOSE 8000

# Run the application when the Docker image is run
CMD ["npm", "start"]
