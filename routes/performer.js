var express = require('express')
var router = express.Router()
var performer = require('../models/performer')

router.get('/', function (req, res, next) {
  performer.all(function (err, users) {
    if (err) res.send('error finding performers: ' + err.message)
    else res.send(users)
  })
})

router.post('/', function (req, res, next) {
  var newPerformer = req.body
  performer.add(newPerformer, function (err) {
    if (err) res.send('unable to add performer')
    else res.send('performer added')
  })
})

router.get('/:id', function (req, res, next) {
  performer.get(req.params.id, function (err, performer) {
    if (performer) res.send(performer)
    else res.send({})
  })
})

router.delete('/:id', function (req, res, next) {
  performer.delete(req.params.id, function (err, success) {
    if (err) res.send(err.message)
    else res.send('performer deleted')
  })
})

router.get('/:id/performances', function (req, res, next) {
  performer.getPerformances(req.params.id, function (err, userPerformances) {
    if (userPerformances) res.send(userPerformances)
    else res.send([])
  })
})

module.exports = router;
