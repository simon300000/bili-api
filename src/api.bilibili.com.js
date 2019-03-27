module.exports = {
  stat: {
    require: ['mid'],
    get: async ({ mid, parse }) => parse(`https://api.bilibili.com/x/relation/stat?vmid=${await mid}`)
  },
  info: {
    require: ['mid'],
    get: async ({ mid, parse }) => parse(`https://api.bilibili.com/x/space/acc/info?mid=${await mid}`)
  },
  view: {
    require: ['aid'],
    get: async ({ aid, parse }) => parse(`https://api.bilibili.com/x/web-interface/view?aid=${await aid}`)
  },
  list: {
    require: ['cid'],
    type: 'xml',
    get: async ({ cid, parse }) => parse(`https://api.bilibili.com/x/v1/dm/list.so?oid=${await cid}`, 'xml')
  }
}
