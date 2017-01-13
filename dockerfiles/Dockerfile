FROM node:7.4-alpine
RUN apk add --no-cache git

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app

RUN npm config set loglevel warn && npm install

EXPOSE 3000

COPY . /app

CMD [ "npm", "start" ]
