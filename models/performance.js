var onError = function (err) { if (err) throw err; }
var db = require('../config/db')
var tableName = 'performance'

module.exports = {
  all: function (cb) {
    db.connect(onError)
  }
}