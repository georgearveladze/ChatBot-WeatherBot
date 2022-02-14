FROM node:alpine3.12

WORKDIR /subscription-bot

COPY package*.json ./

RUN npm ci

COPY ./src ./

CMD [ "node", "./src/core/index.js" ]