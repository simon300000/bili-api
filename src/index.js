const api = require('./api.bilibili.com')
const data = require('./data')
const input = require('./input')
const apis = { ...api, ...data, ...input }

const parse = require('./parse')

let get = (object, target) => {
  for (let i = 0; i < target.length; i++) {
    if (!object[target[i]]) {
      let targetAPI = apis[target[i]]
      get(object, targetAPI.require)
      object[target[i]] = parse(targetAPI.get(object), targetAPI.type)
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

module.exports = async (object, target) => {
  route(object, target, [])
  get(object, target)
  for (let variable in object) {
    if (object.hasOwnProperty(variable)) {
      object[variable] = await object[variable]
    }
  }
  return object
}
