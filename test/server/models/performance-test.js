var expect = require('chai').expect
var sinon = require('sinon')
var performance = require('../../../models/performance')
var Database = require('../../../config/db')

describe('performance model', function () {
  var mockConnect, sandbox, connection

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockConnect = performance.db.connect = sandbox.spy()
    mockQuery = performance.db.query = sandbox.spy()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  describe('#all', function () {
    it('should call connect', function () {
      performance.all()

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      performance.all(cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      performance.all()

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return all performances', function (done) {
      var testData = [
        {id: 1, foo: 'bar'},
        {id: 2, foo: 'baz'}
      ]
      var cb = function (err, data) {
        expect(data).to.be.eql(testData)
        done()
      }
      performance.all(cb)

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
      performance.all(cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#get', function () {
    it('should call connect', function () {
      performance.get()

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      performance.get(1, cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      performance.get(1)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return a specific performance', function (done) {
      var testData = [
        {id: 1, foo: 'bar'},
        {id: 2, foo: 'baz'}
      ]
      var cb = function (err, data) {
        expect(data).to.be.eql([testData[0]])
        done()
      }
      performance.get(1, cb)

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
      performance.get(1, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#add', function () {
    var testPerformance = {
      title: 'foo',
      director: 'bar',
      venue: 'baz',
      choreographer: 'crunchy',
      category: 'bacon'
    }

    it('should call connect', function () {
      performance.add(testPerformance)

      expect(mockConnect.called).to.be.true
    })

    it('should handle a connection error', function (done) {
      var cb = function (err) {
        expect(err.message).to.be.eql('Could not connect')
        done()
      }

      performance.add(testPerformance, cb)
      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback(new Error('Could not connect'))
    })

    it('should call query', function () {
      var cb = function () {}
      performance.add(testPerformance)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      expect(mockQuery.called).to.be.true
    })

    it('should return a specific performance', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql('success')
        done()
      }
      performance.add(testPerformance, cb)

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
      performance.add(testPerformance, cb)

      var registeredCallback = mockConnect.firstCall.args[0]
      registeredCallback()

      var registeredQueryCallback = mockQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

})
