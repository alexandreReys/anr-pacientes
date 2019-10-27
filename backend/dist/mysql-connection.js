"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var connection = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.atendweb_db_host,
    port: process.env.atendweb_db_port,
    user: process.env.atendweb_db_user,
    password: process.env.atendweb_db_pass,
    database: process.env.atendweb_db_datab // Variavel Ambiental
    // host     : '200.170.88.142',
    // port     : 3306,
    // user     : 'anrsiste3712',
    // password : '34ob47DR*',
    // database : 'anrsistemas4'
    // host     : 'mysql669.umbler.com',
    // port     : 41890,
    // user     : 'atendwebumbl-01',
    // password : '/4nHr4U3vWx.+',
    // database : 'atendweb-umbl-01'
});
module.exports = connection;
