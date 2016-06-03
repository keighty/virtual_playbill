var onError = function (err) { if (err) throw err; }
var db = require('../config/db')
var tableName = 'performance'

module.exports = {
  all: function (cb) {
    var connection = db.connect(onError)
    var query = 'SELECT * from performance;'

    connection.query(query, cb)
  },

  get: function (performanceId, cb) {
    var connection = db.connect(onError)
    var query = 'SELECT * FROM performance WHERE ID=' + performanceId

    connection.query(query, cb)
  }
}