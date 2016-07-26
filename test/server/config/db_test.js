var expect = require('chai').expect
var sinon = require('sinon')
var Database = require('../../../config/db')
var mysql = require('mysql')

describe('Database', function () {
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
      end: sinon.spy(),
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
    describe('existing connection', function () {
      it('should return an existing connection', function () {
        var cb = function () {}
        var testConnection = {foo: 'bar'}
        db.connection = testConnection
        expect(db.connect(cb)).to.be.eql(testConnection)
      })
    })

    describe('non existant connection', function () {
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

      it('should call connection.connect() and pass a callback', function () {
        var cb = function () { }

        db.connect(cb)
        expect(connection.connect.called).to.be.true
      })

      it('should throw an error if it cannot connect', function (done) {
        var cb = function (err) {
          expect(err.message).to.be.eql('Cannot connect to the database.')
          done()
        }

        db.connect(cb)

        var registeredCallback = connection.connect.firstCall.args[0]
        registeredCallback(new Error('Cannot connect to the database.'))
      })

      it('should return a connection', function () {
        var cb = function () { }

        var result = db.connect(cb)
        expect(result).to.be.eql(connection)
      })

      it('should call connection.connect() and connection.query()', function (done) {
        var cb = function () { done() }
        db.connect(cb)
        expect(connection.connect.called).to.be.true

        var connectCallback = connection.connect.firstCall.args[0]
        connectCallback()

        var queryString = connection.query.firstCall.args[0]
        expect(queryString).to.be.eql('USE ' + config.database)

        var queryCallback = connection.query.firstCall.args[1]
        queryCallback()
      })
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
      var cb = function () {
        done()
      }

      db.query(testSql, cb)
      var registeredCallback = connection.query.firstCall.args[1]
      registeredCallback()
    })

    it('should throw a sql error if the query cannot be performed', function (done) {
      var cb = function (err) {
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

  describe('performQuery', function () {
    var cb, query, queryCallback, queryString, connectCallback, registeredCallback

    beforeEach (function () {
      mysqlMock.expects('createConnection')
          .withArgs(config)
          .returns(connection)
      query = 'SELECT * FROM foo;'
    })

    it('should call connect', function () {
      var dbConnectMock = sandbox.mock(db)
      cb = function () {}

      dbConnectMock.expects('connect')
      db.performQuery(query, cb)
      dbConnectMock.verify()
    })

    it('should handle a connection error', function (done) {
      cb = function (err) {
        expect(err.message).to.be.eql('Cannot connect to the database.')
        done()
      }

      db.performQuery(query, cb)

      registeredCallback = connection.connect.firstCall.args[0]
      registeredCallback(new Error('Cannot connect to the database.'))
      mysqlMock.verify()
    })

    it('should call query', function (done) {
      cb = function () { done() }

      db.performQuery(query, cb)
      expect(connection.connect.called).to.be.true

      connectCallback = connection.connect.firstCall.args[0]
      connectCallback()

      queryString = connection.query.firstCall.args[0]
      expect(queryString).to.be.eql('USE ' + config.database)

      queryCallback = connection.query.firstCall.args[1]
      queryCallback()

      queryString = connection.query.secondCall.args[0]
      expect(queryString).to.be.eql(query)
      queryCallback = connection.query.secondCall.args[1]
      queryCallback()
    })

    it('should pass data to the callback', function (done) {
      var testdata = [{foo: 'bar'}, {foo: 'baz'}]
      cb = function (err, data) {
        expect(err).to.be.null
        expect(data).to.be.eql(testdata)
        done()
      }

      db.performQuery(query, cb)
      expect(connection.connect.called).to.be.true

      connectCallback = connection.connect.firstCall.args[0]
      connectCallback()
      queryCallback = connection.query.firstCall.args[1]
      queryCallback()
      queryCallback = connection.query.secondCall.args[1]
      queryCallback(null, testdata)
    })

    it('should pass sql errors to the callback', function (done) {
      var errMessage = 'Sql error'
      cb = function (err) {
        expect(err.message).to.be.eql(errMessage)
        done()
      }

      db.performQuery(query, cb)
      expect(connection.connect.called).to.be.true

      connectCallback = connection.connect.firstCall.args[0]
      connectCallback()
      queryCallback = connection.query.firstCall.args[1]
      queryCallback()

      queryCallback = connection.query.secondCall.args[1]
      queryCallback(new Error('Sql error'))
    })
  })
})
