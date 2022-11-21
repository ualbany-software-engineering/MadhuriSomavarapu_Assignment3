FROM node:alpine

WORKDIR /MADHURI

COPY package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]

