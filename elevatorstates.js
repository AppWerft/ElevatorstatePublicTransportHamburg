let lastState = {};

module.exports = {
    update : function(json) {
      var newState = {};
      // extracting hash of all states
      json.stations.forEach(function(s){
      Object.getOwnPropertyNames(s.elevators).forEach(e=>{
           newState[s.gfxId+"_"+e]=s.elevators[e].state;
        });
      })
      let diffs = []; 
      // make diff
      Object.getOwnPropertyNames(newState).forEach(e=>{
          if (newState[e] != lastState[e]) {
            diffs.push({ e : newState[e]});
          }
      });      
      // save new elevator state to state
      lastState = Object.assign(lastState,newState);
       // if some diff => send to all subscribers a notification   
       return diffs.length ? diffs : null; 
    }
};
