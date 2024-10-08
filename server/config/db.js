const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: '185.32.188.27',
  user: 'opahpt_administrator',
  password: 'vcz5YNmYQ4#4B2ym9&nY',
  database: 'opahpt_opah',
  waitForConnections: true, // Wait for connections to become available
  connectionLimit: 10, // Limit the number of connections
  queueLimit: 0 // No limit on queued connection requests
});

// Test the connection pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return; // Exit on error
  }
  console.log('Connected to MySQL!');
  connection.release(); // Release the connection back to the pool
});

// Export the pool for use in your application
module.exports = pool;
