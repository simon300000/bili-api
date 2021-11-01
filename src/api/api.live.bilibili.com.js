module.exports = {
  topList: {
    demand: ['roomid', 'mid'],
    type: 'json',
    optional: ['page'],
    get: ({ roomid, mid, page = 1 }) => `https://api.live.bilibili.com/guard/topList?roomid=${roomid}&page=${page}&ruid=${mid}`
  },
  fullTopList: {
    demand: ['roomid', 'mid', 'topListPage'],
    type: 'jsonArray',
    get: ({ roomid, mid, topListPage }) => Array(topListPage).fill(undefined).map((a, i) => `https://api.live.bilibili.com/guard/topList?roomid=${roomid}&page=${i + 1}&ruid=${mid}`)
  },
  getInfoByRoom: {
    demand: ['roomid'],
    type: 'json',
    get: ({ roomid }) => `https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=${roomid}`
  },
  rankdb: {
    demand: ['mid'],
    type: 'json',
    get: ({ mid }) => `https://api.live.bilibili.com/rankdb/v1/Common/roomInfo?ruid=${mid}`
  }
}
