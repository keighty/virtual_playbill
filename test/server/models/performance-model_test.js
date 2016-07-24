var expect = require('chai').expect
var sinon = require('sinon')
var performance = require('../../../models/performance')

describe('performance model', function () {
  var sandbox, mockDb

  var testPerformance = {
    title: 'foo',
    director: 'bar',
    venue: 'baz',
    choreographer: 'crunchy',
    category: 'bacon',
  }

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockDb = {
      performQuery: sandbox.spy(),
    }
    performance.db = mockDb
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('#all', function () {
    it('should call performQuery', function () {
      performance.all()

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return all performances', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql([testPerformance])
        done()
      }
      performance.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, [testPerformance])
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performance.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#get', function () {
    it('should call performQuery', function () {
      performance.get(1)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific performance', function (done) {
      var testData = [
        {id: 1, foo: 'bar'},
        {id: 2, foo: 'baz'},
      ]
      var cb = function (err, data) {
        expect(data).to.be.eql([testData[0]])
        done()
      }
      performance.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, [testData[0]])
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performance.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#add', function () {
    it('should call performQuery', function () {
      performance.add(testPerformance)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific performance', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql('success')
        done()
      }
      performance.add(testPerformance, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, 'success')
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performance.add(testPerformance, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#delete', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      performance.delete(1, cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performance.delete(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })
})
