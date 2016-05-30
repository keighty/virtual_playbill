var expect = require('chai').expect
var db = require('../../config/db')
var performance = require('../../models/performance')

describe('performance model tests', function () {
  var samplePerformance1, samplePerformance2, samplePerformances

  before(function (done) {
    db.connect(done)
  })

  after(function () {
    db.close()
  })

  beforeEach(function (done) {
    samplePerformance1 = {
      title: 'Hamlet',
      playwright: 'Porky',
      director: 'Larry Director',
      company: 'Electric Company',
      venue: 'Super Dooper Venue',
      music: 'Silent',
      choreographer: 'Donald',
      synopsis: 'A pig talks a lot but doesn\'t do anything.',
      category: 'Breakfast',
      image: 'https://virtualplaybill.s3.amazonaws.com/1454391209388_I_Want_to_Destroy_You',
    }

    samplePerformance1 = {
      title: 'Hamlet2',
      playwright: 'Pertunia',
      director: 'Dan Director',
      company: 'Threes Company',
      venue: 'Alleooper Venue',
      music: 'Loud',
      choreographer: 'Flossy',
      synopsis: 'A lady pig talks a lot and follows through.',
      category: 'Brunch',
      image: 'https://virtualplaybill.s3.amazonaws.com/1454391209388_I_Want_to_Destroy_You',
    }

    samplePerformances = [
      samplePerformance1, samplePerformance2
    ]

    db.insert(samplePerformances, done)
  })

  afterEach(function (done) {
    db.drop('performance', done)
  })

  it('should pass this canary test', function () {
    expect(true).to.be.true
  })

  xit('all should return all the performances', function (done) {
    var cb = function (err, performances) {
      expect(performances).to.be.eql(samplePerformances)
      done()
    }

    performance.all(cb)
  })
})

