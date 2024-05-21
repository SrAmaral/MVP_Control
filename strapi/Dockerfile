FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV development
RUN npm run build
CMD ["npm", "start"]