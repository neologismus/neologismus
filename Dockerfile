FROM python:3

RUN \
 apt-get update && \
 apt-get install -y python-pip python-virtualenv && \
 rm -rf /var/lib/apt/lists/* \
 pip install pymorphy2 \
 pip install redis


FROM node:8

RUN npm install pm2 -g
RUN npm install lerna -g
RUN npm install linklocal -g

WORKDIR /neologismus

COPY ./packages/common/package.json /neologismus/packages/common/package.json
COPY ./packages/rss-parser/package.json /neologismus/packages/rss-parser/package.json
COPY ./packages/text-miner/package.json /neologismus/packages/text-miner/package.json

RUN cd packages/rss-parser && npm install && cd -
RUN cd packages/text-miner && npm install && cd -

COPY . /neologismus

# RUN npm run bootstrap

EXPOSE 8001

CMD ["pm2-dev", "process.yml"]
