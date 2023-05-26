const OE = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45,
  35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38,
  41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60,
  51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36,
  20, 34, 44, 52]

module.exports = {
  // Fix from links under, thanks for their work
  // https://github.com/gaogaotiantian/biliscope/commit/f35d84f00c336eb472149094a8b76399b22b22c1
  // https://github.com/velvetflame/liveStatusCheck
  salt: {
    demand: ['nav'],
    get: ({ nav: { data: { wbi_img: { img_url: img, sub_url: sub } } } }) => {
      const imgHash = img.split('/').reverse()[0].split('.')[0]
      const subHash = sub.split('/').reverse()[0].split('.')[0]

      const hash = `${imgHash}${subHash}`

      return Array(32).fill().map((_, i) => hash[OE[i]]).join('')
    }
  },
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
