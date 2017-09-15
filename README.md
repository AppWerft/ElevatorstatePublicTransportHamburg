# ElevatorstatePublicTransportHamburg
API for monitoring state of elevators in Hamburg
## Data sources

### Live request

On this page Geofox supports a json with states: http://geofox.hvv.de/jsf/showElevatorStates.seam. Unfortunatelly the lat/lon position are fictional and only for this special map. An example response can find [here](https://github.com/AppWerft/mobileHackathon2017/blob/master/listofelevatorstates.json)
```
{
		"gfxId": "Master:11950",
		"lon": -92.1464,
		"lat": -208.9392,
		"elevators": {
			"A": {
				"state": 1,
				"description": "Zugang Alsterpavillion <-> Schalterhalle",
				"label": "A",
				"type": "DURCHLADER",
				"tasterType": "KOMBI",
				"lines": [],
				"cabinLength": 0,
				"cabinWidth": 0,
				"doorWidth": 0,
				"instCause": ""
			},
			"B": {
				"state": 1,
				"description": "Schalterhalle <-> Zwischenebene (U2,U4)",
				"label": "B",
				"type": "DURCHLADER",
				"tasterType": "KOMBI",
				"lines": [],
				"cabinLength": 0,
				"cabinWidth": 0,
				"doorWidth": 0,
				"instCause": ""
			},
			"C": {
				"state": 1,
				"description": "Zwischenebene <-> U2 Ri. Mümmelmannsberg und U4 Ri. Billstedt",
				"label": "C",
				"type": "DURCHLADER",
				"tasterType": "KOMBI",
				"lines": ["U2", "U4"],
				"cabinLength": 210,
				"cabinWidth": 123,
				"doorWidth": 89,
				"instCause": ""
			},
			"D": {
				"state": 1,
				"description": "Zwischenebene <-> U2 Ri. Niendorf Nord und U4 Ri. HafenCity Universität",
				"label": "D",
				"type": "DURCHLADER",
				"tasterType": "KOMBI",
				"lines": ["U2", "U4"],
				"cabinLength": 210,
				"cabinWidth": 123,
				"doorWidth": 89,
				"instCause": ""
			}
		},
		"mainSubStation": {
			"linkId": "Master_11950",
			"stationName": "Jungfernstieg S1/S2/S3/U1",
			"comment": "Haltestelle nicht barrierefrei"
		},
		"additionalSubStations": {
			"Master_11950_U": {
				"linkId": "Master_11950_U",
				"stationName": "Jungfernstieg U2",
				"lineKeys": ["HHA-U:U2_HHA-U_HHA-R"],
				"comment": "Einstieg für Rollstuhlfahrer im gekennzeichneten Bereich"
			}
		}
	}
```
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
![](overpass.png)
Unfortunatelly without reference to the id system of  GeoFox (gfxId)
