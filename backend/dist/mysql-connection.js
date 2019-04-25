"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var connection = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.db_host_anrpac,
    user: process.env.db_user_anrpac,
    password: process.env.db_pass_anrpac,
    database: process.env.db_datab_anrpac // Variavel Ambiental
});
module.exports = connection;
