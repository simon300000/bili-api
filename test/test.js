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

describe('Bilibili API', function() {
  context('bilibili', function() {
    it('mid -> uname', async function() {
      let object = await api({ mid }, ['uname'])
      assert.typeOf(object.uname, 'string')
    })
    it('mid -> follower', async function() {
      let object = await api({ mid }, ['follower'])
      assert.typeOf(object.follower, 'number')
      assert.isNotNaN(object.follower)
    })
  })
  context('Route', function() {
    it('Should reject', function() {
      return assert.isRejected(api({}, ['uname']))
    })
  })
})
