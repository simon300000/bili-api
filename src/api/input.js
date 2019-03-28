module.exports = {
  mid: {},
  aid: {},
  cid: {
    require: ['view'],
    optional: ['p'],
    get: async ({ view, p }) => (await view).data.pages[p || 0].cid
  },
  p: {},
  page: {},
  roomid: {
    require: ['getRoomInfoOld'],
    get: async ({ getRoomInfoOld }) => (await getRoomInfoOld).data.roomid
  }
}
