const Redis = require('ioredis')

const parseRSS = require('../')

const config = {
  host: 'redis',
  keyPrefix: 'neologismus:',
}

const redisHandler = new Redis(config)
const redisPusher = new Redis(config)

const waitForMessage = () => {
  redisHandler
    .brpop('rss-parser:links', 0)
    .then(([, link]) => {
      waitForMessage()

      parseRSS(link)
        .then(items => items.forEach((item) => {
          redisPusher.lpush('text-miner:contents', JSON.stringify({
            payload: item,
            resourceId: 'RBK',
          }))
        }))
    })
}

waitForMessage()
