var connection = require('./schema')

connection.query('USE virtual_playbill', function (err) {
  if (err) throw err;
  connection.query('INSERT into user (' +
    'f_name, l_name' +
    ') ' +
    'VALUES (' +
    '"Foo",' +
    '"Bar"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performance VALUES (' +
    'null,' +
    '"Baba Yaga",' +
    '"test author",' +
    '"test director",' +
    '"test company",' +
    '"Fertile Ground Festival Venue",' +
    '"test music",' +
    '"test choreo",' +
    '"test synopsis -- morning is wiser than evening",' +
    '"test category",' +
    '"test image"' +
    ')', function (err) {
        if (err) throw err
        else connection.end()
    });
})
