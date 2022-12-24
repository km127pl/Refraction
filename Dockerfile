FROM --platform=x86_64 node:18-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# you can remove this if you are not going to use the statistic server
EXPOSE 3001/tcp

CMD ["npm", "start"]
