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
  guardNum: {
    require: ['topList'],
    get: async ({ topList }) => (await topList).data.info.num
  }
}
