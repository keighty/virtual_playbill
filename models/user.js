var Database = require('../config/db')
var db = new Database()
var tableName = 'user'
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

  add: function (user, cb) {
    var values = [
      user.f_name,
      user.l_name
    ].join(', ')
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