module.exports = {
  stat: {
    require: ['mid'],
    description: 'UP主统计数据',
    get: async ({ mid, parse }) => parse(`https://api.bilibili.com/x/relation/stat?vmid=${await mid}`)
  },
  info: {
    require: ['mid'],
    description: 'UP主信息',
    get: async ({ mid, parse }) => parse(`https://api.bilibili.com/x/space/acc/info?mid=${await mid}`)
  },
  view: {
    require: ['aid'],
    description: '视频信息',
    get: async ({ aid, parse }) => parse(`https://api.bilibili.com/x/web-interface/view?aid=${await aid}`)
  },
  list: {
    require: ['cid'],
    description: '弹幕',
    type: 'xml',
    get: async ({ cid, parse }) => parse(`https://api.bilibili.com/x/v1/dm/list.so?oid=${await cid}`, 'xml')
  }
}
