var mysql = require('mysql2/promise');
var config = require('./db_info').real;

module.exports = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
})