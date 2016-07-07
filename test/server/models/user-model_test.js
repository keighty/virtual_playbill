var expect = require('chai').expect
var sinon = require('sinon')
var user = require('../../../models/user')
var Database = require('../../../config/db')

describe('user model', function () {
  var mockConnect, sandbox

  var testData = [
    {id: 1, foo: 'bar'},
    {id: 2, foo: 'baz'}
  ]

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockConnect = user.db.connect = sandbox.spy()
    mockQuery = user.db.query = sandbox.spy()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('#all', function () {
    it('should call connect', function () {
      user.all()

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      user.all(cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      user.all()

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return all users', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql(testData)
        done()
      }
      user.all(cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(null, testData)
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.all(cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#get', function () {
    it('should call connect', function () {
      user.get()

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      user.get(1, cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      user.get(1)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return a specific user', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql([testData[0]])
        done()
      }
      user.get(1, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(null, [testData[0]])
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.get(1, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#add', function () {
    var testUser = {
      f_name: 'foo',
      l_name: 'bar'
    }

    it('should call connect', function () {
      user.add(testUser)

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      user.add(testUser, cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      user.add(testUser)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return a specific user', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql('success')
        done()
      }
      user.add(testUser, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(null, 'success')
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.add(testUser, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#delete', function () {
    it('should call connect', function () {
      user.delete(1)

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      user.delete(1, cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      user.delete(1, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      user.delete(1, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })
})
