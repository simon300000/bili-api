const api = require('./api/api.bilibili.com')
const live = require('./api/api.live.bilibili.com')
const data = require('./api/data')
const input = require('./api/input')
const apis = { ...api, ...data, ...input, ...live }

const defaultParser = require('./parser')
// const checkTunnel = require('./tunnel')

let get = ({ object, targets }, { parser, wait, tunnels }) => {
  for (let i = 0; i < targets.length; i++) {
    if (!object[targets[i]]) {
      let targetAPI = apis[targets[i]]
      let { oneOf = [], demand = [] } = targetAPI
      // TODO: Deep Optional Router
      get({ object, targets: demand }, { parser, wait, tunnels })
      for (let j = 0; j < oneOf.length; j++) {
        let { error } = router(object, oneOf[j], [targets[i]])
        if (!error) {
          get({ object, targets: oneOf[j] }, { parser, wait, tunnels })
          break
        }
      }
      object[targets[i]] = (async () => parser(await targetAPI.get(Object.assign(...await Promise.all(demand.concat(...oneOf).map(async v => ({ [v]: await object[v] }))))), targetAPI.type, { wait, tunnels }))()
      // Hiahiahia
    }
  }
}

let router = (object, targets, map = []) => {
  for (let i = 0; i < targets.length; i++) {
    let target = targets[i]
    if (object[target]) {
      return {}
    }
    if (!apis[target]) {
      return { error: [target, '?'] }
    }
    if (map.includes(target)) {
      return { error: [target, 'LOOP'] }
    }
    if (apis[target].demand) {
      let { error } = router(object, apis[target].demand, [...map, target])
      if (error) {
        return { error: [target, ...error] }
      }
    }

    let { oneOf } = apis[target]
    if (oneOf) {
      let errors = []
      for (let j = 0; j < oneOf.length; j++) {
        let { error } = router(object, oneOf[j], [...map, target])
        if (!error) {
          return {}
        }
        errors.push(error.join(' -> '))
      }
      return { error: [target, `oneOf: [${errors.join(', ')}]`] }
    }
  }
  return {}
}

/**
 * 程序主入口
 * @method exports
 * @param  {Object}    object                  输入的信息
 * @param  {Array}     targets                 需要的目标信息
 * @param  {Function}  [parser=defaultParser]  设置: 自定义url下载/分析器
 * @param  {Function}  [logger=e=>{}]          调试用信息输出
 * @param  {Number}    [wait=0]                网络请求延迟
 * @return {Promise}                           Resolve一个带有所需targets的Object
 */
module.exports = async ({ ...object }, [...targets], { // 这里以下属于Options
  parser = defaultParser,
  logger = e => {},
  wait = 0,
  tunnels = []
} = {}) => {
  let { error } = router(object, targets)
  if (error) {
    throw new Error(`Target route: ${error.join(' -> ')}`)
  }
  get({ object, targets }, { parser, wait, tunnels })
  // for (let i = 0; i < Object.keys(object).length; i++) {
  //   object[Object.keys(object)[i]] = await object[Object.keys(object)[i]]
  // }
  // return object
  return Object.assign(...await Promise.all(Object.keys(object).map(async key => ({ [key]: await object[key] }))))
}

module.exports.apis = { ...apis }
// module.exports.checkTunnels = async tunnels => {
//   let tunnelsChecked = []
//   for (let i = 0; i < tunnels.length; i++) {
//     tunnelsChecked[i] = { ...tunnels[i], state: await checkTunnel(tunnels[i]) }
//   }
//   return tunnelsChecked
// }
