# Use the official Node.js image as a build environment
FROM node:18 AS build
WORKDIR /app

# Copy package.json and yarn.lock and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the remaining source code
COPY . ./

# Expose the port your app runs on
EXPOSE 3000

# Start the app in development mode
CMD ["yarn", "dev"]
