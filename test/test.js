/* global describe */
/* global context */
/* global it */
const biliAPI = require('..')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert

// test data
// mid: 349991143
// aid: 31779330
// uname: '神楽めあOfficial'
// roomid: 12235923

describe('Bilibili biliAPI', function() {
  context('bilibili', function() {
    it('mid -> uname', async function() {
      let { uname } = await biliAPI({ mid: 349991143 }, ['uname'])
      assert.isString(uname)
    })
    it('mid -> follower', async function() {
      let { follower } = await biliAPI({ mid: 349991143 }, ['follower'])
      assert.isNumber(follower)
      assert.isNotNaN(follower)
    })
    it('aid -> list', async function() {
      let object = await biliAPI({ aid: 31779330 }, ['list'])
      assert.isArray(object.list.i.d)
    })
    it('mid -> roomid', async function() {
      let { roomid } = await biliAPI({ mid: 349991143 }, ['roomid'])
      assert.strictEqual(roomid, 12235923)
    })
    it('mid -> guardNum', async function() {
      let { guardNum } = await biliAPI({ mid: 349991143 }, ['guardNum'])
      assert.isNumber(guardNum)
      assert.isNotNaN(guardNum)
    })
    it('uname -> mid', async function() {
      let { mid } = await biliAPI({ uname: '神楽めあOfficial' }, ['mid'])
      assert.strictEqual(mid, 349991143)
    })
    it('aid -> mid', async function() {
      let { mid } = await biliAPI({ aid: 31779330 }, ['mid'])
      assert.strictEqual(mid, 8829972)
    })
    it('mid -> sign', async function() {
      let { sign } = await biliAPI({ mid: 349991143 }, ['sign'])
      assert.isString(sign)
    })
    it('roomid -> mid', async function() {
      let { mid } = await biliAPI({ roomid: 12235923 }, ['mid'])
      assert.strictEqual(mid, 349991143)
    })
    it('roomid -> liveStatus', async function() {
      let { liveStatus } = await biliAPI({ roomid: 12235923 }, ['liveStatus'])
      assert.isNumber(liveStatus)
      assert.isNotNaN(liveStatus)
    })
    it('roomid -> title', async function() {
      let { title } = await biliAPI({ roomid: 12235923 }, ['title'])
      assert.isString(title)
    })
    it('roomid -> online', async function() {
      let { online } = await biliAPI({ roomid: 12235923 }, ['online'])
      assert.isNumber(online)
      assert.isNotNaN(online)
    })
  })
  context('Route', function() {
    it('Should reject when no require input', function() {
      return assert.isRejected(biliAPI({}, ['uname']))
    })
    it('API namespace', function() {
      const input = Object.keys(require('../src/api/input'))
      const data = Object.keys(require('../src/api/data'))
      const api = Object.keys(require('../src/api/api.bilibili.com'))
      const live = Object.keys(require('../src/api/api.live.bilibili.com'))
      let array = [...input, ...data, ...api, ...live]
      let check = {}
      for (let i = 0; i < array.length; i++) {
        if (check[array[i]]) throw new Error(`Repeat ${array[i]}`)
        check[array[i]] = true
      }
    })
    // TODO: Correct order of "oneOf" value
  })
  context('Options', function() {
    it('Default parser', async function() {
      let { stat } = await biliAPI({ mid: 349991143 }, ['stat'])
      assert.isObject({ stat })
    })
    it('Optinal parser', async function() {
      let { stat } = await biliAPI({ mid: 349991143 }, ['stat'], { parser: url => url })
      assert.isString(stat)
    })
  })
})
