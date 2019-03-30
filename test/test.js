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
      let object = await biliAPI({ mid }, ['uname'])
      assert.isString(object.uname)
    })
    it('mid -> follower', async function() {
      let object = await biliAPI({ mid }, ['follower'])
      assert.isNumber(object.follower)
      assert.isNotNaN(object.follower)
    })
    it('aid -> list', async function() {
      let object = await biliAPI({ aid }, ['list'])
      assert.isArray(object.list.i.d)
    })
    it('mid -> roomid', async function() {
      let object = await biliAPI({ mid }, ['roomid'])
      assert.strictEqual(object.roomid, 12235923)
    })
    it('mid -> guardNum', async function() {
      let object = await biliAPI({ mid }, ['guardNum'])
      assert.isNumber(object.guardNum)
      assert.isNotNaN(object.guardNum)
    })
    it('uname -> mid', async function() {
      let object = await biliAPI({ uname }, ['mid'])
      assert.strictEqual(object.mid, 349991143)
    })
    it('aid -> mid', async function() {
      let object = await biliAPI({ aid }, ['mid'])
      assert.strictEqual(object.mid, 8829972)
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
      let object = await biliAPI({ mid }, ['stat'])
      assert.isObject(object.stat)
    })
    it('Optinal parser', async function() {
      let object = await biliAPI({ mid }, ['stat'], { parser: url => url })
      assert.isString(object.stat)
    })
  })
})
