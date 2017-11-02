const request = require('request')
const FeedParser = require('feedparser')

const parseRSS = async link => new Promise((resolve) => {
  const req = request(link)
  const feedparser = new FeedParser()

  req.pipe(feedparser)

  const result = []

  feedparser.on('readable', () => {
    let item

    while ((item = feedparser.read())) {
      result.push(item)
    }
  })

  feedparser.on('end', () => {
    resolve(result)
  })
})

module.exports = parseRSS
