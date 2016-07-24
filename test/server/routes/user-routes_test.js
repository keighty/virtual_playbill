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

  })
})
