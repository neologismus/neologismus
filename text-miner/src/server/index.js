const express = require('express')

const miner = require('../Miner')
const Renderer = require('../Renderer')

const Logger = require('@neologismus/common/Logger')

const app = express()
const port = process.env.APP_PORT || 8001;


(async () => {
  const renderer = await Renderer.init()

  app.get('/api', async (req, res) => {
    const { url } = req.query

    if (!url) {
      res.send('you need to pass URL')

      return
    }

    res.header('Content-Type', 'application/json; charset=utf-8')
    res.json(miner(await renderer(url)))
  })

  app.listen(port, () => {
    Logger.log(`Ready! Listening ${port}`)
  })
})()
