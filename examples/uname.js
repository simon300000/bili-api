const biliAPI = require('bili-api');

(async () => {
  let { guardNum } = await biliAPI({ uname: '白上吹雪Official' }, ['guardNum'])
  guardNum // DATA
})()
