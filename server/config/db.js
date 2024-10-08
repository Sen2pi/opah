const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '185.32.188.27',
  user: 'opahpt_administrator',
  password: 'vcz5YNmYQ4#4B2ym9&nY',
  database: 'opahpt_opah'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

module.exports = connection;
