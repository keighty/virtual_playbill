var express = require('express')
var mysql = require('mysql')
var router = express.Router()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'testvp',
  password: process.env.MYSQL_TESTVP_PASSWORD,
  database: 'virtual_playbill'
})

/* GET users listing. */
router.get('/:performanceId', function(req, res, next) {
  var performanceId = req.params.performanceId
  connection.query(
    'SELECT * FROM performance WHERE ID=' + performanceId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        res.send('couldn\'t find the user!')
      } else {
        res.send(rows[0]);
      }
  })
});

module.exports = router;