var Database = require('../config/db')
var db = new Database()
var tableName = 'user'

module.exports = {
  db: db,

  all: function (cb) {
    var query = ['SELECT * from', tableName, ';'].join(' ')

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  get: function (userId, cb) {
    var query = ['SELECT * from', tableName, 'WHERE id =', userId, ';'].join(' ')

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
    var query = ['INSERT into', tableName, 'VALUES (null,', values, ');'].join(' ')

    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  },

  delete: function (userId, cb) {
    var query = ['DELETE FROM', tableName, 'WHERE ID=', userId, ';'].join(' ')
    console.log(query)
    db.connect(function (err) {
      if (err) cb(err)
      else db.query(query, cb)
    })
  }
}