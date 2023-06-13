FROM node:alpine3.17

COPY . /app
WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm","test" ]
