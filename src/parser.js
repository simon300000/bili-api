const got = require('got')

const { parseString } = require('xml2js')
const { inflateRaw } = require('zlib')
const { promisify } = require('util')
const parseStringAsync = promisify(parseString)
const inflateRawAsync = promisify(inflateRaw)

const delayPromise = ms => new Promise(resolve => setTimeout(resolve, ms))

const json = async (urlInfo, { wait, got }) => {
  if (typeof urlInfo === 'string') {
    urlInfo = { url: urlInfo }
  }
  if (wait) await delayPromise(wait)

  return got(urlInfo)
}

const jsonArray = async (urls, options) => {
  const { wait } = options
  for (let i = 0; i < urls.length; i++) {
    if (wait) await delayPromise(wait)
    urls[i] = json(urls[i], options)
  }
  return Promise.all(urls)
}

const xml = async (url, { wait }) => {
  if (wait) await delayPromise(wait)
  return parseStringAsync(String(await inflateRawAsync((await got(new URL(url), { decompress: false })).body)))
}

module.exports = {
  json,
  jsonArray,
  xml
}
