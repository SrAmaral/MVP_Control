FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Build the app
# RUN npm run build

# Specify port app runs on
EXPOSE 3000

# Command to run the app
# CMD ["npm", "start"]