"use strict"

const Devices = require('./devicesdb');

class PushNotification {
   constructor (diffs) {
     this.diffs = diffs;
     let mDevices =  new Devices();   
     var deviceTokens = mDevices.getAll().then((res) => {
        this._sendNotification();
     });
   };

   _sendNotification(res) { 
    if (!deviceTokens || deviceTokens.length==0) {
      console.log("nix zu tun. Niemand ist neugierig");
      return;
    }
    const options = {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : "key="  + FCM_APPID
      },
      body: JSON.stringify({
          to : deviceTokens,
          title : "Aufzug kaputt",
          vibrate : true
        }) 
    };
    fetch(FCM_ENDPOINT, options).then(res=>{}).catch((err=>{}));    
  }
};

module.exports =  PushNotification;
