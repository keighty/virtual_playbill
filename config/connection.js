var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'testvp',
  password: process.env.MYSQL_TESTVP_PASSWORD,
  database: 'virtual_playbill' // comment this line when setting up for the first time
})

module.exports = connection