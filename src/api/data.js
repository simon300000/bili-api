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
    demand: ['stat'],
    get: ({ stat }) => stat.data.follower
  },
  uname: {
    demand: ['info'],
    get: ({ info }) => info.data.name
  },
  sign: {
    demand: ['info'],
    get: ({ info }) => info.data.sign
  },
  coins: {
    demand: ['info'],
    get: ({ info }) => info.data.coins
  },
  video: {
    demand: ['navnum'],
    get: ({ navnum }) => navnum.data.video
  },
  guardNum: {
    demand: ['topList'],
    get: ({ topList }) => topList.data.info.num
  },
  topListPage: {
    demand: ['topList'],
    get: ({ topList }) => topList.data.info.page
  },
  getSubmitVideosPage: {
    demand: ['getSubmitVideos'],
    get: ({ getSubmitVideos }) => getSubmitVideos.data.pages
  },
  guards: {
    demand: ['fullTopList'],
    get: ({ fullTopList }) => [...(fullTopList)[0].data.top3].concat(...(fullTopList).map(topList => topList.data.list))
  },
  allVideos: {
    demand: ['getAllSubmitVideos'],
    get: ({ getAllSubmitVideos }) => [].concat(...getAllSubmitVideos.map(({ data }) => data.vlist))
  },
  guardLevel: {
    demand: ['guards'],
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
    demand: ['getRoomInfoOld'],
    get: ({ getRoomInfoOld }) => getRoomInfoOld.data.roomStatus
  },
  roundStatus: {
    demand: ['roomStatus', 'getRoomInfoOld'],
    get: ({ getRoomInfoOld, roomStatus }) => roomStatus && getRoomInfoOld.data.roundStatus
  },
  liveStatus: {
    demand: ['roomStatus', 'getRoomInfoOld'],
    get: ({ getRoomInfoOld, roomStatus }) => roomStatus && getRoomInfoOld.data.liveStatus
  },
  title: {
    demand: ['getRoomInfoOld'],
    get: ({ getRoomInfoOld }) => getRoomInfoOld.data.title
  },
  online: {
    demand: ['roomid', 'liveStatus'],
    get: ({ roomid, liveStatus }) => {
      if (!liveStatus) {
        return 0
      } else {
        return getOnline(roomid)
      }
    }
  },
  notice: {
    demand: ['_notice'],
    get: ({ _notice }) => _notice.data
  },
  archiveView: {
    demand: ['upstat'],
    get: ({ upstat }) => upstat.data.archive.view
  },
  articleView: {
    demand: ['upstat'],
    get: ({ upstat }) => upstat.data.article.view
  },
  face: {
    demand: ['info'],
    get: ({ info }) => info.data.face
  },
  topPhoto: {
    demand: ['info'],
    get: ({ info }) => info.data.top_photo
  },
  anchorScore: {
    demand: ['getAnchorInRoom'],
    get: ({ getAnchorInRoom }) => getAnchorInRoom.data.level.anchor_score
  },
  areaRank: {
    demand: ['rankdb'],
    get: ({ rankdb }) => Number(rankdb.data.areaRank.rank.replace('>', ''))
  },
  cids: {
    demand: ['view'],
    get: ({ view }) => view.data.pages.map(({ cid }) => cid)
  }
}
