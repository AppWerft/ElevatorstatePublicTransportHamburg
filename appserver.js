
const serverInstance = require('express')();
const fetch = require('node-fetch');
const devicesDB = require('./devicesdb');
const elevatorStates = require('./elevatorstates'); 

var cron;
devicesDB.init(); 
	
// a device has subscribed to service and sends token:
serverInstance.get('/add', function (req, res) {
  devicesDB.add(res.token);
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/remove', function (req, res) {
  devicesDB.remove(res.token);
})

// start server on port 80 
serverInstance.listen(80, function () {
  console.log('server started.');
  cron = setIntervall(_fetchState,1000);
});

// cronjob triggers this function to get states of all elevators
function _fetchState() {
    fetch('https://geofox.hvv.de/data-service/rest/elevators/stations/',{method:'GET'})
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json);
    });

}

// https://geofox.hvv.de/jsf/showElevatorStates.seam
