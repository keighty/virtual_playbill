var performQuery = require('../config/perform-query')
var tableName = 'user'
var query

module.exports = {
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