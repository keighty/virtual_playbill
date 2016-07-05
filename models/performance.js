var Database = require('../config/db')
var db = new Database()
var tableName = 'performance'

module.exports = {
  db: db,

  all: function (cb) {
    var query = 'SELECT * from performance;'
    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  get: function (performanceId, cb) {
    var connection = db.connect(cb)
    var query = 'SELECT * FROM performance WHERE ID=' + performanceId

    connection.query(query, cb)
  },

  add: function () {},
  delete: function () {}
}