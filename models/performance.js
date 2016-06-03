var onError = function (err) { if (err) throw err; }
var db = require('../config/db')
var tableName = 'performance'

module.exports = {
  all: function (cb) {
    var connection = db.connect(onError, cb)
    var query = 'SELECT * from performance;'

    connection.query(query, cb)
  }
}