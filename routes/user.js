var express = require('express')
var router = express.Router()
var connection = require('../config/connection')

// GET /user/1/performances
router.get('/:userId/performances', function (req, res, next) {
  connection.query(
    'SELECT performance.* ' +
    'FROM user_performance ' +
    'JOIN performance ' +
    'ON performance.id = user_performance.performance_id ' +
    'WHERE user_id = ' + req.params.userId,
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
