module.exports = {
  stat: {
    require: ['mid'],
    type: 'json',
    get: async ({ mid }) => `https://api.bilibili.com/x/relation/stat?vmid=${await mid}`
  },
  info: {
    require: ['mid'],
    type: 'json',
    get: async ({ mid }) => `https://api.bilibili.com/x/space/acc/info?mid=${await mid}`
  },
  view: {
    require: ['aid'],
    type: 'json',
    get: async ({ aid }) => `https://api.bilibili.com/x/web-interface/view?aid=${await aid}`
  },
  list: {
    require: ['cid'],
    type: 'xml',
    get: async ({ cid }) => `https://api.bilibili.com/x/v1/dm/list.so?oid=${await cid}`
  }
}
