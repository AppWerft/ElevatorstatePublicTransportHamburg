"use strict"

const fetch = require('node-fetch');
const EventEmitter = require('events');
const GEOFOX_URL = 'https://geofox.hvv.de/data-service/rest/elevators/stations/';
// private var
let lastState = {};

class Fetcher extends EventEmitter  {
  constructor() {
    super();
    this.count = 1;
    this.lastState = {}
    this.cron;
  };
  start() {
    this._fetchStateAndGetDiff();
    this.cron = setInterval(
      ()=>this._fetchStateAndGetDiff(),
      30*1000
    );
  };

  stop(){
    clearInterval(this.cron);
  }; 
  
  _fetchStateAndGetDiff(json) {
    const start = new Date().getTime();
    console.log("Start fetch #" + this.count++);
    const request = require('request');
    request(GEOFOX_URL, (error, response, body)=> {
      if (!error && response.statusCode === 200) {
        try {
          const json = JSON.parse(body)
          var newState = {};
          // extracting hash of all states
          json.stations.forEach(station =>{
           Object.getOwnPropertyNames(station.elevators).forEach(elevatorId=>{
            newState[station.gfxId + "_" + elevatorId] = station.elevators[elevatorId].state;
            });
          });
          let diffs = []; 
          // make diff
          Object.getOwnPropertyNames(newState).forEach(elevatorId=>{
          if (newState[elevatorId] != lastState[elevatorId]) {
           let obj = {};
           obj[elevatorId]= newState[elevatorId]
            diffs.push(obj);
          }
        });         
        this.emit('data', diffs);
        // save new elevator state to state
        Object.assign(this.lastState, newState);
      }
      catch(E) {
        console.log(E);
      }
      } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
      }
    })
  }
};
module.exports = Fetcher;