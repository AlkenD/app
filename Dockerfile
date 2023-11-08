# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your SvelteKit app files to the container
COPY . .

# Build your SvelteKit app
RUN npm run build

# Expose the port that your app will run on
EXPOSE 3000

# Start your SvelteKit app using the Node adapter
CMD [ "node", "-r", "dotenv/config", "build/index.js" ]
