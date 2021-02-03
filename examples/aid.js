const biliAPI = require('bili-api');

(async () => {
  // 迷 迭 迷 迭 帕 里 桑
  let { uname } = await biliAPI({ aid: 54299141 }, ['uname'])
  uname // DATA
})()
