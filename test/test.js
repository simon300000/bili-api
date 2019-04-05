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
  })
  context('Route', function() {
    it('Should reject', function() {
      return assert.isRejected(biliAPI({}, ['uname']))
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
