"use strict"

const fetch = require('node-fetch');
const EventEmitter = require('events');
const GEOFOX_URL = 'https://geofox.hvv.de/data-service/rest/elevators/stations/';
// private var
let lastState = {};

class Fetcher extends EventEmitter  {
  constructor() {
    super();
    this.lastState = {}
    this.cron;
  };
  start() {
    this.cron = setInterval(this._fetchStateAndGetDiff,60*1000)
  };
  stop(){
    clearInterval(this.cron);
  }; 
  
  _fetchStateAndGetDiff(json) {
    fetch(GEOFOX_URL,{method:'GET'})
    .then(response => response.json().then(newJson => {
      
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
    this.emit('data', diff);
    // save new elevator state to state
    Object.assign(this.lastState, newState);
    // if some diff => send to all subscribers a notification   
    }));
  }
};
module.exports = Fetcher;