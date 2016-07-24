var express = require('express')
var router = express.Router()
var user = require('../models/user')

router.get('/', function (req, res, next) {
  user.all(function (err, users) {
    if (err) res.send([])
    else res.send(users)
  })
})

// var onError = function (err) { if (err) throw err; }
// var connection = require('../config/db').connect(onError)

// GET /user/1/performances
// router.get('/:userId/performances', function (req, res, next) {
//   connection.query(
//     'SELECT performance.*, user_performance.ticket_date ' +
//     'FROM user_performance ' +
//     'JOIN performance ' +
//     'ON performance.id = user_performance.performance_id ' +
//     'WHERE user_id = ' + req.params.userId,
//     function (err, rows, fields) {
//       if (err || !rows.length) {
//         res.send('couldn\'t find the user or their performances!')
//       } else {
//         res.send(rows);
//       }
//   })
// })

// router.get('/:userId', function(req, res, next) {
//   var userId = req.params.userId
//   connection.query(
//     'SELECT * FROM user WHERE ID=' + userId,
//     function (err, rows, fields) {
//       if (err || !rows.length) {
//         res.send('couldn\'t find the user!')
//       } else {
//         res.send(rows[0]);
//       }
//   })
// });

module.exports = router;
