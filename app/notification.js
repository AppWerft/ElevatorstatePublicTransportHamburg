"use strict"

const Devices = require('./devicesdb'),
FCM_APPID = 'AAAAipLqDp0:APA91bEf6R_BcxjTDZZ3srbLc__jhxkdgt2yGQ49pJlRBBPNsMUDhx9pXiK2PwXioaq3QI9-MGc1oHG0zpsKq1ZqR8TuoavgvbECJfCT-3mDwpJrHKwFltmfzYmeKxqYeCmNpgIN63h-';

module.exports = class {
   constructor (diffs) {
     this.diffs = diffs;
     let mDevices =  new Devices();   
     mDevices.getAll().then((res) => {
        this._sendNotification(res);
     }).catch(err=>{
       console.log("issues during db requesting " + err);
     });
   };

   _sendNotification(deviceTokens) { 
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
