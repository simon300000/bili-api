const biliAPI = require('.')

biliAPI({ roomid: 12235923 }, ['online']).then(console.log)
