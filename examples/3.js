const biliAPI = require('bili-api');

(async () => {
  let { guardLevel } = await biliAPI({ mid: 349991143 }, ['guardLevel'], { wait: 200 })
  guardLevel // DATA
})()
