const fs = require('fs')
const request = require('request')
const express = require('express')
const FeedParser = require('feedparser')

const Logger = require('@neologismus/common/Logger')

const Miner = require('@neologismus/text-miner/src/Miner')
const Renderer = require('@neologismus/text-miner/src/Renderer')

const app = express()
const port = process.env.APP_PORT || 8001;

(async () => {
  const renderer = await Renderer.init()

  async function getData({ link, title, date }) {
    return { title, date, link, context: Miner(await renderer(link)) }
  }

  async function parseRSS(link) {
    return new Promise((resolve) => {
      const req = request(link)
      const feedparser = new FeedParser()

      req.pipe(feedparser)

      const result = []

      feedparser.on('readable', () => {
        let item

        while ((item = feedparser.read())) {
          result.push(getData(item))
        }
      })

      feedparser.on('end', () => {
        resolve(result)
      })
    })
  }

  app.get('/api', async (req, res) => {
    const { url } = req.query

    if (!url) {
      res.send('you need to pass URL')

      return
    }

    const hrstart = process.hrtime()

    Promise.all(await parseRSS(url)).then((data) => {
      fs.writeFileSync(`./outputs/output-${Date.now()}.json`, JSON.stringify(data))

      const hrend = process.hrtime(hrstart)

      res.send(`DONE! Articles: ${data.length}, Time: ${hrend[0]} s ${hrend[1] / 1000000} ms`)
    })
  })

  app.listen(port, () => {
    Logger.log(`Ready! Listening ${port}`)
  })
})()
