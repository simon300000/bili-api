const LiveWS = require('bilibili-live-ws')

const getOnline = roomid => new Promise(async resolve => {
  let ws = new LiveWS(roomid)
  ws.on('error', async () => {
    ws.close()
    resolve(await getOnline(roomid))
  })
  ws.on('heartbeat', async online => {
    ws.close()
    resolve(online)
  })
})
// FIXME: Max trial or just remove

module.exports = {
  follower: {
    require: ['stat'],
    get: ({ stat }) => stat.data.follower
  },
  uname: {
    require: ['info'],
    get: ({ info }) => info.data.name
  },
  sign: {
    require: ['info'],
    get: ({ info }) => info.data.sign
  },
  coins: {
    require: ['info'],
    get: ({ info }) => info.data.coins
  },
  video: {
    require: ['navnum'],
    get: ({ navnum }) => navnum.data.video
  },
  guardNum: {
    require: ['topList'],
    get: ({ topList }) => topList.data.info.num
  },
  topListPage: {
    require: ['topList'],
    get: ({ topList }) => topList.data.info.page
  },
  guards: {
    require: ['fullTopList'],
    get: ({ fullTopList }) => [...(fullTopList)[0].data.top3].concat(...(fullTopList).map(topList => topList.data.list))
  },
  guardLevel: {
    require: ['guards'],
    get: ({ guards }) => {
      let level = [0, 0, 0]
      let guardArray = guards
      for (let i = 0; i < guardArray.length; i++) {
        level[guardArray[i].guard_level - 1]++
      }
      return level
    }
  },
  roomStatus: {
    require: ['getRoomInfoOld'],
    get: ({ getRoomInfoOld }) => getRoomInfoOld.data.roomStatus
  },
  roundStatus: {
    require: ['roomStatus', 'getRoomInfoOld'],
    get: ({ getRoomInfoOld, roomStatus }) => roomStatus && getRoomInfoOld.data.roundStatus
  },
  liveStatus: {
    require: ['roomStatus', 'getRoomInfoOld'],
    get: ({ getRoomInfoOld, roomStatus }) => roomStatus && getRoomInfoOld.data.liveStatus
  },
  title: {
    require: ['getRoomInfoOld'],
    get: ({ getRoomInfoOld }) => getRoomInfoOld.data.title
  },
  online: {
    require: ['roomid', 'liveStatus'],
    get: ({ roomid, liveStatus }) => {
      if (!liveStatus) {
        return 0
      } else {
        return getOnline(roomid)
      }
    }
  },
  notice: {
    require: ['_notice'],
    get: ({ _notice }) => _notice.data
  },
  archiveView: {
    require: ['upstat'],
    get: ({ upstat }) => upstat.data.archive.view
  },
  articleView: {
    require: ['upstat'],
    get: ({ upstat }) => upstat.data.article.view
  },
  face: {
    require: ['info'],
    get: ({ info }) => info.data.face
  },
  topPhoto: {
    require: ['info'],
    get: ({ info }) => info.data.top_photo
  },
  anchorScore: {
    require: ['getAnchorInRoom'],
    get: ({ getAnchorInRoom }) => getAnchorInRoom.data.level.anchor_score
  },
  areaRank: {
    require: ['rankdb'],
    get: ({ rankdb }) => Number(rankdb.data.areaRank.rank.replace('>', ''))
  }
}
