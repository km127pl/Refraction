FROM --platform=x86_64 node:18-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN tsc

EXPOSE 3001

CMD ["npm", "start"]
