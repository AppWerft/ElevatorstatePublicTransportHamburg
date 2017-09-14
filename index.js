
const serverInstance = require('express')();
const fetch = require('node-fetch');
const devicesDB = require('./devicesdb');
const elevatorStates = require('./elevatorstates'); 
const GEOFOX_URL = 'https://geofox.hvv.de/data-service/rest/elevators/stations/',
  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '';


devicesDB.init(); 
	
// a device has subscribed to service and sends token:
serverInstance.get('/add', function (req, res) {
  devicesDB.add(res.query.token);
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/remove', function (req, res) {
  devicesDB.remove(res.query.token);
})

// start server on port 80 
serverInstance.listen(8888, function () {
  console.log('server started.');
  _fetchState();
  let cron = setInterval(_fetchState,60000);
});



let _sendNotifications = diffs => {
    let deviceTokens = devicesDB.getAll();
    if (!deviceTokens) {
      console.log("nix zu tun. Niemand ist neugierig");
      return;
    }
    let body = {
      to : deviceTokens,
      title : "Aufzug kaputt"
    };
    console.log(body);
    let options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : FCM_APPID
      },
      body: JSON.stringify(body) 
    };
    fetch(FCM_ENDPOINT,options)
     .then().catch();
}
// cronjob triggers this function to get states of all elevators
let _fetchState=() => {
  fetch(GEOFOX_URL,{method:'GET'})
  .then(response =>response.json().then(json => {
    //console.log(json);
    let diffs = elevatorStates.update(json);
    if (diffs) {
      _sendNotifications(diffs);
    }
  })
    
  ).catch(error => {
    console.log(error);
  });
}
// https://geofox.hvv.de/jsf/showElevatorStates.seam
