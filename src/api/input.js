module.exports = {
  mid: {
    oneOf: [
      ['getAnchorInRoom'],
      ['view'],
      ['search']
    ],
    get: ({ getAnchorInRoom, view, search }) => {
      if (getAnchorInRoom) {
        return getAnchorInRoom.data.info.uid
      }
      if (view) {
        return view.data.owner.mid
      }
      if (search) {
        return search.data.result[0].mid
      }
    }
  },
  // TODO: aid: {},
  cid: {
    demand: ['view'],
    optional: ['p'],
    get: ({ view, p = 0 }) => view.data.pages[p].cid
  },
  // TODO: p: {},
  // TODO: page: {},
  roomid: {
    demand: ['getRoomInfoOld'],
    get: ({ getRoomInfoOld }) => getRoomInfoOld.data.roomid
  }
}
