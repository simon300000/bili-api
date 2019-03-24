const got = require('got')

module.exports = async url => JSON.parse((await got(url)).body).data
