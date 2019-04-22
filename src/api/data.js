const LiveWS = require('bilibili-live-ws')

module.exports = {
  follower: {
    require: ['stat'],
    get: async ({ stat }) => (await stat).data.follower
  },
  uname: {
    require: ['info'],
    get: async ({ info }) => (await info).data.name
  },
  sign: {
    require: ['info'],
    get: async ({ info }) => (await info).data.sign
  },
  coins: {
    require: ['info'],
    get: async ({ info }) => (await info).data.coins
  },
  video: {
    require: ['navnum'],
    get: async ({ navnum }) => (await navnum).data.video
  },
  guardNum: {
    require: ['topList'],
    get: async ({ topList }) => (await topList).data.info.num
  },
  roomStatus: {
    require: ['getRoomInfoOld'],
    get: async ({ getRoomInfoOld }) => (await getRoomInfoOld).data.roomStatus
  },
  roundStatus: {
    require: ['roomStatus', 'getRoomInfoOld'],
    get: async ({ getRoomInfoOld, roomStatus }) => (await roomStatus) && (await getRoomInfoOld).data.roundStatus
  },
  liveStatus: {
    require: ['roomStatus', 'getRoomInfoOld'],
    get: async ({ getRoomInfoOld, roomStatus }) => (await roomStatus) && (await getRoomInfoOld).data.liveStatus
  },
  title: {
    require: ['getRoomInfoOld'],
    get: async ({ getRoomInfoOld }) => (await getRoomInfoOld).data.title
  },
  online: {
    require: ['roomid', 'liveStatus'],
    get: async ({ roomid, liveStatus }) => {
      if (!(await liveStatus)) {
        return 0
      } else {
        let ws = new LiveWS(await roomid)
        return new Promise(resolve => ws.on('heartbeat', async online => {
          ws.close()
          resolve(online)
        }))
      }
    }
  },
  notice: {
    require: ['_notice'],
    get: async ({ _notice }) => (await _notice).data
  },
  archiveView: {
    require: ['upstat'],
    get: async ({ upstat }) => (await upstat).data.archive.view
  },
  articleView: {
    require: ['upstat'],
    get: async ({ upstat }) => (await upstat).data.article.view
  },
  face: {
    require: ['info'],
    get: async ({ info }) => (await info).data.face
  },
  anchorScore: {
    require: ['getAnchorInRoom'],
    get: async ({ getAnchorInRoom }) => (await getAnchorInRoom).data.level.anchor_score
  },
  areaRank: {
    require: ['rankdb'],
    get: async ({ rankdb }) => Number((await rankdb).data.areaRank.rank.replace('>', ''))
  }
}
