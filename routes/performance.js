var express = require('express')
var performance = require('../models/performance')
var router = express.Router()
var onError = function (err) { if (err) throw err; }

router.get('/', function (req, res, next) {
  performance.all(function (err, performances) {
    res.send(performances)
  })
})

router.post('/', function (req, res, next) {
  var newPerformance = req.body
  performance.add(newPerformance, function (err) {
    if (err) res.send(err.message)
    else res.send('performance added')
  })
})

router.get('/:id', function (req, res, next) {
  performance.get(req.params.id, function (err, performance) {
    if (performance) res.send(performance)
    else res.send({})
  })
})

router.delete('/:id', function (req, res, next) {
  performance.delete(req.params.id, function (err, success) {
    if (err) res.send(err.message)
    else res.send('performance deleted')
  })
})


module.exports = router
// var connection = require('../config/db').connect(onError)

// router.get('/:performanceId/performers', function (req, res, next) {
//   connection.query(
//     'SELECT performer.* ' +
//     'FROM performer_performance ' +
//     'JOIN performer ' +
//     'ON performer.id = performer_performance.performer_id ' +
//     'WHERE performance_id = ' + req.params.performanceId,
//     function (err, rows, fields) {
//       if (err || !rows.length) {
//         res.send('couldn\'t find the performance or the performers!')
//       } else {
//         res.send(rows);
//       }
//   })
// })

// router.get('/:performanceId', function (req, res, next) {
//   var performanceId = req.params.performanceId
//   connection.query(
//     'SELECT * FROM performance WHERE ID=' + performanceId,
//     function (err, rows, fields) {
//       if (err || !rows.length) {
//         res.send('couldn\'t find the user!')
//       } else {
//         res.send(rows[0]);
//       }
//   })
// });

// module.exports = router;
