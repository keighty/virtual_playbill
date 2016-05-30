var expect = require('chai').expect
var sinon = require('sinon')
var db = require('../../config/db')
var schema = require('../helpers/test-schema')
var schemaParser = require('../../config/schema-parser')

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

  describe('Create a database', function () {
    var sandbox
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('should parse a given schema', function (done) {
      sandbox.stub(db, 'getSchema', function (data) {
        expect(data).to.be.eql(schema)
        done()
      })

      db.createDatabase(schema)
    })

    it('getSchema should return an array of table schemas', function () {
      var result = [
        "CREATE TABLE IF NOT EXISTS basic (id INT AUTO_INCREMENT NOT NULL, fName VARCHAR(60), lName VARCHAR(60), email VARCHAR(90), PRIMARY KEY (id), FOREIGN KEY (fName) REFERENCES foo(bar));",
        "CREATE TABLE IF NOT EXISTS complex (fName VARCHAR(60), email VARCHAR(90) NOT NULL, PRIMARY KEY (fName,email), FOREIGN KEY (fName) REFERENCES foo(bar), FOREIGN KEY (email) REFERENCES crunchy(bacon));"
      ]

      expect(db.getSchema(schema)).to.be.eql(result)
    })

    xit('should call createTable for each table schema', function () {
      var onError = function (err) { if (err) throw err; }

      var dbMock = sandbox.mock(db)
      dbMock.expects('createTable').withArgs(basicTable, onError)
      dbMock.expects('processTableSchema').withArgs(complexTable, onError)

      db.createDatabase(schema)
      dbMock.verify()
    })
  })
  // it('should create a database from a given schema', function () {
  //   var callback = function (err) {
  //     expect(err).to.be.null
  //     db.close()
  //     done()
  //   }

  //   db.create
  // })
})
