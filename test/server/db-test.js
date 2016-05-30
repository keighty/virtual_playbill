var expect = require('chai').expect
var db = require('../../config/db.js')

describe('db tests', function () {
  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  it('should return a db object with a config', function () {
    var expectedConfig = {
      database: 'virtual_playbill',
      host: 'localhost',
      user: 'testvp',
      password: process.env.MYSQL_TESTVP_PASSWORD,
    }

    expect(db.config).to.be.eql(expectedConfig)
  })

  it('get should return null connection by default', function () {
    expect(db.get()).to.be.null
  })

  it('close should set the existing connection to null', function () {
    db.close()
    expect(db.connection).to.be.null
  })

  it('close should close the existing connection', function (done) {
    db.connection = { end: function () { done() }}
    db.close()
    expect(db.connection).to.be.null
  })

  it('connect should set connection', function (done) {
    var callback = function (err) {
      expect(err).to.be.null
      expect(db.get().config.database).to.be.eql('virtual_playbill')
      db.close()
      done()
    }

    db.connect(callback)
  })

})