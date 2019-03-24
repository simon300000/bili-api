module.exports = {
  follower: {
    require: ['stat'],
    get: async ({ stat }) => (await stat).follower
  },
  uname: {
    require: ['info'],
    get: async ({ info }) => (await info).name
  }
}
