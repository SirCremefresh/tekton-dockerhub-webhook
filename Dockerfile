FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .
EXPOSE 8080

CMD [ "node", "index.js" ]
