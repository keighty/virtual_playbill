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
    var query = 'SELECT * FROM performance WHERE ID=' + performanceId

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  add: function (performance, cb) {
    var values = [
      performance.title,
      performance.playwright,
      performance.director,
      performance.company,
      performance.venue,
      performance.music,
      performance.choreographer,
      performance.synopsis,
      performance.category,
      performance.image
    ].join(',')
    var query = 'INSERT into performance VALUES (null, list)'.replace(/list/, values)

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  delete: function () {}
}