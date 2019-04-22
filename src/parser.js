const got = require('got')
const { parseString } = require('xml2js')
const { inflateRaw } = require('zlib')
const { promisify } = require('util')
const parseStringAsync = promisify(parseString)
const inflateRawAsync = promisify(inflateRaw)

const delayPromise = ms => new Promise(resolve => setTimeout(resolve, ms))

let parsers = {}
parsers.json = async (url, { wait }) => {
  if (wait) await delayPromise(wait)
  return (await got(new URL(await url), { json: true })).body
}
parsers.xml = async (url, { wait }) => {
  if (wait) await delayPromise(wait)
  return parseStringAsync(String(await inflateRawAsync((await got(new URL(await url), { decompress: false })).body)))
}
parsers.none = e => e

module.exports = (url, type = 'none', { wait }) => parsers[type](url, { wait })
