const got = require('got')
const tunnel = require('tunnel')

module.exports = async tunnelOne => {
  let agent = tunnel.httpsOverHttp({
    proxy: tunnelOne
  })
  let request = got('https://api.bilibili.com/x/space/acc/info?mid=349991143', { json: true, agent })
  setTimeout(() => {
    request.cancel()
  }, 1000)
  let data = await request.catch(() => ({ body: { data: {} } }))
  return data.body.data.mid === 349991143
}
