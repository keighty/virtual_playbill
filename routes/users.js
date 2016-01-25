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
