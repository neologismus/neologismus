const express = require('express')

const Logger = require('@neologismus/common/Logger')
const { Miner, Renderer } = require('@neologismus/text-miner')

const Redis = require('ioredis')


const Model = require('..')

const app = express()
const port = process.env.APP_PORT || 8001

const config = {
  host: 'redis',
  keyPrefix: 'neologismus:',
}

const redisHandler = new Redis(config)
const redisPusher = new Redis(config);

(async () => {
  const model = await Model()
  const renderer = await Renderer()

  app.get('/api/search/:word', async (req, res) => {
    const { word } = req.params

    if (!word) {
      res.send('you need to pass the word')

      return
    }

    model.search(word)
      .then((doc) => {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.json(doc)
      })
      .catch((err) => {
        Logger.log(err)
      })
  })

  app.get('/api/contexts/:id', async (req, res) => {
    const { id } = req.params

    if (!id) {
      res.send('you need to pass the id of context')

      return
    }

    model.getContext(id)
      .then((doc) => {
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.json(doc)
      })
      .catch((err) => {
        Logger.log(err)
      })
  })

  app.get('/api/parse', async (req, res) => {
    const { link } = req.query

    const context = Miner(await renderer(link))

    const id = require('crypto').createHash('md5').update(link).digest('hex')

    redisHandler
      .brpop(`neologisms:words:${id}`, 0)
      .then(([, message]) => {
        const { payload } = JSON.parse(message)

        const words = Object.values(payload).reduce((acc, val) => acc.concat(val), [])

        Promise.all(words.map(model.search))
          .then((docs) => {
            res.header('Content-Type', 'application/json; charset=utf-8')
            res.json({
              context,
              link,
              words: docs.map((data, i) => ({ word: words[i], data })),
            })
          })
          .catch((err) => {
            console.log(err)
          })
      })

    redisPusher.lpush('classifier:contexts:links', JSON.stringify({
      id,
      payload: context,
    }))
  })

  app.listen(port, () => {
    Logger.log(`Ready! Listening ${port}`)
  })
})()
