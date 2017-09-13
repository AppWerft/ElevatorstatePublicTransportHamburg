

var sqlite3 = require('sqlite3').verbose();

module.exports =
 {
	init : function() { 
		let db = new sqlite3.Database('devices');
		db.run('CREATE TABLE IF NOT EXISTS devices(token text, state int)');	
		db.close();
	},
	add : function(token) {
    let db = new sqlite3.Database('devices');
		db.run('INSERT INTO devices (token)');	
		db.close();
	},
	delete : function(token) {
    let db = new sqlite3.Database('devices');
		db.run('DELETE FROM devices WHERE token="'+token+'"');	
		db.close();
	},
  getAll : function() {
  }

