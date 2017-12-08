const express = require('express')

const Logger = require('@neologismus/common/Logger')

const Model = require('..')

const app = express()
const port = process.env.APP_PORT || 8001;


(async () => {
  const model = await Model()

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

  app.listen(port, () => {
    Logger.log(`Ready! Listening ${port}`)
  })
})()
