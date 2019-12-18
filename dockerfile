# stage: 1
FROM node:latest

RUN mkdir -p /app

WORKDIR /app
COPY package*.json ./

RUN yarn
COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]