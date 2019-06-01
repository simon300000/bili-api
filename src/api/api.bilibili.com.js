module.exports = {
  stat: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/relation/stat?vmid=${mid}`
  },
  upstat: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/upstat?mid=${mid}`
  },
  navnum: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/navnum?mid=${mid}`
  },
  info: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/acc/info?mid=${mid}`
  },
  view: {
    demand: ['aid'],
    type: 'json',
    get: ({ aid }) => `https://api.bilibili.com/x/web-interface/view?aid=${aid}`
  },
  list: {
    demand: ['cid'],
    type: 'xml',
    get: ({ cid }) => `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`
  },
  getSubmitVideos: {
    demand: ['mid'],
    type: 'json',
    optional: ['page'],
    get: ({ mid, page = 1 }) => `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=${mid}&pagesize=100&page=${page}`
  },
  getAllSubmitVideos: {
    demand: ['getSubmitVideosPage', 'mid'],
    type: 'jsonArray',
    get: ({ mid, getSubmitVideosPage }) => Array(getSubmitVideosPage).fill().map((a, i) => `https://space.bilibili.com/ajax/member/getSubmitVideos?mid=${mid}&pagesize=100&page=${i + 1}`)
  },
  search: {
    demand: ['uname'],
    type: 'json',
    get: ({ uname }) => `https://api.bilibili.com/x/web-interface/search/type?jsonp=jsonp&search_type=bili_user&keyword=${uname}`
  },
  _notice: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/notice?mid=${mid}`
  }
}
