const Redis = require('ioredis')
const mongoose = require('mongoose')

const { Miner, Renderer } = require('../')

const config = {
  host: 'redis',
  keyPrefix: 'neologismus:',
}

const redisHandler = new Redis(config)
const redisPusher = new Redis(config)

mongoose.Promise = global.Promise

const Connection = mongoose.createConnection('mongodb://mongo:27017/neologismus', {
  useMongoClient: true,
})

const ContextSchema = {
  context: String,
  resourceId: String,
  link: {
    type: String,
    index: { unique: true },
  },
  data: Object,
}

;(async () => {
  const renderer = await Renderer()
  const db = await Connection

  const Context = db.model('Context', new mongoose.Schema(ContextSchema, { timestamps: true }))

  const waitForMessage = () => {
    redisHandler
      .brpop('text-miner:contents', 0)
      .then(async ([, message]) => {
        waitForMessage()

        const { payload: { link, ...data }, resourceId } = JSON.parse(message)

        Context.count({ link }).then(async (total) => {
          if (total) return

          const context = Miner(await renderer(link))

          redisPusher.lpush('classifier:contexts', JSON.stringify({
            context,
            link,
            resourceId,
            data,
          }))

          const item = new Context({ resourceId, context, link, data })

          item.save()
        })
      })
  }

  waitForMessage()
})()
