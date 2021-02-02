const biliAPI = require('bili-api');

(async () => {
  let { guardNum } = await biliAPI({ uname: '帕里_Paryi' }, ['guardNum'])
  guardNum // DATA
})()
