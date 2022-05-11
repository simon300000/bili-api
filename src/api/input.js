module.exports = {
  mid: {
    oneOf: [
      ['getInfoByRoom'],
      ['view'],
      ['search']
    ],
    get: ({ getInfoByRoom, view, search }) => {
      if (getInfoByRoom) {
        return getInfoByRoom.data.room_info.uid
      }
      if (view) {
        return view.data.owner.mid
      }
      if (search) {
        return search.data.result[0].mid
      }
    }
  },
  aid: { demand: ['aid'] },
  bvid: {
    demand: ['archiveStat'],
    get: ({ archiveStat }) => archiveStat.data.bvid
  },
  cid: {
    demand: ['view'],
    optional: ['p'],
    get: ({ view, p = 0 }) => view.data.pages[p].cid
  },
  // TODO: p: {},
  // TODO: page: {},
  roomid: {
    demand: ['liveRoom'],
    get: ({ liveRoom }) => liveRoom.roomid || 0
  }
}
