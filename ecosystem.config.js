const services = {
  'rss-parser': [
    {
      name: 'rss-parser',
      script: 'packages/rss-parser/src/worker',
    },
  ],
  'text-miner': [
    {
      name: 'text-miner',
      script: 'packages/text-miner/src/worker',
      instances: 4,
      exec_mode: 'cluster',
      autorestart: false,
    },
  ],
  neologisms: [
    {
      name: 'neologisms',
      script: 'packages/neologisms/src/worker',
    },
    {
      name: 'neologisms:api',
      script: 'packages/neologisms/src/server',
    },
  ],
}

module.exports = {
  apps: services[process.env.SERVICE],
}
