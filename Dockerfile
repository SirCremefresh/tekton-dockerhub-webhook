FROM node:14-alpine

WORKDIR /usr/src/app

COPY sample-application-backend .
EXPOSE 8080

CMD [ "node", "index.js" ]
