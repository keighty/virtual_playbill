var express = require('express')
var router = express.Router()
var connection = require('../config/connection')

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
