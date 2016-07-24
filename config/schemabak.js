var Database = require('./db')
var db = new Database()
var onError = function (err) { if (err) throw err; }

var connection = db.connect(onError)

connection.query('CREATE DATABASE IF NOT EXISTS virtual_playbill', function (err) {
  if (err) throw err;
  connection.query('USE virtual_playbill', function (err) {
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS user(' +
      'id INT NOT NULL AUTO_INCREMENT,' +
      'fName VARCHAR(60),' +
      'lName VARCHAR(60),' +
      'PRIMARY KEY(id)' +
       ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performance (' +
      'id INT NOT NULL AUTO_INCREMENT,' +
      'title VARCHAR(60),' +
      'playwright VARCHAR(60),' +
      'director VARCHAR(60),' +
      'company VARCHAR(60),' +
      'venue VARCHAR(60),' +
      'music VARCHAR(60),' +
      'choreographer VARCHAR(60),' +
      'synopsis VARCHAR(900),' +
      'category VARCHAR(60),' + // dance, musical, play
      'image VARCHAR(160),' + // url
      'PRIMARY KEY (id)' +
      ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS user_performance (' +
      'userId INT NOT NULL,' +
      'performanceId INT NOT NULL,' +
      'rating INT,' +
      'ticket_date DATE,' +
      'FOREIGN KEY (userId) REFERENCES user(id),' +
      'FOREIGN KEY (performanceId) REFERENCES performance(id),' +
      'PRIMARY KEY (userId, performanceId)' +
      ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performer(' +
      'id INT NOT NULL AUTO_INCREMENT,' +
      'fName VARCHAR(60),' +
      'lName VARCHAR(60),' +
      'PRIMARY KEY(id)' +
       ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performer_performance(' +
      'performerId INT NOT NULL,' +
      'performanceId INT NOT NULL,' +
      'FOREIGN KEY (performerId) REFERENCES performer(id),' +
      'FOREIGN KEY (performanceId) REFERENCES performance(id),' +
      'PRIMARY KEY (performerId, performanceId)' +
       ')', function (err) {
          if (err) throw err
      });
    connection.end()
  });
});