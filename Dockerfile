FROM node:16-alpine
WORKDIR /luna

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "Luna.js" ]
