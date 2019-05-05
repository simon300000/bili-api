const api = require('./api/api.bilibili.com')
const live = require('./api/api.live.bilibili.com')
const data = require('./api/data')
const input = require('./api/input')
const apis = { ...api, ...data, ...input, ...live }

const defaultParser = require('./parser')
const checkTunnel = require('./tunnel')

let get = (object, target, { parser, wait, tunnels }) => {
  for (let i = 0; i < target.length; i++) {
    if (!object[target[i]]) {
      let targetAPI = apis[target[i]]
      let { oneOf = [] } = targetAPI
      // TODO: Deep Optional Router
      if (targetAPI.require) {
        get(object, targetAPI.require, { parser, wait, tunnels })
      }
      for (let j = 0; j < oneOf.length; j++) {
        let error = router(object, oneOf[j], [target[i]])
        if (!error) {
          get(object, oneOf[j], { parser, wait, tunnels })
          break
        }
      }
      if (!targetAPI.require) {
        targetAPI.require = []
      }
      object[target[i]] = (async () => parser(await targetAPI.get(Object.assign(...await Promise.all(targetAPI.require.concat(...oneOf).map(async v => ({ [v]: await object[v] }))))), targetAPI.type, { wait, tunnels }))()
      // Hiahiahia
    }
  }
}

let router = (object, targets, map = []) => {
  for (let i = 0; i < targets.length; i++) {
    let target = targets[i]
    if (object[target]) {
      return
    }
    if (!apis[target]) {
      return [target, '?']
    }
    if (map.includes(target)) {
      return [target, 'LOOP']
    }
    if (apis[target].require) {
      let route = router(object, apis[target].require, [...map, target])
      if (route) {
        return [target, ...route]
      }
    }

    let { oneOf } = apis[target]
    if (oneOf) {
      let error
      for (let j = 0; j < oneOf.length; j++) {
        let route = router(object, oneOf[j], [...map, target])
        if (!route) {
          return
        }
        error = route
      }
      return error
    }
  }
}

/**
 * 程序主入口
 * @method exports
 * @param  {Object}    object                  输入的信息
 * @param  {Array}     targets                 需要的目标信息
 * @param  {Function}  [parser=defaultParser]  设置: 自定义url下载/分析器
 * @param  {Function}  [logger=e=>{}]          调试用信息输出
 * @param  {Number}    [wait=0]                网络请求延迟
 * @param  {Array}     [tunnels=[]]            代理
 * @return {Promise}                           Resolve一个带有所需targets的Object
 */
module.exports = async ({ ...object }, [...targets], { // 这里以下属于Options
  parser = defaultParser,
  logger = e => {},
  wait = 0,
  tunnels = []
} = {}) => {
  let error = router(object, targets)
  if (error) {
    throw new Error(`Target route: ${error.join(' -> ')}`)
  }
  get(object, targets, { parser, wait, tunnels })
  for (let variable in object) {
    if (object.hasOwnProperty(variable)) {
      object[variable] = await object[variable]
    }
  }
  return object
}

module.exports.apis = { ...apis }
module.exports.checkTunnels = async tunnels => {
  let tunnelsChecked = []
  for (let i = 0; i < tunnels.length; i++) {
    tunnelsChecked[i] = { ...tunnels[i], state: await checkTunnel(tunnels[i]) }
  }
  return tunnelsChecked
}
