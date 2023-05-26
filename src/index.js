const got = require('got')
const RelationX = require('relationx')
const api = require('./api/api.bilibili.com')
const live = require('./api/api.live.bilibili.com')
const data = require('./api/data')
const input = require('./api/input')
const api_vc = require('./api/api.vc.bilibili.com')

const apis = { ...api, ...data, ...input, ...live, ...api_vc }

const defaultParser = require('./parser')
// const checkTunnel = require('./tunnel')

const parseBSON = data => {
  const chunks = data.split('}{"code":')
  if (chunks.length === 1) {
    return data
  }
  return chunks.map((chunk, index) => {
    if (index === 0) {
      return chunk + '}'
    }
    return '{"code":' + chunk
  })[1]
}

const defaultGot = async ({ url, cookie = { buvid3: 233 } }) => {
  const raw = await got(new URL(url), {
    headers: {
      Origin: 'https://www.bilibili.com',
      Cookie: Object.entries({ _uuid: '', rpdid: '', ...cookie }).map(([k, v]) => `${k}=${v}`).join(';'),
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15'
    }
  }).text()

  return JSON.parse(parseBSON(raw))
}

/**
 * 程序主入口
 * @method exports
 * @param  {Object}    object     输入的信息
 * @param  {Array}     targets    需要的目标信息
 * @param  {Object}    options    设置
 * @return {Promise}              Resolve一个带有所需targets的Object
 */

let defaultWait = 0

const w = async ({ ...object }, [...targets], { // 这里以下属于Options
  parsers = {},
  log = () => { },
  wait = defaultWait,
  tunnels = [],
  got = defaultGot,
  noSalt = false,
  salt = undefined
} = {}) => {
  let bilibiliSalt
  if (!noSalt) {
    const { salt: saltResult } = await w({ ...object, salt }, ['salt'], { noSalt: true })
    log('using salt', salt)
    bilibiliSalt = saltResult
  }
  return (new RelationX({ nodes: apis, parsers: { ...defaultParser, ...parsers } })).relation(object, targets, { wait, tunnels, got, log, salt: bilibiliSalt })
}

module.exports = w

module.exports.apis = { ...apis }

module.exports.setDefaultWait = ms => {
  defaultWait = ms
}
// module.exports.checkTunnels = async tunnels => {
//   let tunnelsChecked = []
//   for (let i = 0; i < tunnels.length; i++) {
//     tunnelsChecked[i] = { ...tunnels[i], state: await checkTunnel(tunnels[i]) }
//   }
//   return tunnelsChecked
// }
