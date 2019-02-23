/* eslint linebreak-style: ["error", "windows"] */

/*
 * Make a copy of this file and name it config.js.
 * Put your mysql user and password where it says 'REPLACE THIS'.
 */

module.exports = {
  mysqlUser: 'REPLACE THIS',
  mysqlPass: 'REPLACE THIS',
  mysqlHost: 'localhost', // default for local, replace during deployment
  mysqlPort: '3306', // default is 3306, replace if yours uses another port
  port: '3333', // be sure to change this port to 80 during deployment
};
