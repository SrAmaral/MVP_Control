FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

WORKDIR /usr/src/app/strapi

EXPOSE 1337

CMD ["npm", "run", "develop"]