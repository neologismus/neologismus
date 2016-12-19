const express = require('express');

const miner = require('./miner');
const Renderer = require('./renderer');


const app = express();
const port = process.env.APP_PORT || 8001;


(async () => {
  const renderer = await Renderer.init();

  app.get('/api', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      res.send('you need to pass URL');

      return;
    }

    res.json(miner(await renderer(url)));
  });

  app.listen(port, () => {
    console.log(`Ready! Listening ${port}`);
  });
})();
