describe('getPerformances', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    domElements = {}

    sandbox.stub(document, 'getElementById', function (id) {
      if (!domElements[id]) domElements[id] = {}
      return domElements[id]
    })

    testData = [
      {id: 1, title: 'foo', music: 'bar'},
      {id: 2, title: 'crunchy', music: 'bacon'},
      {id: 3, title: 'baz', music: 'fez'},
    ]
    responseStub = JSON.stringify(testData)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })

  it('should call callPerformanceService', (done) => {
    sandbox.stub(window, 'callPerformanceService', function (params) {
      expect(params.method).to.be.eql('GET')
      expect(params.url).to.be.eql('/performance')
      done()
    })

    getPerformances()
  })

  it('should register updatePerformances with callService', () => {
    var callServiceMock = sandbox.mock(window)
        .expects('callPerformanceService')
        .withArgs(sinon.match.any, updatePerformances)

    getPerformances()
    callServiceMock.verify()
  })

  describe('updatePerformances', () => {
    it('should update message if status !=200', () => {
      updatePerformances(404, '..err..')

      expect(domElements.message.innerHTML).to.be.eql('..err.. (status: 404)')
    })

    it('should update performanceCount', () => {
      updatePerformances(200, responseStub)

      expect(domElements.performanceCount.innerHTML).to.be.eql(3)
    })

    it('should update performance table', () => {
      updatePerformances(200, responseStub)

      expect(domElements.performances.innerHTML).contains('<table>')
      expect(domElements.performances.innerHTML).contains('<td>foo</td>')
      expect(domElements.performances.innerHTML).contains('<td>crunchy</td')
    })
  })

  describe('callPerformanceService', () => {
    var xhr, opts

    beforeEach(() => {
      opts = {method: 'GET', url: '/performance'}
      xhr = sinon.useFakeXMLHttpRequest()
      xhr.requests = []
      xhr.onCreate = function (req) { xhr.requests.push(req) }
    })

    afterEach(() => {
      xhr.restore()
    })

    it('should make an ajax request', () => {
      callPerformanceService(opts, sandbox.spy())

      expect(xhr.requests[0].method).to.be.eql('GET')
      expect(xhr.requests[0].url).to.be.eql('/performance')
      expect(xhr.requests[0].sendFlag).to.be.true
    })

    it('should send the response and status code to the callback', () => {
      var cb = sandbox.mock().withArgs(200, '...res...').atLeast(1)

      callPerformanceService(opts, cb)

      xhr.requests[0].respond(200, {}, '...res...')
      cb.verify()
    })

    it('should send error response to the callback', () => {
      var cb = sandbox.mock().withArgs(404, '...err...').atLeast(1)

      callPerformanceService(opts, cb)
      xhr.requests[0].respond(404, {}, '...err...')
      cb.verify()
    })

    it('should only send a response when it is ready', () => {
      var cb = sandbox.spy()

      callPerformanceService(opts, cb)

      expect(cb.callCount).to.be.eql(0)
    })
  })

  it('should register initpage handler with window onload', () => {
    expect(window.onload).to.be.eql(initpage)
  })
})
