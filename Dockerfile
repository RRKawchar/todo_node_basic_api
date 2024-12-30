FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY package*.Json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]