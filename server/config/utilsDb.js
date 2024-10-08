const pool = require("./db"); // Certifique-se de que o pool de conexão esteja aqui

const executeWithRetry = (query, params, retries = 3) => {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          if (n === 1) {
            return reject(error); // Final error
          }
          console.log(`Retrying query... Attempts left: ${n - 1}`);
          return attempt(n - 1); // Retry
        }
        resolve(results); // Success
      });
    };
    attempt(retries);
  });
};

module.exports = {
  executeWithRetry
};