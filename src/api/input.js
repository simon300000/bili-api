module.exports = {
  mid: {
    oneOf: [
      ['getAnchorInRoom'],
      ['view'],
      ['search']
    ],
    get: async ({ getAnchorInRoom, view, search }) => {
      if (getAnchorInRoom) {
        return (await getAnchorInRoom).data.info.uid
      }
      if (view) {
        return (await view).data.owner.mid
      }
      if (search) {
        return (await search).data.result[0].mid
      }
    }
  },
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
