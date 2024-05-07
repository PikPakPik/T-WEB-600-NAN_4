# Use an official Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm i --only=production

# Copy the source code to the container
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine

# Copy the built app to the web server directory
COPY --from=0 /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start the web server
CMD ["nginx", "-g", "daemon off;"]