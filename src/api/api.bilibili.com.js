module.exports = {
  stat: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/relation/stat?vmid=${mid}`
  },
  archiveStat: {
    demand: ['aid'],
    type: 'json',
    get: ({ aid }) => `https://api.bilibili.com/x/web-interface/archive/stat?aid=${aid}`
  },
  upstat: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/upstat?mid=${mid}`
  },
  info: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.bilibili.com/x/space/acc/info?mid=${mid}`
  },
  view: {
    demand: ['bvid'],
    type: 'json',
    get: ({ bvid }) => `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
  },
  list: {
    demand: ['cid'],
    type: 'xml',
    get: ({ cid }) => `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`
  },
  spaceSearch: {
    demand: ['mid'],
    type: 'json',
    optional: ['page'],
    get: ({ mid, page = 1 }) => `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=100&pn=${page}`
  },
  getAllSubmitVideos: {
    demand: ['getSubmitVideosPage', 'mid'],
    type: 'jsonArray',
    get: ({ mid, getSubmitVideosPage }) => Array(getSubmitVideosPage).fill().map((_, i) => `https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=100&tid=0&pn=${i + 1}`)
  },
  getFollowers: {
    demand: ['mid'],
    type: 'json',
    optional: ['page'],
    get: ({ mid, page = 1 }) => `https://api.bilibili.com/x/relation/followers?vmid=${mid}&pn=${page}&ps=50`
  },
  getAllFollowers: {
    demand: ['mid', 'getFollowersPage'],
    type: 'jsonArray',
    optional: ['SESSDATA'],
    get: ({ mid, getFollowersPage, SESSDATA }) => Array(SESSDATA ? getFollowersPage : Math.min(5, getFollowersPage)).fill().map((_, i) => {
      const url = `https://api.bilibili.com/x/relation/followers?vmid=${mid}&pn=${i + 1}&ps=50`
      if (SESSDATA) {
        return { cookie: { SESSDATA }, url }
      }
      return url
    })
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
