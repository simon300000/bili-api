const got = require('got')
const { parseString } = require('xml2js')
const { inflateRaw } = require('zlib')
const { promisify } = require('util')
const parseStringAsync = promisify(parseString)
const inflateRawAsync = promisify(inflateRaw)

const parsers = {}
parsers.json = async url => JSON.parse((await got(await url)).body)
parsers.xml = async url => parseStringAsync(String(await inflateRawAsync((await got(await url, { decompress: false })).body)))
parsers.none = e => e

module.exports = (url, type = 'none') => parsers[type](url)
