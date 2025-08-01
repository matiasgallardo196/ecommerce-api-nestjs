FROM node:22.14.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["npm", "run","start"]

#docker build . -t ecommerce-docker
#docker run -p 3001:3000 ECommerce-Docker

