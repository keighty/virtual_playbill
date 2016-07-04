var Database = function (database, config) {
  this.mysql = database
  this.config = config
  this.connection = null

  this.connect = function (cb) {
    var self = this
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