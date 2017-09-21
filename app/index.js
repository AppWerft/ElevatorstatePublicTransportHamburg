"use strict"

const serverInstance = require('express')();

const  FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send',
  FCM_APPID = '123456',
  PORT = 80,
  Devices = require('./devicesdb'),
  Fetcher = require('./statefetcher'),
  Notification = require('./notification');
  
let mDevices = new Devices();
serverInstance.set('port', (process.env.PORT || PORT));
// a device has subscribed to service and sends token:
serverInstance.get('/', function (req, res) {
  res.send('This is endpoint of MobilityHackathon2017 project of Hamburger Appwerft');
})
// a device has subscribed to service and sends token:
serverInstance.get('/subscribe', function (req,res) {
  console.log(req);
  mDevices.subscribe(req.query.token);
  res.send('Device successful subscribed');
})
// a device has unsubscribed to service and sends token:
serverInstance.get('/unsubscribe', function (req, res) {
  mDevices.unsubscribe(req.query.token);
  res.send('Device successful unsubscribed');
})

// start server on port 80 
serverInstance.listen(serverInstance.get('port'), function () {
  console.log('Server started at port ' + PORT );
});

let mFetcher = new Fetcher();
mFetcher.start();

mFetcher.on('data', (payload)=> {
  new Notification(payload);
   
}); 


