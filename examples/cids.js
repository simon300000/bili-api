const biliAPI = require('bili-api');

(async () => {
  let { cids } = await biliAPI({ aid: 27702699 }, ['cids'])
  cids // DATA
})()
