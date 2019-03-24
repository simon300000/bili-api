const api = require('./api.bilibili.com')
const data = require('./data')
const apis = { ...api, ...data }

const parse = require('./parse')

let get = (object, target) => {
  for (let i = 0; i < target.length; i++) {
    if (!object[target[i]]) {
      get(object, apis[target[i]].require)
      object[target[i]] = apis[target[i]].get(object)
    }
  }
}

let route = (object, target, map) => {
  for (let i = 0; i < target.length; i++) {
    if (object[target[i]]) continue
    if (!apis[target[i]] || map.includes(target[i])) {
      throw new Error(`Error target route: ${[...map, target[i]].join(' -> ')} -> ?`)
    } else {
      route(object, apis[target[i]].require, [...map, target[i]])
    }
  }
}

module.exports = async (object, target) => {
  object.parse = parse
  route(object, target, [])
  get(object, target)
  for (let variable in object) {
    if (object.hasOwnProperty(variable)) {
      object[variable] = await object[variable]
    }
  }
  return object
}
