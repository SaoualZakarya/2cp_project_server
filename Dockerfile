# Use the official Node.js image based on Alpine Linux.
FROM node:alpine

# Set the working directory inside the container.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory.
COPY package*.json ./

# Install dependencies.
RUN npm ci

# Copy the rest of the application code to the working directory.
COPY . .

# Expose the port that the application will run on.
EXPOSE 5000

# Define the environment variables.
ENV NODE_ENV=production

# Start the application.
CMD ["npm", "start"]
