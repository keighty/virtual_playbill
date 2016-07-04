
// var SchemaParser = require('./schema-parser')

// module.exports = {
//   dbName: 'virtual_playbill',
//   config: {
//     database: 'virtual_playbill',
//     host: 'localhost',
//     password: process.env.MYSQL_TESTVP_PASSWORD,
//     user: 'testvp'
//   },
//   connection: null,
//   onError: function (err) { if (err) throw err },

//   get: function () { return this.connection },
//   close: function () {
//     var self = this
//     if (self.connection) {
//       self.connection.end()
//       self.connection = null
//     }
//   },

//   connect: function (cb) {
//     var self = this
//     self.connection = mysql.createConnection(self.config, cb)
//     self.connection.connect(cb, function () {
//       self.connection.query('CREATE DATABASE IF NOT EXISTS ' + self.dbName, cb, function () {
//         self.connection.query('USE ' + self.dbName, cb)
//       })
//     })
//     return self.connection
//   },

//   insert: function (data, cb) {
//     cb()
//   },

//   drop: function (tableName,cb) {
//     cb()
//   },

//   createDatabase: function (schema) {
//     var self = this
//     var schemas = this.getSchemas(schema)

//     schemas.forEach(function (schema) {
//       self.createTable(schema)
//     })
//   },

//   getSchemas: function (schema) {
//     var sp = new SchemaParser()
//     return sp.parseSchema(schema)
//   },

//   createTable: function (tableSchema) {
//     var self = this
//     var connection = self.get() || self.connect(self.onError)
//     self.connection.query(tableSchema, self.onError)
//   },

//   dropTable: function (tableName, cb) {
//     var self = this
//     var connection = self.get() || self.connect(self.onError)
//     self.connection.query('DROP TABLE ' + tableName + ';', function (err, data) {
//       if (err) throw err
//       cb()
//     })
//   }
// }

var Database = function (database, config) {
  this.mysql = database
  this.config = config
  this.connection = null

  this.connect = function (cb) {
    var self = this
    self.connection = self.mysql.createConnection(self.config)
    self.connection.connect(cb)
    return self.connection
  }
}

module.exports = Database