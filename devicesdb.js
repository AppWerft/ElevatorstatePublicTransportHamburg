

var sqlite3 = require('sqlite3').verbose();

module.exports =
 {
	init : () => { 
		let db = new sqlite3.Database('devices',sqlite3.OPEN_CREATE);
		db.run('CREATE TABLE IF NOT EXISTS devices(token text)');	
		db.close();
	},
	subscribeDevice : token => {
    let db = new sqlite3.Database('devices',sqlite3.OPEN_READWRITE);
		db.run('INSERT INTO devices VALUES(?)',[token],(err) => {
			if (err) {
				return console.log(err.message);
			}
		});	
		db.close();
	},
	unsubscribeDevice : token => {
    let db = new sqlite3.Database('devices',sqlite3.OPEN_READWRITE);
		db.run('DELETE FROM devices WHERE token=?',token,(err) => {
			if (err) {
				return console.log(err.message);
			}
		});		
		db.close();
	},
  getAll : () => {
		let devices = [];
		let db = new sqlite3.Database('devices',sqlite3.OPEN_READONLY);
		db.serialize(() => {
			db.each(`SELECT token FROM devices`, (err, row) => {
				if (err) {
					console.error(err.message);
				}
				devices.push(row.token);
			});
		});
		db.close();
  }
};

