var getPerformances = () => {
  callPerformanceService({method: 'GET', url: '/performance'}, updatePerformances)
}

var callPerformanceService = (opt, cb) => {
  var xhr = new XMLHttpRequest()
  xhr.open(opt.method, opt.url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) cb(xhr.status, xhr.response)
  }
  xhr.send()
}

var updatePerformances = (status, response) => {
  if (status === 200) {
    var performances = JSON.parse(response)
    document.getElementById('performanceCount').innerHTML = performances.length

    var row = function (performance) {
      return '<tr><td>' + performance.title + '</td>'
    }

    var table = '<table>' + performances.map(row).join('') + '</table>'

    document.getElementById('performances').innerHTML = table
  } else {
    var message = response + ' (status: ' + status + ')'
    document.getElementById('message').innerHTML = message
  }
}
