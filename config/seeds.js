var Database = require('./db')
var db = new Database()
var onError = function (err) { if (err) throw err; }

var connection = db.connect(onError)

connection.query('USE virtual_playbill', function (err) {
  if (err) throw err;
  connection.query('INSERT into user (' +
    'fName, lName' +
    ') ' +
    'VALUES (' +
    '"Foo",' +
    '"Bar"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into user (' +
    'fName, lName' +
    ') ' +
    'VALUES (' +
    '"Crunchy",' +
    '"Bacon"' +
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
    '"https://virtualplaybill.s3.amazonaws.com/1455412796794_Baba_Yaga"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performance VALUES (' +
    'null,' +
    '"Buried Fire",' +
    '"test author",' +
    '"test director",' +
    '"test company",' +
    '"Fertile Ground Festival Venue",' +
    '"test music",' +
    '"test choreo",' +
    '"test synopsis -- chicken pot pie",' +
    '"test category",' +
    '"https://virtualplaybill.s3.amazonaws.com/1455413120510_Buried_Fire"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into user_performance VALUES (1, 1, 5, "2016-01-24")',
    function (err) {
        if (err) throw err
    });
  connection.query('INSERT into user_performance VALUES (1, 2, 5, "2016-01-21")',
    function (err) {
        if (err) throw err
    });
  connection.query('INSERT into user_performance VALUES (2, 2, 4, "2016-01-21")',
    function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performer (' +
    'fName, lName' +
    ') ' +
    'VALUES (' +
    '"Sally",' +
    '"Bowles"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performer (' +
    'fName, lName' +
    ') ' +
    'VALUES (' +
    '"Jeff",' +
    '"Murdoch"' +
    ')', function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performer_performance VALUES (1, 1)',
    function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performer_performance VALUES (1, 2)',
    function (err) {
        if (err) throw err
    });
  connection.query('INSERT into performer_performance VALUES (2, 2)',
    function (err) {
        if (err) throw err
    });
  connection.end()
})
