var express = require('express')
var router = express.Router()
var onError = function (err) {
  if (err) console.log('Something went wrong loading the performer file.')
  return
}
var connection = require('../config/db').connect(onError)

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
