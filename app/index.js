"use strict"

const serverInstance = require('express')();

const  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '';


var Devices = new require('./devicesdb')(); 
var Fetcher = new require('./statefetcher')();
	
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

Fetcher.on(data, (diff)=> {
  new require('notification')(diff);
}); 


