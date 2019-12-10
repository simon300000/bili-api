const { LiveTCP } = require('bilibili-live-ws')

const getOnline = (roomid, trial = 0) => new Promise(resolve => {
  const live = new LiveTCP(roomid)
  live.on('error', () => {
    if (trial <= 8) {
      resolve(getOnline(roomid, trial + 1))
    } else {
      resolve(0)
    }
  })
  live.on('heartbeat', async online => {
    live.close()
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
    get: ({ fullTopList }) => [...new Map([...fullTopList[0].data.top3, ...fullTopList.flatMap(topList => topList.data.list)].map(({ uid, ...rest }) => [uid, { uid, ...rest }])).values()]
  },
  allVideos: {
    demand: ['getAllSubmitVideos'],
    get: ({ getAllSubmitVideos }) => [].concat(...getAllSubmitVideos.map(({ data }) => data.vlist))
  },
  getFollowersPage: {
    demand: ['getFollowers'],
    get: ({ getFollowers: { data: { total } } }) => Math.ceil(total / 50)
  },
  allFollowers: {
    demand: ['getAllFollowers'],
    get: ({ getAllFollowers }) => getAllFollowers.flatMap(({ data: { list } }) => list)
  },
  guardLevel: {
    demand: ['guards'],
    get: ({ guards }) => {
      const level = [0, 0, 0]
      const guardArray = guards
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
