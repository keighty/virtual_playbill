var expect = require('chai').expect
var sinon = require('sinon')
var express = require('express')
var user = require('../../../models/user')

describe('user routes', function () {
  var sandbox, router

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    sandbox.stub(express, 'Router').returns({
      get: sandbox.spy(),
      post: sandbox.spy(),
      delete: sandbox.spy()
    })

    router = require('../../../routes/user')
  })

  afterEach(function () {
    sandbox.restore()
  })

  var stubResSend = function (expected, done) {
    return {
      send: function (data) {
        expect(data).to.be.eql(expected)
        done()
      }
    }
  }

  it('should pass this canary', function () {
    expect(true).to.be.true
  })

  describe('/', function () {
    it('#GET should be registered', function () {
      expect(router.get.calledWith('/', sandbox.match.any)).to.be.true
    })

    it('get should call user.all() and return a result', function (done) {
      var sample = {foo: 'bar'}
      sandbox.stub(user, 'all', function (cb) {
        cb(null, sample)
      })

      var req = {}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.firstCall.args[1]
      registeredCallback(req, res)
    })

    it('get should return "error finding users" if there is an error', function (done) {
      var errorMessage = 'error finding users: '
      sandbox.stub(user, 'all', function (cb) {
        cb(new Error('sql error'))
      })

      var req = {}
      var res = stubResSend(errorMessage + 'sql error', done)

      var registeredCallback = router.get.firstCall.args[1]
      registeredCallback(req, res)
    })

    it('post should be registered', function () {
      expect(router.post.calledWith('/', sandbox.match.any)).to.be.true
    })

    it('post should call user.add() and return success message', function (done) {
      var sample = {foo: 'bar'}
      sandbox.stub(user, 'add', function (newUser, cb) {
        expect(newUser).to.be.eql(sample)
        cb(null)
      })

      var req = {body: sample}
      var res = stubResSend('user added', done)

      var registeredCallback = router.post.firstCall.args[1]
      registeredCallback(req, res)
    })

    it('post should return error message on failure', function (done) {
      var sample = {foo: 'bar'}

      sandbox.stub(user, 'add', function (newUser, cb) {
        expect(newUser).to.be.eql(sample)
        cb(new Error('unable to add user'))
      })

      var req = {body: sample}
      var res = stubResSend('unable to add user', done)

      var registeredCallback = router.post.firstCall.args[1]
      registeredCallback(req, res)
    })
  })

  describe('/:id', function () {
    it('get should be registered', function () {
      expect(router.get.calledWith('/:id', sandbox.match.any)).to.be.true
    })

    it('get should call user.get() and return a result', function (done) {
      var sample = {foo: 'bar', id: 1}
      sandbox.stub(user, 'get', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null, sample)
      })

      var req = {params: {id: 1}}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.secondCall.args[1]
      registeredCallback(req, res)
    })

    it('get should return {} for an invalid id', function (done) {
      var sample = {}

      sandbox.stub(user, 'get', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null, null)
      })

      var req = {params: {id: 666}}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.secondCall.args[1]
      registeredCallback(req, res)
    })

    it('delete should be registered', function () {
      expect(router.delete.calledWith('/:id', sandbox.match.any)).to.be.true
    })

    it('delete should call user.delete() and return success', function (done) {
      sandbox.stub(user, 'delete', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null)
      })

      var req = {params: {id: 1}}
      var res = stubResSend('user deleted', done)

      var registeredCallback = router.delete.firstCall.args[1]
      registeredCallback(req, res)
    })

    it('delete should return an error message on failure', function (done) {
      sandbox.stub(user, 'delete', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(new Error('unable to delete user with id: 666'))
      })

      var req = {params: {id: 666}}
      var res = stubResSend('unable to delete user with id: 666', done)

      var registeredCallback = router.delete.firstCall.args[1]
      registeredCallback(req, res)
    })
  })

  describe.only('/:id/performances', function () {
    var testPerformances = [{foo: 'bar'}, {foo: 'baz'}]
    var req = {params: {id: 6}}

    it('should be registered', function () {
      expect(router.get.calledWith('/:id/performances', sandbox.match.any)).to.be.true
    })

    it('should call user.getPerformances() and return an array of performances', function (done) {
      sandbox.stub(user, 'getPerformances', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null, testPerformances)
      })

      var res = stubResSend(testPerformances, done)

      var registeredCallback = router.get.thirdCall.args[1]
      registeredCallback(req, res)
    })

    it('should return [] if no performances are found', function (done) {
      sandbox.stub(user, 'getPerformances', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(new Error('no performances'))
      })

      var res = stubResSend([], done)

      var registeredCallback = router.get.thirdCall.args[1]
      registeredCallback(req, res)
    })
  })
})