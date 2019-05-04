module.exports = {
  getRoomInfoOld: {
    require: ['mid'],
    type: 'json',
    get: async ({ mid }) => `https://api.live.bilibili.com/room/v1/Room/getRoomInfoOld?mid=${await mid}`
  },
  topList: {
    require: ['roomid', 'mid'],
    type: 'json',
    optional: ['page'],
    get: async ({ roomid, mid, page = 1 }) => `https://api.live.bilibili.com/guard/topList?roomid=${await roomid}&page=${await page}&ruid=${await mid}`
  },
  fullTopList: {
    require: ['roomid', 'mid', 'topListPage'],
    type: 'jsonArray',
    get: async ({ roomid, mid, topListPage }) => Promise.all(Array(await topListPage).fill(undefined).map(async (a, i) => `https://api.live.bilibili.com/guard/topList?roomid=${await roomid}&page=${i + 1}&ruid=${await mid}`))
  },
  getAnchorInRoom: {
    require: ['roomid'],
    type: 'json',
    get: async ({ roomid }) => `https://api.live.bilibili.com/live_user/v1/UserInfo/get_anchor_in_room?roomid=${await roomid}`
  },
  rankdb: {
    require: ['mid'],
    type: 'json',
    get: async ({ mid }) => `https://api.live.bilibili.com/rankdb/v1/Common/roomInfo?ruid=${await mid}`
  }
}
