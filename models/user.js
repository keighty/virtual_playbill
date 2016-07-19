var Database = require('../config/db')
var db = new Database()

function performQuery (query, cb) {
  db.connect(function (err) {
    if (err) cb(err)
    else db.query(query, function (err, data) {
      cb(err, data)
      db.close()
    })
  })
}
var tableName = 'user'
var query

module.exports = {
  db: db,

  all: function (cb) {
    query = ['SELECT * from', tableName, ';'].join(' ')
    performQuery(query, cb)
  },

  get: function (id, cb) {
    query = ['SELECT * from', tableName, 'WHERE id =', id, ';'].join(' ')
    performQuery(query, cb)
  },

  add: function (user, cb) {
    var values = [
      user.f_name,
      user.l_name
    ].join(', ')
    query = ['INSERT into', tableName, 'VALUES (null,', values, ');'].join(' ')
    performQuery(query, cb)
  },

  delete: function (id, cb) {
    query = ['DELETE FROM', tableName, 'WHERE ID=', id, ';'].join(' ')
    performQuery(query, cb)
  }
}