var expect = require('chai').expect
var sinon = require('sinon')
var user = require('../../../models/user')

describe('user model', function () {
  var sandbox, mockDb

  var testData = [
    {id: 1, foo: 'bar'},
    {id: 2, foo: 'baz'},
  ]

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockDb = {
      performQuery: sandbox.spy(),
    }
    user.db = mockDb
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('#all', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      user.all(cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return all users', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql(testData)
        done()
      }
      user.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, testData)
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#get', function () {
    it('should call performQuery', function () {
      user.get()

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific user', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql([testData[0]])
        done()
      }
      user.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, [testData[0]])
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#add', function () {
    var testUser = {
      fName: 'foo',
      lName: 'bar',
    }

    it('should call performQuery', function () {
      user.add(testUser)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific user', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql('success')
        done()
      }
      user.add(testUser, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, 'success')
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.add(testUser, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#delete', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      user.delete(1, cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.delete(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#getPerformances', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      user.getPerformances(1, cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.getPerformances(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })
})
