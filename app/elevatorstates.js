"use strict"

// private var
let lastState = {};

module.exports = {
  getDiff : function(json) {
    var newState = {};
    // extracting hash of all states
    json.stations.forEach(station =>{
     Object.getOwnPropertyNames(station.elevators).forEach(elevatorId=>{
      newState[station.gfxId + "_" + elevatorId] = station.elevators[elevatorId].state;
      });
    })
   
    let diffs = []; 
    // make diff
    Object.getOwnPropertyNames(newState).forEach(elevatorId=>{
    if (newState[elevatorId] != lastState[elevatorId]) {
      let obj = {};
      obj[elevatorId]= newState[elevatorId]
      diffs.push(obj);
    }
  });         
  // save new elevator state to state
  lastState = Object.assign(lastState, newState);
  // if some diff => send to all subscribers a notification   
  return diffs.length ? diffs : null; 
  }
};
