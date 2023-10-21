FROM node:18

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

USER root

RUN apt-get update 

RUN npm install


EXPOSE 3000

COPY . ./

CMD ["npm", "start"]

