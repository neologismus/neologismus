FROM node:8

RUN npm install pm2 -g
RUN npm install lerna -g
RUN npm install linklocal -g

WORKDIR /neologismus

COPY . .

RUN npm run bootstrap

EXPOSE 8001

CMD ["pm2-dev", "process.yml"]
