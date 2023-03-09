FROM node:lts-alpine3.17

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "node", "index.js" ]