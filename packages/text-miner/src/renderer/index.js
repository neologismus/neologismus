const phantom = require('phantom')

const Logger = require('@neologismus/common/Logger')

function resourceLoader(requestData, networkRequest) {
  if (/woff|svg|ttf|fonts/.test(requestData.url)) {
    networkRequest.abort()
    return
  }

  console.info('Requesting', requestData.url)
}

module.exports = async () => {
  const instance = await phantom.create()

  return async (url) => {
    const page = await instance.createPage()

    page.setting('javascriptEnabled', false)
    page.setting('loadImages', false)
    page.setting(
      'userAgent',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.11 Safari/537.36',
    )

    page.on('onResourceRequested', true, resourceLoader)

    const status = await page.open(url)

    Logger.log({ url, status })

    if (status !== 'success') {
      throw new Error(`Can't reach the ${url}`)
    }

    const text = (await page.property('plainText')).split('\n').filter(Boolean)
    const source = await page.property('content')

    return { text, source }
  }
}
