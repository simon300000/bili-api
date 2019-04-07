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
  },
  search: {
    require: ['uname'],
    type: 'json',
    get: async ({ uname }) => `https://api.bilibili.com/x/web-interface/search/type?jsonp=jsonp&search_type=bili_user&keyword=${await uname}`
  },
  _notice: {
    require: ['mid'],
    type: 'json',
    get: async ({ mid }) => `https://api.bilibili.com/x/space/notice?mid=${mid}`
  }
}
