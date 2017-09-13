
const server = require('express')();
var db = require('devicesdb');

var cron;

db.init(); 
	


server.get('/add', function (req, res) {
  db.add(res.token);
})
server.get('/remove', function (req, res) {
  db.remove(res.token);
})
server.listen(80, function () {
  console.log('server started.');
  cron = setIntervall(_fetchState,1000);
});

function _fetchState() {
    let req = 

}

