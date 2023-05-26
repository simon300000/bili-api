const { createHash } = require('crypto')

const got = require('got')

const { parseString } = require('xml2js')
const { inflateRaw } = require('zlib')
const { promisify } = require('util')
const parseStringAsync = promisify(parseString)
const inflateRawAsync = promisify(inflateRaw)

const delayPromise = ms => new Promise(resolve => setTimeout(resolve, ms))

const json = async (urlInfo, { wait, got, log, salt }) => {
  if (typeof urlInfo === 'string') {
    urlInfo = { url: urlInfo }
  }
  if (wait) await delayPromise(wait)

  if (salt) {
    const url = new URL(urlInfo.url)

    const wts = Math.floor(Date.now() / 1000)
    url.searchParams.set('wts', wts)
    url.searchParams.sort()

    const search = url.search.split('?')[1]
    const hash = createHash('md5').update(`${search}${salt}`).digest('hex')
    url.searchParams.set('w_rid', hash)

    urlInfo.url = url.href
  }

  log('json', urlInfo.url)

  return got(urlInfo)
}

const jsonArray = async (urls, options) => {
  const { wait, log } = options
  for (let i = 0; i < urls.length; i++) {
    if (wait) await delayPromise(wait)
    log('json', urls[i])
    urls[i] = json(urls[i], options)
  }
  return Promise.all(urls)
}

const xml = async (url, { wait, log }) => {
  if (wait) await delayPromise(wait)
  log('xml', url)
  return parseStringAsync(String(await inflateRawAsync((await got(new URL(url), { decompress: false })).body)))
}

const transparent = (data) => data

module.exports = {
  json,
  jsonArray,
  xml,
  transparent
}
