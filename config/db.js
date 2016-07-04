var mysql = require('mysql')
var dbconfig = require('./db-config')

var Database = function (database, config) {
  this.mysql = database || mysql
  this.config = config || dbconfig
  this.connection = null

  this.connect = function (cb) {
    var self = this
    if (self.connection) return self.connection
    self.connection = self.mysql.createConnection(self.config)
    self.connection.connect(function (err) {
      if (err) cb(err)
      else {
        self.connection.query('USE ' + self.config.database, cb)
      }
    })
    return self.connection
  }

  this.query = function (sql, cb) {
    var self = this
    if (self.connection) self.connection.query(sql, cb)
    else throw new Error('Bad connection')
  }

  this.close = function () {
    if (this.connection) {
      this.connection.end()
      this.connection = null
    }
  }
}

module.exports = Database