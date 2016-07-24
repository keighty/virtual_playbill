describe('getUser', function () {
  var sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.eql(true)
  })

  it('should call callService', function (done) {
    sandbox.stub(window, 'callService', function (params) {
      expect(params.method).to.be.eql('GET')
      expect(params.url).to.be.eql('/user')
      done()
    })

    getUser()
  })
})
