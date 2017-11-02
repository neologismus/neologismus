FROM node:8

RUN npm install pm2 -g
RUN npm install lerna -g

WORKDIR /neologismus

COPY package.json .
COPY lerna.json .

RUN npm run bootstrap

COPY . .

EXPOSE 8001

CMD ["pm2-dev", "process.yml"]
