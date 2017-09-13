let state = null;

module.exports = {
    update : function(json) {
      if (!state) {
        state= json;
        return;
      }
      // extracting hash of all states
        json.stations.forEach(function(s){
            let id = s.gfxId;
            Object.getOwnProperties(s).forEach(function(e));
        })
        
      // make diff
        
      // if some diff => send to all subscribers a notification   
        
      // save new elevator state to state
    }
};
