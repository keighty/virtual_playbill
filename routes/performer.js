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
router.get('/:performerId', function (req, res, next) {
  var performerId = req.params.performerId
  connection.query(
    'SELECT * FROM performer WHERE ID=' + performerId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        res.send('couldn\'t find the performer!')
      } else {
        res.send(rows[0]);
      }
  })
});

module.exports = router;
