module.exports = {
  stat: {
    require: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/relation/stat?vmid=${mid}`
  },
  upstat: {
    require: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/upstat?mid=${mid}`
  },
  navnum: {
    require: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/navnum?mid=${mid}`
  },
  info: {
    require: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/acc/info?mid=${mid}`
  },
  view: {
    require: ['aid'],
    type: 'json',
    get: ({ aid }) => `https://api.bilibili.com/x/web-interface/view?aid=${aid}`
  },
  list: {
    require: ['cid'],
    type: 'xml',
    get: ({ cid }) => `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`
  },
  search: {
    require: ['uname'],
    type: 'json',
    get: ({ uname }) => `https://api.bilibili.com/x/web-interface/search/type?jsonp=jsonp&search_type=bili_user&keyword=${uname}`
  },
  _notice: {
    require: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/notice?mid=${mid}`
  }
}
