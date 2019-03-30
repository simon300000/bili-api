const fs = require('fs')
const path = require('path')

const BiliAPI = require('..')
const apis = {
  'api.bilibili.com': require('../src/api/api.bilibili.com'),
  'api.live.bilibili.com': require('../src/api/api.live.bilibili.com'),
  data: require('../src/api/data'),
  input: require('../src/api/input')
}

let dot = 'digraph G{K=0.5;splines=spline;'

for (let variable in apis) {
  if (apis.hasOwnProperty(variable)) {
    dot += `subgraph "cluster_${variable}"{ label="${variable}";`
    for (let api in apis[variable]) {
      if (apis[variable].hasOwnProperty(api)) {
        dot += `${api};`
      }
    }
    dot += '}'
  }
}

for (let variable in BiliAPI.apis) {
  if (BiliAPI.apis.hasOwnProperty(variable)) {
    if (BiliAPI.apis[variable].require) {
      for (let i = 0; i < BiliAPI.apis[variable].require.length; i++) {
        dot += `${BiliAPI.apis[variable].require[i]}->${variable};`
      }
    }
    if (BiliAPI.apis[variable].optional) {
      for (let i = 0; i < BiliAPI.apis[variable].optional.length; i++) {
        dot += `${BiliAPI.apis[variable].optional[i]}->${variable}[style=dotted];`
      }
    }
    if (BiliAPI.apis[variable].oneOf) {
      let { oneOf } = BiliAPI.apis[variable]
      for (let i = 0; i < oneOf.length; i++) {
        for (let j = 0; j < oneOf[i].length; j++) {
          dot += `${oneOf[i][j]}->${variable}[style=dashed];`
        }
      }
    }
  }
}

dot += '}'

fs.writeFileSync(path.join(__dirname, 'api.dot'), dot)
