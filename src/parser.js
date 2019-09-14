const got = require('got')
// const tunnel = require('tunnel')

const { parseString } = require('xml2js')
const { inflateRaw } = require('zlib')
const { promisify } = require('util')
const parseStringAsync = promisify(parseString)
const inflateRawAsync = promisify(inflateRaw)

const delayPromise = ms => new Promise(resolve => setTimeout(resolve, ms))

let parsers = {}

parsers.json = async (urlInfo, { wait, tunnels }) => {
  if (typeof urlInfo === 'string') {
    urlInfo = { url: urlInfo }
  }
  const { url, cookie = {} } = urlInfo
  if (wait) await delayPromise(wait)
  // if (tunnels.length) {
  //   let agent = tunnel.httpsOverHttp({
  //     proxy: tunnels[Math.floor(Math.random() * tunnels.length)]
  //   })
  //   let request = got(new URL(url), { json: true, agent })
  //   setTimeout(() => {
  //     request.cancel()
  //   }, 1000)
  //   let data = await request.catch(() => undefined)
  //   if (data) {
  //     return data.body
  //   }
  // }
  return (await got(new URL(url), { json: true, headers: { Cookie: Object.entries(cookie).map(([k, v]) => `${k}=${v}`).join('; ') } })).body
}

parsers.jsonArray = async (urls, { wait, tunnels }) => {
  for (let i = 0; i < urls.length; i++) {
    if (wait) await delayPromise(wait)
    urls[i] = parsers.json(urls[i], { tunnels })
  }
  return Promise.all(urls)
}

parsers.xml = async (url, { wait }) => {
  if (wait) await delayPromise(wait)
  return parseStringAsync(String(await inflateRawAsync((await got(new URL(url), { decompress: false })).body)))
}

module.exports = parsers
