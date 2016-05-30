var mysql = require('mysql')
var SchemaParser = require('./schema-parser')

module.exports = {
  dbName: 'virtual_playbill',
  config: {
    database: 'virtual_playbill',
    host: 'localhost',
    password: process.env.MYSQL_TESTVP_PASSWORD,
    user: 'testvp'
  },
  connection: null,

  get: function () { return this.connection },
  close: function () {
    var self = this
    if (self.connection) {
      self.connection.end()
      self.connection = null
    }
  },

  connect: function (cb) {
    var self = this
    self.connection = mysql.createConnection(self.config, cb)
    self.connection.connect(cb, function () {
      self.connection.query('CREATE DATABASE IF NOT EXISTS ' + self.dbName, cb, function () {
        self.connection.query('USE ' + self.dbName, cb)
      })
    })
    return self.connection
  },

  insert: function (data, cb) {
    cb()
  },

  drop: function (tableName,cb) {
    cb()
  },

  createDatabase: function (schema) {
    var schema = this.getSchema(schema)
  },

  getSchema: function (schema) {
    var sp = new SchemaParser()
    return sp.parseSchema(schema)
  }
}