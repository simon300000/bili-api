module.exports = {
  // TODO: mid: {},
  // TODO: aid: {},
  cid: {
    require: ['view'],
    optional: ['p'],
    get: async ({ view, p }) => (await view).data.pages[p || 0].cid
  },
  // TODO: p: {},
  // TODO: page: {},
  roomid: {
    require: ['getRoomInfoOld'],
    get: async ({ getRoomInfoOld }) => (await getRoomInfoOld).data.roomid
  }
}
