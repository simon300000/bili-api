/* global describe */
/* global context */
/* global it */
const biliAPI = require('..')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert

// test data
const mid = 349991143
const aid = 31779330
const uname = '神楽めあOfficial'

describe('Bilibili biliAPI', function() {
  context('bilibili', function() {
    it('mid -> uname', async function() {
      let { uname } = await biliAPI({ mid }, ['uname'])
      assert.isString(uname)
    })
    it('mid -> follower', async function() {
      let { follower } = await biliAPI({ mid }, ['follower'])
      assert.isNumber(follower)
      assert.isNotNaN(follower)
    })
    it('aid -> list', async function() {
      let object = await biliAPI({ aid }, ['list'])
      assert.isArray(object.list.i.d)
    })
    it('mid -> roomid', async function() {
      let { roomid } = await biliAPI({ mid }, ['roomid'])
      assert.strictEqual(roomid, 12235923)
    })
    it('mid -> guardNum', async function() {
      let { guardNum } = await biliAPI({ mid }, ['guardNum'])
      assert.isNumber(guardNum)
      assert.isNotNaN(guardNum)
    })
    it('uname -> mid', async function() {
      let { mid } = await biliAPI({ uname }, ['mid'])
      assert.strictEqual(mid, 349991143)
    })
    it('aid -> mid', async function() {
      let { mid } = await biliAPI({ aid }, ['mid'])
      assert.strictEqual(mid, 8829972)
    })
    it('mid -> sign', async function() {
      let { sign } = await biliAPI({ mid }, ['sign'])
      assert.isString(sign)
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
      let { stat } = await biliAPI({ mid }, ['stat'])
      assert.isObject({ stat })
    })
    it('Optinal parser', async function() {
      let { stat } = await biliAPI({ mid }, ['stat'], { parser: url => url })
      assert.isString(stat)
    })
  })
})
