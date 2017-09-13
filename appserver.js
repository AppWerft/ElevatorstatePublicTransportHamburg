
const server = require('express')();
const db = require('devicesdb');
const fetch = require('node-fetch');

var cron;
db.init(); 
	
// a device has subscribed to service and sends token:
server.get('/add', function (req, res) {
  db.add(res.token);
})
// a device has unsubscribed to service and sends token:
server.get('/remove', function (req, res) {
  db.remove(res.token);
})

// start server
server.listen(80, function () {
  console.log('server started.');
  cron = setIntervall(_fetchState,1000);
});

// cronjob triggers this function to get states of all elevators
function _fetchState() {
    fetch('https://geofox.hvv.de/data-service/rest/elevators/stations/',{method:'GET',})
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });

}

// https://geofox.hvv.de/jsf/showElevatorStates.seam
