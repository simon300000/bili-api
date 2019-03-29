const api = require('./api/api.bilibili.com')
const live = require('./api/api.live.bilibili.com')
const data = require('./api/data')
const input = require('./api/input')
const apis = { ...api, ...data, ...input, ...live }

const defaultParser = require('./parser')

let get = (object, target, { parser }) => {
  for (let i = 0; i < target.length; i++) {
    if (!object[target[i]]) {
      let targetAPI = apis[target[i]]
      get(object, targetAPI.require, { parser })
      object[target[i]] = parser(targetAPI.get(object), targetAPI.type)
    }
  }
}

let route = (object, target, map) => {
  if (!target) {
    throw new Error(`Error target route: ${map.join(' -> ')} -> ?`)
  } else {
    for (let i = 0; i < target.length; i++) {
      if (object[target[i]]) continue
      if (!apis[target[i]] || map.includes(target[i])) {
        throw new Error(`Error target route: ${[...map, target[i]].join(' -> ')} -> ?`)
      } else {
        route(object, apis[target[i]].require, [...map, target[i]])
      }
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
 * @return {Promise}                           Resolve一个带有所需targets的Object
 */
module.exports = async ({ ...object }, [...targets], { // 这里以下属于Options
  parser = defaultParser,
  logger = e => {}
} = {}) => {
  route(object, targets, [])
  get(object, targets, { parser })
  for (let variable in object) {
    if (object.hasOwnProperty(variable)) {
      object[variable] = await object[variable]
    }
  }
  return object
}

module.exports.apis = { ...apis }
