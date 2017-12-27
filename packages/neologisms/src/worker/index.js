const Redis = require('ioredis')

const Logger = require('@neologismus/common/Logger')

const Model = require('..')

const config = {
  host: 'redis',
  keyPrefix: 'neologismus:',
}

const redisHandler = new Redis(config)


;(async () => {
  const model = await Model()

  console.log('Worker is ready!')

  const waitForMessage = () => {
    redisHandler
      .brpop('neologisms:words', 0)
      .then(async ([, message]) => {
        waitForMessage()

        const { payload, contextId } = JSON.parse(message)

        model.add({ ngrams: payload, contextId })
          .forEach(([ngram, p]) => {
            p
              .then(() => {})
              .catch((err) => {
                Logger.log({
                  ngram,
                  contextId,
                  err,
                })
              })
          })
      })
  }

  waitForMessage()
})()
