describe('getUsers', function () {
  var sandbox, domElements, testData, responseStub

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    domElements = {}
    sandbox.stub(document, 'getElementById', function (id) {
      if (!domElements[id]) domElements[id] = {}
      return domElements[id]
    })

    testData = [
      {id: 1, fName: 'foo', lName: 'bar'},
      {id: 2, fName: 'crunchy', lName: 'bacon'},
      {id: 3, fName: 'baz', lName: 'fez'},
    ]
    responseStub = JSON.stringify(testData)
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

    getUsers()
  })

  it('should register updateUsers with callService', function () {
    var callServiceMock = sandbox.mock(window)
        .expects('callService')
        .withArgs(sinon.match.any, updateUsers)

    getUsers()
    callServiceMock.verify()
  })

  describe('updateUsers', function () {
    it('should update message if status !=200', function () {
      updateUsers(404, '..err..')

      expect(domElements.message.innerHTML).to.be.eql('..err.. (status: 404)')
    })

    it('should update userCount', function () {
      updateUsers(200, responseStub)

      expect(domElements.userCount.innerHTML).to.be.eql(3)
    })

    it('should update user table', function () {
      updateUsers(200, responseStub)

      expect(domElements.users.innerHTML).contains('<table>')
      expect(domElements.users.innerHTML).contains('<td>foo</td>')
      expect(domElements.users.innerHTML).contains('<td>bar</td>')
      expect(domElements.users.innerHTML).contains('<td>crunchy</td')
    })
  })

  describe('callService', function () {
    var xhr, opts

    beforeEach(function () {
      opts = {method: 'GET', url: '/user'}
      xhr = sinon.useFakeXMLHttpRequest()
      xhr.requests = []
      xhr.onCreate = function (req) { xhr.requests.push(req) }
    })

    afterEach(function () {
      xhr.restore()
    })

    it('should make an ajax request', function () {
      callService(opts, sandbox.spy())

      expect(xhr.requests[0].method).to.be.eql('GET')
      expect(xhr.requests[0].url).to.be.eql('/user')
      expect(xhr.requests[0].sendFlag).to.be.true
    })

    it('should send the response and status code to the callback', function () {
      var cb = sandbox.mock().withArgs(200, '...res...').atLeast(1)

      callService(opts, cb)

      xhr.requests[0].respond(200, {}, '...res...')
      cb.verify()
    })

    it('should send error response to the callback', function () {
      var cb = sandbox.mock().withArgs(404, '...err...').atLeast(1)

      callService(opts, cb)
      xhr.requests[0].respond(404, {}, '...err...')
      cb.verify()
    })

    it('should only send a response when it is ready', function () {
      var cb = sandbox.spy()

      callService(opts, cb)

      expect(cb.callCount).to.be.eql(0)
    })
  })

  it('should register initpage handler with window onload', function () {
    expect(window.onload).to.be.eql(initpage)
  })
})
