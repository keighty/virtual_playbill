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

  // describe('all', function () {
  //   it('should return all performances', function (done) {
  //     mockdb.expects('connect')
  //           .returns

  //     var cb = function (err, performances) {
  //       expect(performances.length).to.be.eql(2)
  //       done()
  //     }

  //     performance.all(cb)
  //   })
  // })
})

//   it('all should return all the performances', function (done) {
//     var cb = function (err, performances) {
//       expect(performances).to.be.eql(existingData)
//       done()
//     }

//     performance.all(cb)
//   })

//   xit('all should throw a sql error if the records can\'t be found', function (done) {})

//   it('get should return a performance with a given id', function (done) {
//     var cb = function (err, performance) {
//       performance = performance[0]
//       actual = existingData[0]

//       expect(performance.title).to.be.eql(actual.title)
//       expect(performance.playwrite).to.be.eql(actual.playwrite)
//       done()
//     }

//     performance.get(1, cb)
//   })
// })

