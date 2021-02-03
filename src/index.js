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

const defaultGot = async ({ url, cookie = {} }) => got(new URL(url), { headers: { Cookie: Object.entries({ _uuid: '', rpdid: '', ...cookie }).map(([k, v]) => `${k}=${v}`).join(';') } }).json()

/**
 * 程序主入口
 * @method exports
 * @param  {Object}    object     输入的信息
 * @param  {Array}     targets    需要的目标信息
 * @param  {Object}    options    设置
 * @return {Promise}              Resolve一个带有所需targets的Object
 */

let defaultWait = 0

module.exports = async ({ ...object }, [...targets], { // 这里以下属于Options
  parsers = {},
  log = () => {},
  wait = defaultWait,
  tunnels = [],
  got = defaultGot
} = {}) => (new RelationX({ nodes: apis, parsers: { ...defaultParser, ...parsers } })).relation(object, targets, { wait, tunnels, got, log })

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
