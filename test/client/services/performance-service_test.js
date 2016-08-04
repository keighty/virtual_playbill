describe('getPerformances', () => {
  beforeEach(() => {
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

  afterEach(() => {
    sandbox.restore()
  })

  it('should pass this canary test', () => {
    expect(true).to.be.true
  })
})
