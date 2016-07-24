var expect = require('chai').expect
var sinon = require('sinon')
var performer = require('../../../models/performer')
var Database = require('../../../config/db')

describe('performer model', function () {
  var sandbox, mockDb

  var testData = [
    {id: 1, foo: 'bar'},
    {id: 2, foo: 'baz'}
  ]

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockDb = {
      performQuery: sandbox.spy()
    }
    performer.db = mockDb
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
      performer.all(cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return all performers', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql(testData)
        done()
      }
      performer.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, testData)
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performer.all(cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#get', function () {
    it('should call performQuery', function () {
      performer.get()

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific performer', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql([testData[0]])
        done()
      }
      performer.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, [testData[0]])
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performer.get(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#add', function () {
    var testPerformer = {
      fName: 'foo',
      lName: 'bar'
    }

    it('should call performQuery', function () {
      var cb = function () {}
      performer.add(testPerformer)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should return a specific performer', function (done) {
      var cb = function (err, data) {
        expect(data).to.be.eql('success')
        done()
      }
      performer.add(testPerformer, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(null, 'success')
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performer.add(testPerformer, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#delete', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      performer.delete(1, cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performer.delete(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })

  describe('#getPerformances', function () {
    it('should call performQuery', function () {
      var cb = function () {}
      performer.getPerformances(1, cb)

      expect(mockDb.performQuery.called).to.be.true
    })

    it('should handle query errors', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Bad query')
        done()
      }
      performer.getPerformances(1, cb)

      var registeredQueryCallback = mockDb.performQuery.firstCall.args[1]
      registeredQueryCallback(new Error('Bad query'))
    })
  })
})
