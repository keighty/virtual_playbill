var Database = require('../config/db')
var db = new Database()
var tableName = 'performance'
var query

module.exports = {
  db: db,

  all: function (cb) {
    query = ['SELECT * from', tableName, ';'].join(' ')


    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  get: function (id, cb) {
    query = ['SELECT * from', tableName, 'WHERE id =', id, ';'].join(' ')

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
    query = ['INSERT into', tableName, 'VALUES (null,', values, ');'].join(' ')

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  delete: function (id, cb) {
    query = ['DELETE FROM', tableName, 'WHERE ID=', id, ';'].join(' ')

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  }
}