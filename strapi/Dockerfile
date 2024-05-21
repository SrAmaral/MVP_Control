FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./

run npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 1337

CMD ["pnpm", "rum", "start"]
