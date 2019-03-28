module.exports = {
  follower: {
    require: ['stat'],
    get: async ({ stat }) => (await stat).data.follower
  },
  uname: {
    require: ['info'],
    get: async ({ info }) => (await info).data.name
  },
  guardNum: {
    require: ['topList'],
    get: async ({ topList }) => (await topList).data.info.num
  }
}
