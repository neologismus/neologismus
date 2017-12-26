const fs = require('fs')
const express = require('express')

const Logger = require('@neologismus/common/Logger')
const { Miner, Renderer } = require('@neologismus/text-miner')

const parseRSS = require('../')

const app = express()
const port = process.env.PORT || 8001;

(async () => {
  const renderer = await Renderer()

  const getData = async ({ link, title, date }) => ({
    title,
    date,
    link,
    context: Miner(await renderer(link)),
  })

  app.get('/api', async (req, res) => {
    const { url } = req.query

    if (!url) {
      res.send('you need to pass URL')

      return
    }

    const hrstart = process.hrtime()

    parseRSS(url)
      .then(items => Promise.all(items.map(getData)))
      .then((data) => {
        fs.writeFileSync(`./outputs/output-${Date.now()}.json`, JSON.stringify(data))

        const hrend = process.hrtime(hrstart)

        res.send(`DONE! Articles: ${data.length}, Time: ${hrend[0]} s ${hrend[1] / 1000000} ms`)
      })
  })

  app.listen(port, () => {
    Logger.log(`Ready! Listening ${port}`)
  })
})()
