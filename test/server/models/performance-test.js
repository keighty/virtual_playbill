var expect = require('chai').expect
var sinon = require('sinon')
var performance = require('../../../models/performance')
var Database = require('../../../config/db')

describe('performance model', function () {
  var mockdb, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockdb = sandbox.mock(new Database())
  })

  afterEach(function () {
    sandbox.restore()
    mockdb.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
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

