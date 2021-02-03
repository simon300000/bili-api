const biliAPI = require('bili-api');

(async () => {
  let { allVideos } = await biliAPI({ mid: 380829248 }, ['allVideos'])
  allVideos.length  // DATA
  allVideos[0]  // DATA
})()
