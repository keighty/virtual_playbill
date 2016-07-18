var Database = require('./db')
var db = new Database()

module.exports = function performQuery (query, cb) {
  db.connect(function (err) {
    if (err) cb(err)
    else db.query(query, function (err, data) {
      cb(err, data)
      db.close()
    })
  })
}
