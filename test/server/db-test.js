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
      query: sinon.spy(),
      end: sinon.spy()
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

  it('connection should be null by default', function () {
    expect(db.connection).to.be.null
  })

  describe('connect', function () {
    beforeEach(function () {
      mysqlMock.expects('createConnection')
                .withArgs(config)
                .returns(connection)
    })

    afterEach(function () {
      mysqlMock.verify()
    })

    it('should call mysql.createConnection', function () {
      var cb = function () {}

      db.connect(cb)
    })

    it('should call connection.connect() and pass a callback', function (done) {
      var cb = function () { done() }

      db.connect(cb)
      var registeredCallback = connection.connect.firstCall.args[0]
      registeredCallback()
    })

    it('should throw an error if it cannot connect', function (done) {
      var cb = function (err) {
        expect(err).to.not.be.null
        expect(err.message).to.be.eql('Cannot connect to the database.')
        done()
      }

      db.connect(cb)
      var registeredCallback = connection.connect.firstCall.args[0]
      registeredCallback(new Error('Cannot connect to the database.'))
    })

    it('should return a connection', function (done) {
      var cb = function () { done() }

      var result = db.connect(cb)
      expect(result).to.be.eql(connection)

      var registeredCallback = connection.connect.firstCall.args[0]
      registeredCallback()
    })
  })

  describe('query', function () {
    var testSql

    beforeEach(function () {
      db.connection = connection
      testSql = 'Select * from foo;'
    })

    it('should throw an error if there is no connection', function () {
      db.connection = null
      var call = function () {
        db.query(testSql)
      }

      expect(call).to.throw(Error, 'Bad connection')
    })

    it('should call connection.query()', function () {
      db.query(testSql)

      expect(connection.query.called).to.be.true
    })

    it('should register a callback', function (done) {
      var cb = function (err, data) {
        done()
      }

      db.query(testSql, cb)
      var registeredCallback = connection.query.firstCall.args[1]
      registeredCallback()
    })

    it('should throw a sql error if the query cannot be performed', function (done) {
      var cb = function (err, data) {
        expect(err.message).to.be.eql('Cannot perform the query')
        done()
      }

      db.query(testSql, cb)
      var registeredCallback = connection.query.firstCall.args[1]
      registeredCallback(new Error('Cannot perform the query'))
    })
  })

  describe('close', function () {
    beforeEach(function () {
      db.connection = connection
    })

    it('should call connection.end() if there is an existing connection', function () {
      db.close()
      expect(connection.end.called).to.be.true
    })

    it('should not throw an error if there is no existing connection', function () {
      db.connection = null
      var call = function () {
        db.close()
      }
      expect(call).to.not.throw(Error, 'TypeError: Cannot read property \'end\' of null')
    })

    it('should set the connection to null', function () {
      db.close()
      expect(db.connection).to.be.null
    })
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
