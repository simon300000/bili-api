const biliAPI = require('bili-api');

(async () => {
  // 一 般 友 情 夏 色 祭
  let { uname } = await biliAPI({ aid: 33342306 }, ['uname'])
  uname // DATA
})()
