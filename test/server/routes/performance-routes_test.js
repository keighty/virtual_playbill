var expect = require('chai').expect
var sinon = require('sinon')
var performance = require('../../../models/performance')
var express = require('express')

describe.only('performance routes', function () {
  var sandbox, router

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    sandbox.stub(express, 'Router').returns({
      get: sandbox.spy(),
      post: sandbox.spy(),
      delete: sandbox.spy()
    })

    router = require('../../../routes/performance')
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
    it('get should be registered', function () {
      expect(router.get.calledWith('/', sandbox.match.any)).to.be.true
    })

    it('get should call performance.all() and return a result', function (done) {
      var sample = {foo: 'bar'}
      sandbox.stub(performance, 'all', function (cb) {
        cb(null, sample)
      })

      var req = {}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.firstCall.args[1]
      registeredCallback(req, res)
    })

    it('post should be registered', function () {
      expect(router.post.calledWith('/', sandbox.match.any)).to.be.true
    })

    it('post should call performance.add() and return success message', function (done) {
      var sample = {foo: 'bar'}
      sandbox.stub(performance, 'add', function (newPerformance, cb) {
        expect(newPerformance).to.be.eql(sample)
        cb(null)
      })

      var req = {body: sample}
      var res = stubResSend('performance added', done)

      var registeredCallback = router.post.firstCall.args[1]
      registeredCallback(req, res)
    })
  })

  describe('/:id', function () {
    it('should register get', function () {
      expect(router.get.calledWith('/:id', sandbox.match.any)).to.be.true
    })

    it('should have a handler that calls the models get method and returns a result', function (done) {
      var sample = {foo: 'bar', id: 1}
      sandbox.stub(performance, 'get', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null, sample)
      })

      var req = {params: {id: 1}}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.secondCall.args[1]
      registeredCallback(req, res)
    })

    it('should return {} for an invalid id', function (done) {
      var sample = {}

      sandbox.stub(performance, 'get', function (id, cb) {
        expect(id).to.be.eql(req.params.id)
        cb(null, null)
      })

      var req = {params: {id: 666}}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.secondCall.args[1]
      registeredCallback(req, res)
    })

  })
})