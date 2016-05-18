var express = require('express')
var router = express.Router()
var onError = function (err) { if (err) throw err; }
var connection = require('../config/db').connect(onError)

router.get('/:performanceId/performers', function (req, res, next) {
  connection.query(
    'SELECT performer.* ' +
    'FROM performer_performance ' +
    'JOIN performer ' +
    'ON performer.id = performer_performance.performer_id ' +
    'WHERE performance_id = ' + req.params.performanceId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        res.send('couldn\'t find the performance or the performers!')
      } else {
        res.send(rows);
      }
  })
})

router.get('/:performanceId', function (req, res, next) {
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
