var Database = function (database, config) {
  this.mysql = database || require('mysql')
  this.config = config || require('./db-config')
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

  this.performQuery = function (query, cb) {
    var self = this
    self.connect(function (err) {
      if (err) cb(err)
      else self.query(query, function (err, data) {
        cb(err, data)
        self.close()
      })
    })
  }
}

module.exports = Database
