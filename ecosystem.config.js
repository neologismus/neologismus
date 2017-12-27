const services = {
  'rss-parser': [
    {
      name: 'rss-parser',
      script: 'packages/rss-parser/src/worker',
      autorestart: true,
    },
  ],
  'text-miner': [
    {
      name: 'text-miner',
      script: 'packages/text-miner/src/worker',
      instances: 4,
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
  neologisms: [
    {
      name: 'neologisms',
      script: 'packages/neologisms/src/worker',
      autorestart: true,
    },
    {
      name: 'neologisms:api',
      script: 'packages/neologisms/src/server',
      autorestart: true,
    },
  ],
}

module.exports = {
  apps: services[process.env.SERVICE],
}
