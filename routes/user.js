var express = require('express')
var router = express.Router()
var user = require('../models/user')

router.get('/', function (req, res, next) {
  user.all(function (err, users) {
    if (err) res.send('error finding users: ' + err.message)
    else res.send(users)
  })
})

router.post('/', function (req, res, next) {
  var newUser = req.body
  user.add(newUser, function (err) {
    if (err) res.send('unable to add user')
    else res.send('user added')
  })
})

router.get('/:id', function (req, res, next) {
  user.get(req.params.id, function (err, user) {
    if (user) res.send(user)
    else res.send({})
  })
})

router.delete('/:id', function (req, res, next) {
  user.delete(req.params.id, function (err, success) {
    if (err) res.send(err.message)
    else res.send('user deleted')
  })
})

router.get('/:id/performances', function (req, res, next) {
  user.getPerformances(req.params.id, function (err, userPerformances) {
    if (userPerformances) res.send(userPerformances)
    else res.send([])
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
