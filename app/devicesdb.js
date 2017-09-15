"use strict"

var sqlite3 = require('sqlite3').verbose();
const DB = require('path').resolve(__dirname, "SubscribedDevices.sqlite");

const onError= err => {
	if (err) {
		return console.log(err.message);
	}
};

module.exports = class {
	constructor () { 
		let db = new sqlite3.Database(DB);
		db.run('CREATE TABLE IF NOT EXISTS devices(token text)');	
		db.close(err => {
			if (err) {
				return console.log(err.message);
			}
		});	
	};
	
	subscribe(token)  {
    	let db = new sqlite3.Database(DB,sqlite3.OPEN_READWRITE);
		db.run('INSERT INTO devices VALUES (?)',[token],onError);	    
		db.close();
	};
	
	unsubscribe(token) {
    	let db = new sqlite3.Database(DB,sqlite3.OPEN_READWRITE);
		db.run('DELETE FROM devices WHERE token=?',token,onError);		
		db.close();
	};
	
	getAll() {
		var devices = [];
		let db = new sqlite3.Database(DB);
		return new Promise((resolve, reject) => {
			db.all(`SELECT token FROM devices`, (err, rows) => {
				if (err) {
				  reject(err.message);
			  }
			  else {
				 rows.forEach(row=>{
					  devices.push(row.token);
				 })
			  }
			  db.close();
			  resolve(devices);
		  });
		});			
	}	   	
};

