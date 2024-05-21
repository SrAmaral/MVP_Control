FROM node:18
# alternatively you can use FROM strapi/base:latest

# Set up working directory
WORKDIR /app

# Copy package.json to root directory
COPY package.json .

# Copy yarn.lock to root directory
COPY package-lock.json .

# Install dependencies, but not generate a yarn.lock file and fail if an update is needed
RUN npm install --frozen-lockfile

# Copy strapi project files
COPY favicon.png ./favicon.png
COPY src/ src/
COPY public/ public/
COPY database/ database/
COPY config/ config/
COPY .tmp/ .tmp/
COPY .strapi/ .strapi/  
# ...

# Build admin panel
RUN npm run build

# Run on port 1337
EXPOSE 1337

# Start strapi server
CMD ["npm", "run", "develop"]