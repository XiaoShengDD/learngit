function Connect() {	
	var conn;

this.getConnection = function() {
		var mysql = require('mysql');
		var config = require('./config.json');
		conn = mysql.createConnection(config);
		conn.connect();
		return conn;
	}

}

module.exports = new Connect();
