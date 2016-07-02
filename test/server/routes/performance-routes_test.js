var expect = require('chai').expect
var sinon = require('sinon')
var performance = require('../../../models/performance')
var express = require('express')

describe('performance routes', function () {
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
    it('should register get', function () {
      expect(router.get.calledWith('/', sandbox.match.any)).to.be.true
    })

    it('should have a handler that calls the models all method and returns a result', function (done) {
      var sample = {foo: 'bar'}
      sandbox.stub(performance, 'all', function (cb) {
        cb(null, sample)
      })

      var req = {}
      var res = stubResSend(sample, done)

      var registeredCallback = router.get.firstCall.args[1]
      registeredCallback(req, res)
    })
  })

})