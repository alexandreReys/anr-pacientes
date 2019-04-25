import * as mysql from 'mysql';

const connection = mysql.createPool({
	connectionLimit : 1000,
	connectTimeout : 60 * 60 * 1000, 
	acquireTimeout : 60 * 60 * 1000, 
	timeout : 60 * 60 * 1000, 
	host     : process.env.db_host_anrpac,  // Variavel Ambiental
	user     : process.env.db_user_anrpac,  // Variavel Ambiental
	password : process.env.db_pass_anrpac,  // Variavel Ambiental
	database : process.env.db_datab_anrpac   // Variavel Ambiental
});

module.exports = connection;