const biliAPI = require('bili-api');

(async () => {
  let { allVideos } = await biliAPI({ mid: 286700005 }, ['allVideos'])
  allVideos.length  // DATA
  allVideos[0]  // DATA
})()
