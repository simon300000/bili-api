const biliAPI = require('bili-api');

(async () => {
  let { guardLevel } = await biliAPI({ mid: 415578378 }, ['guardLevel'], { wait: 200 })
  guardLevel // DATA
})()
