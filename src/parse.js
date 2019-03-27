const got = require('got')

const parsers = {}
parsers.json = async url => JSON.parse((await got(url)).body)
module.exports = (url, type = 'json') => parsers[type](url)
