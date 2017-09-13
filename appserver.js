
const server = require('express')();
var sqlite3 = require('sqlite3').verbose();

var cron;

 
var db = new sqlite3.Database('devices');
	
db.run('CREATE TABLE IF NOT EXISTS devices(token text, state int)');	

server.get('/add', function (req, res) {
  
})

server.listen(80, function () {
  console.log('server started.');
  cron = setIntervall(_fetchState,1000);
});

function _fetchState() {
    let req = 

}

