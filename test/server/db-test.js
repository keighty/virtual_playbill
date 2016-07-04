var expect = require('chai').expect
var sinon = require('sinon')
var Database = require('../../config/db')
// var schema = require('../helpers/test-schema')
// var SchemaParser = require('../../config/schema-parser')
var mysql = require('mysql')

describe.only('Database', function () {
  var config, db, sandbox, connection, mysqlMock

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mysqlMock = sandbox.mock(mysql)
    config = {
        database: 'testDB',
        host: 'localhost',
        user: 'testUser',
        password: 'testPassword',
      }
    connection = {
      connect: sinon.spy(),
      query: function () {}
    }

    db = new Database(mysql, config)
  })

  afterEach(function () {
    sandbox.restore()
    mysqlMock.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  it('should take a config', function () {
    expect(db.config).to.be.eql(config)
  })

  it('should take a database module', function () {
    expect(db.mysql).to.be.eql(mysql)
  })

  describe('connect', function () {
    it('connection should be null by default', function () {
      expect(db.connection).to.be.null
    })

    it('should call mysql.createConnection', function () {
      var cb = function () {}
      mysqlMock.expects('createConnection')
                .withArgs(config)
                .returns(connection)

      db.connect(cb)
      mysqlMock.verify()
    })

    it('should call connection.connect() and pass a callback', function (done) {
      var cb = function () { done() }
      mysqlMock.expects('createConnection')
                .withArgs(config)
                .returns(connection)

      db.connect(cb)
      var registeredCallback = connection.connect.firstCall.args[0]
      registeredCallback()
    })

    xit('should return a connection', function (done) {
      var cb = function () { done() }
      mysqlMock.expects('createConnection')
                .withArgs(config)
                .returns(connection)

      var result = db.connect(cb)
      // sandbox.stub(connection, 'connect', function (args) {
      //   expect(args).to.be.eql(cb)
      // })

      // var result = db.connect(cb)
      // expect(result).to.be.eql(connection)
      // expect(db.connect(cb)).to.be.eql(connection)
    })

    // xit('should connect to the database', function (done) {
    //   var callback = function (err) {
    //     expect(err).to.be.null
    //     expect(db.connection).to.be.eql(connection)
    //   }

    //   db.connect(callback)
    // })
  //   xit('connect should set connection', function (done) {
    //   var callback = function (err) {
    //     expect(err).to.be.null
    //     expect(db.get().config.database).to.be.eql('virtual_playbill')
    //     db.close()
    //     done()
    //   }

    //   db.connect(callback)
    // })

    xit('should perform queries on the database', function () {})
    xit('should throw a sql error if the query cannot be performed', function () {})
    xit('should throw an error if it cannot connect', function () {})
  })


  xit('close should set the existing connection to null', function () {
    db.close()
    expect(db.connection).to.be.null
  })

  xit('close should close the existing connection', function (done) {
    db.connection = { end: function () { done() }}
    db.close()
    expect(db.connection).to.be.null
  })


  xdescribe('Create a database', function () {
    var sandbox, schemaParser, result, onError, basicQuery

    before(function () {
      schemaParser = new SchemaParser()
      result = schemaParser.parseSchema(schema)
      onError = function (err) { if (err) throw err }
      basicQuery = 'CREATE TABLE IF NOT EXISTS foo (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY (id));'
    })

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      db.connect(onError)
    })

    afterEach(function () {
      sandbox.restore()
      db.close()
    })

    it('should parse a given schema', function (done) {
      sandbox.stub(db, 'getSchemas', function (data) {
        expect(data).to.be.eql(schema)
        done()
        return []
      })

      db.createDatabase(schema)
    })

    it('getSchemas should return an array of table schemas', function () {
      expect(db.getSchemas(schema)).to.be.eql(result)
    })

    it('should call createTable for each table schema', function () {
      var dbMock = sandbox.mock(db)
      dbMock.expects('createTable').withArgs(result[0])
      dbMock.expects('createTable').withArgs(result[1])

      db.createDatabase(schema)
      dbMock.verify()
    })

    it('createTable should grab the existing database connection', function (done) {
      sandbox.stub(db, 'get', function () {
        done()
      })

      db.createTable(basicQuery)
    })

    it('createTable should get a new Connection if there is not one available', function (done) {
      sandbox.stub(db, 'get').returns(null)
      sandbox.stub(db, 'connect', function () {
        done()
      })

      db.createTable(basicQuery)
    })

    xit('createTable should send the table schema and an onError callback', function (done) {
      var connect = {
        query: function (schema, cb) {
          done()
        }
      }

      sandbox.stub(db, 'get').returns(connect)

      db.createTable(basicQuery)
    })

    xit('createTable should report sql errors', function () {})
    xit('createTable should successfully create a database table', function () {})
  })

  xdescribe('Drop a table', function () {
    var sandbox, onError

    before(function () {
      onError = function (err) { if (err) throw err }
    })

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      db.connect(onError)
    })

    afterEach(function () {
      sandbox.restore()
      db.close()
    })

    xit('should drop a table', function (done) {
    })

    xit('dropTable should throw an error for an invalid table name', function () {
      var cb = function (err, data) {}

      var call = function () {
        db.dropTable('undefinedTableName', cb)
      }

      expect(call).to.throw(Error, 'ER_BAD_TABLE_ERROR: Unknown table \'virtual_playbill.undefinedtablename\'')
    })
  })
})
