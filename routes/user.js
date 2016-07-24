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

module.exports = router;
