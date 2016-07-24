var Database = require('../config/db')
var schema = require('../config/schema')
var database = new Database()
var tableName = 'performer'
var query

module.exports = {
  db: database,

  all: function (cb) {
    query = ['SELECT * from', tableName, ';'].join(' ')
    this.db.performQuery(query, cb)
  },

  get: function (id, cb) {
    query = ['SELECT * from', tableName, 'WHERE id =', id, ';'].join(' ')
    this.db.performQuery(query, cb)
  },

  add: function (performer, cb) {
    var values = schema.getTableValues(tableName, performer)

    query = ['INSERT into', tableName, 'VALUES (null,', values, ');'].join(' ')
    this.db.performQuery(query, cb)
  },

  delete: function (id, cb) {
    query = ['DELETE FROM', tableName, 'WHERE ID=', id, ';'].join(' ')
    this.db.performQuery(query, cb)
  },

  getPerformances: function (id, cb) {
    query = [
      'SELECT performance.*, user_performance.ticket_date',
      'FROM user_performance',
      'JOIN performance',
      'ON performance.id = user_performance.performance_id',
      'WHERE user_id =',
      id,
    ].join(' ')
    this.db.performQuery(query, cb)
  },
}
