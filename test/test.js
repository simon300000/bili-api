/* global describe */
/* global context */
/* global it */
const api = require('..')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert

// test data
const mid = 349991143
const aid = 31779330
const uname = '神楽めあOfficial'

describe('Bilibili API', function() {
  context('bilibili', function() {
    it('mid -> uname', async function() {
      let object = await api({ mid }, ['uname'])
      assert.isString(object.uname)
    })
    it('mid -> follower', async function() {
      let object = await api({ mid }, ['follower'])
      assert.isNumber(object.follower)
      assert.isNotNaN(object.follower)
    })
    it('aid -> list', async function() {
      let object = await api({ aid }, ['list'])
      assert.isArray(object.list.i.d)
    })
    it('uname -> mid', async function() {
      let object = await api({ uname }, ['mid'])
      assert.strictEqual(object.mid, 349991143)
    })
    it('aid -> mid', async function() {
      let object = await api({ aid }, ['mid'])
      assert.strictEqual(object.mid, 8829972)
    })
  })
  context('Route', function() {
    it('Should reject', function() {
      return assert.isRejected(api({}, ['uname']))
    })
    // TODO: Correct order of "oneOf" value
  })
  context('Options', function() {
    it('Default parser', async function() {
      let object = await api({ mid }, ['stat'])
      assert.isObject(object.stat)
    })
    it('Optinal parser', async function() {
      let object = await api({ mid }, ['stat'], { parser: url => url })
      assert.isString(object.stat)
    })
  })
})
