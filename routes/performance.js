var express = require('express')
var performance = require('../models/performance')
var router = express.Router()

router.get('/', function (req, res, next) {
  performance.all(function (err, performances) {
    if (err) res.send('error finding performances: ' + err.message)
    else res.send(performances)
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
