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
const aid = 30669363

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
  })
  context('Route', function() {
    it('Should reject', function() {
      return assert.isRejected(api({}, ['uname']))
    })
  })
})
