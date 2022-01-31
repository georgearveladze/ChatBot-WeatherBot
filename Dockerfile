FROM node:alpine3.12

WORKDIR /subscription-bot

COPY package*.json ./

RUN npm ci

COPY . .  

CMD [ "node", "app.js" ]