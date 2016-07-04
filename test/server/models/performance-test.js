var expect = require('chai').expect
var sinon = require('sinon')
var Database = require('../../../config/db')
var performance = require('../../../models/performance')

var existingData = [
  {
    category: "test category",
    choreographer: "test choreo",
    company: "test company",
    director: "test director",
    id: 1,
    image: "https://virtualplaybill.s3.amazonaws.com/1455412796794_Baba_Yaga",
    music: "test music",
    playwright: "test author",
    synopsis: "test synopsis -- morning is wiser than evening",
    title: "Baba Yaga",
    venue: "Fertile Ground Festival Venue"
  },
  {
    category: "test category",
    choreographer: "test choreo",
    company: "test company",
    director: "test director",
    id: 2,
    image: "https://virtualplaybill.s3.amazonaws.com/1455413120510_Buried_Fire",
    music: "test music",
    playwright: "test author",
    synopsis: "test synopsis -- chicken pot pie",
    title: "Buried Fire",
    venue: "Fertile Ground Festival Venue"
  }
]

xdescribe('performance model tests', function () {
  var samplePerformance1, samplePerformance2, samplePerformances
  var db, sandbox

  before(function (done) {
    db = new Database(mysql, config)
    db.connect(done)
  })

  after(function () {
    db.close()
  })

  beforeEach(function (done) {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function (done) {
    db.drop('performance', done)
    sandbox.restore()
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  it('all should return all the performances', function (done) {
    var cb = function (err, performances) {
      expect(performances).to.be.eql(existingData)
      done()
    }

    performance.all(cb)
  })

  xit('all should throw a sql error if the records can\'t be found', function (done) {})

  it('get should return a performance with a given id', function (done) {
    var cb = function (err, performance) {
      performance = performance[0]
      actual = existingData[0]

      expect(performance.title).to.be.eql(actual.title)
      expect(performance.playwrite).to.be.eql(actual.playwrite)
      done()
    }

    performance.get(1, cb)
  })
})

