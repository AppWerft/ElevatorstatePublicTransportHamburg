"use strict"

const serverInstance = require('express')();

const  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '';

const Devices = require('./devicesdb'); 
const Fetcher = require('./statefetcher');

var mDevices = new Devices();
	
// a device has subscribed to service and sends token:
serverInstance.get('/subscribe', function (req, res) {
  mDevices.subscribe(res.query.token);
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/unsubscribe', function (req, res) {
  mDevices.unsubscribe(res.query.token);
})

// start server on port 80 
serverInstance.listen(8888, function () {
  console.log('server started.');
});

var mFetcher = new Fetcher();
mFetcher.start();

mFetcher.on('data', (diff)=> {
  new require('notification')(diff);
}); 


