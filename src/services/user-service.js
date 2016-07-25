var getUser = function () {
  callService({method: 'GET', url: '/user'}, updateUser)
}

var callService = function (opt, cb) {
  var xhr = new XMLHttpRequest()
  xhr.open(opt.method, opt.url)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) cb(xhr.status, xhr.response)
  }
  xhr.send()
}

var updateUser = function (status, response) {
  if (status === 200) {
    var users = JSON.parse(response)
    document.getElementById('userCount').innerHTML = users.length

    var row = function (user) {
      return '<tr><td>' + user.fName + '</td><td>' + user.lName + '</td></tr>'
    }

    var table = '<table>' + users.map(row).join('') + '</table>'

    document.getElementById('users').innerHTML = table
  } else {
    var message = response + ' (status: ' + status + ')'
    document.getElementById('message').innerHTML = message
  }
}
