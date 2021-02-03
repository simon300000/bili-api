const biliAPI = require('../');

(async () => {
  const { dynamics } = await biliAPI({ mid: 349991143, dynamicOffset: 485810137475565100 }, ['dynamics'])
  dynamics // DATA
})()
