module.exports = class Notification {
    constructor(diff) {
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
    }
}