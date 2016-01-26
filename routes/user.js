var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'testvp',
  password: process.env.MYSQL_TESTVP_PASSWORD,
  database: 'virtual_playbill'
})

router.get('/:userId/performances', function (req, res, next) {
  connection.query(
    'SELECT * FROM user_performance ' +
    'WHERE user_id=' + req.params.userId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        res.send('couldn\'t find the user or their performances!')
      } else {
        res.send(rows);
      }
  })
})

router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId
  connection.query(
    'SELECT * FROM user WHERE ID=' + userId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        res.send('couldn\'t find the user!')
      } else {
        res.send(rows[0]);
      }
  })
});

module.exports = router;
