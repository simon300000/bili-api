module.exports = {
  follower: {
    require: ['stat'],
    get: async ({ stat }) => (await stat).data.follower
  },
  uname: {
    require: ['info'],
    get: async ({ info }) => (await info).data.name
  }
}
