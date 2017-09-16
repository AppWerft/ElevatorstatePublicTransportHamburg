"use strict"

const Devices = require('./devicesdb');

class PushNotification {
   constructor () {
      this.sendNotification();
   };

   async sendNotification() {    
    var deviceTokens = await new Devices.getAll();
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
    fetch(FCM_ENDPOINT,options).then(res=>{}).catch((err=>{}));    
 }
};

module.exports =  PushNotification;
