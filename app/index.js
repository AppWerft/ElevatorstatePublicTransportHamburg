"use strict"

const serverInstance = require('express')();
const fetch = require('node-fetch');
const elevatorStates = require('./elevatorstates'); 
const GEOFOX_URL = 'https://geofox.hvv.de/data-service/rest/elevators/stations/',
  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '';


var Devices = new require('./devicesdb')(); 
var Fetcher = new require('elevatorstates')();
	
// a device has subscribed to service and sends token:
serverInstance.get('/subscribe', function (req, res) {
  Devices.subscribe(res.query.token);
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/unsubscribe', function (req, res) {
  Devices.unsubscribe(res.query.token);
})

// start server on port 80 
serverInstance.listen(8888, function () {
  console.log('server started.');
  _fetchStateAndGetDiff();
  var cron = setInterval(_fetchStateAndGetDiff,60*1000);
});

Fetcher.start();


async function _sendNotifications(diffs) {
  if (!diffs) {
    console.log("nix zu tun. Status unverändert");
    return;
  }
  var deviceTokens = await Devices.getAll();
  if (!deviceTokens || deviceTokens.length==0) {
      console.log("nix zu tun. Niemand ist neugierig");
      return;
  }
  var body = {
      to : deviceTokens,
      title : "Aufzug kaputt",
      vibrate : true
    };
    var options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : "key="  + FCM_APPID
      },
      body: JSON.stringify(body) 
    };
    fetch(FCM_ENDPOINT,options)
       .then(res=>{}).catch((err=>{}));
}
// cronjob triggers this function to get states of all elevators
let _fetchStateAndGetDiff=() => {
  fetch(GEOFOX_URL,{method:'GET'})
  .then(response => response.json().then(newJson => {
    let diffs = elevatorStates.getDiff(newJson); 
    if (diffs) {
      _sendNotifications(diffs);
    } else console.log("alles beim Alten ");
  })
    
  ).catch(err => {
    console.log(err);
  });
}
// https://geofox.hvv.de/jsf/showElevatorStates.seam
