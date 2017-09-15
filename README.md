# ElevatorstatePublicTransportHamburg
API for monitoring state of elevators in Hamburg
## Data sources

### Live request

On this page Geofox supports a json with states: http://geofox.hvv.de/jsf/showElevatorStates.seam. Unfortunatelly the lat/lon position are fictional and only for this special map. An example response can find [here](https://github.com/AppWerft/mobileHackathon2017/blob/master/listofelevatorstates.json)

### Overpass

With [overpass](http://overpass-turbo.eu/) and this request:

```
[out:json];
area[name="Hamburg"];
(
  // query part for: “highway=elevator”
  node["highway"="elevator"](area);
  way["highway"="elevator"](area);
  relation["highway"="elevator"](area);
);
// print results
out body;
>;
out skel qt;
(._;>;);out;
```
