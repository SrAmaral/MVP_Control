FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the content of the local src directory to the working directory
COPY . .

# Build the app
 RUN npm run build

EXPOSE 1337

CMD ["npm", "develop"]