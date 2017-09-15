# ElevatorstatePublicTransportHamburg
API for monitoring state of elevators in Hamburg
## Data sources

### Live request

On this page Geofox supports a json with states: http://geofox.hvv.de/jsf/showElevatorStates.seam. Unfortunatelly the lat/lon position are fictional and only for this special map. An example response can find [here](https://github.com/AppWerft/mobileHackathon2017/blob/master/listofelevatorstates.json)

### Overpass

With [overpass](http://overpass-turbo.eu/) we can ask the database of OSM with his request:

```
[out:json];
area[name="Hamburg"];
(
  node["highway"="elevator"](area);
  way["highway"="elevator"](area);
  relation["highway"="elevator"](area);
);
out body;
>;
out skel qt;
(._;>;);out;
```
and get i.e.
```
{
  "type": "node",
  "id": 430136424,
  "lat": 53.5531786,
  "lon": 9.9936662,
  "tags": {
    "description": "Straße/Schalterhalle",
    "entrance": "yes",
    "entrance_marker:s-train": "yes",
    "entrance_marker:subway": "yes",
    "entrance_name": "Jungfernstieg",
    "highway": "elevator",
    "manufacturer": "Lutz- Aufzüge",
    "name": "Jungfernstieg",
    "operator": "HOCHBAHN",
    "railway": "subway_entrance",
    "ref": "10909",
    "since": "2006",
    "toilets:wheelchair": "yes",
    "tunnelsystem_jungfernstieg": "eingang",
    "wheelchair": "yes",
    "wheelchair:description": "Aufzug vom Jungfernstieg nach unten: Rolli-WC ohne Euroschlüssel- aber Toilettenpersonal bis 22:30"
  }
},
```
Unfortunatelly without reference to the id system of  GeoFox (gfxId)
