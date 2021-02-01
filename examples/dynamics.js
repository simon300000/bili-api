const biliAPI = require('../');

(async () => {
  console.log('Reached dynamics.')
  const { dynamics } = await biliAPI({ mid: 349991143, dynamicOffset: 485810137475565100 }, ['dynamics'])
  console.log(dynamics)
})()
