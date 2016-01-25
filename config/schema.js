var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'testvp',
  password: process.env.MYSQL_TESTVP_PASSWORD
})

connection.query('CREATE DATABASE IF NOT EXISTS virtual_playbill', function (err) {
  if (err) throw err;
  connection.query('USE virtual_playbill', function (err) {
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS user('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'f_name VARCHAR(60),'
      + 'l_name VARCHAR(60),'
      + 'PRIMARY KEY(id)'
      +  ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performance ('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'title VARCHAR(60),'
      + 'author VARCHAR(60),'
      + 'director VARCHAR(60),'
      + 'company VARCHAR(60),'
      + 'venue VARCHAR(60),'
      + 'music VARCHAR(60),'
      + 'choreographer VARCHAR(60),'
      + 'synopsis VARCHAR(900),'
      + 'category VARCHAR(60),' // dance, musical, play
      + 'image VARCHAR(160),' // url
      + 'PRIMARY KEY (id)'
      + ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS user_performance ('
      + 'user_id INT NOT NULL,'
      + 'performance_id INT NOT NULL,'
      + 'rating INT,'
      + 'FOREIGN KEY (user_id) REFERENCES user(id),'
      + 'FOREIGN KEY (performance_id) REFERENCES performance(id),'
      + 'PRIMARY KEY (user_id, performance_id)'
      + ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performer('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'name VARCHAR(60),'
      + 'PRIMARY KEY(id)'
      +  ')', function (err) {
          if (err) throw err
      });
    connection.query('CREATE TABLE IF NOT EXISTS performer_performance('
      + 'performer_id INT NOT NULL,'
      + 'performance_id INT NOT NULL,'
      + 'FOREIGN KEY (performer_id) REFERENCES performer(id),'
      + 'FOREIGN KEY (performance_id) REFERENCES performance(id),'
      + 'PRIMARY KEY (performer_id, performance_id)'
      +  ')', function (err) {
          if (err) throw err
      });
  });
});