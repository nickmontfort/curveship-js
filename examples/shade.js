
var metadata = { title: "Shade", author: "Andrew Plotkin", date: "2000",
instructions: "A one room game set in your apartment",
examples: [ "i=protagonist",
"order=retrograde,you=protagonist",
"speaking=after,i=actor,order=random" ] };

// PLACES first
place.apartment = new Place("In the", "studio apartment");

place.apartment.addView(place.apartment, "In your apartment");

// ACTORS next
actor.protagonist = new Actor("a", "protagonist", spatial.in, place.apartment, pronoun.unknownBinary);


// THINGS next
thing.ticket = new Thing("the", "plane tickets", spatial.on, place.apartment);
thing.ticket.owner = actor.protagonist;
thing.lamp = new Thing("a", "desk lamp", spatial.on, place.apartment);
thing.lamp.owner = actor.protagonist;
thing.list = new Thing("a", "to-do list", spatial.on, place.apartment);
thing.list.owner = actor.protagonist;
thing.stereo = new Thing("a", "stereo", spatial.of, place.apartment);
thing.stereo.owner = actor.protagonist;
thing.shade  = new Thing("the", "shade", spatial.of, place.apartment);
thing.sand = new Thing("", "sand", spatial.if, place.apartment);



// Finally, EVENTS
var DRAWN = new Event(thing.shade, "are down")
var CONSULT = new Event(actor.protagonist,"consult",thing.list);
var LOCATE = new Event(actor.protagonist, "locate the ", thing.ticket);
var TACKLE = new Event(actor.protagonist,"tackle", thing.list);
var CRUMBLE = new Event(thing.stereo, "crumble into ",thing.sand);
var BURY = new Event(thing.sand, "bury ",thing.stereo);
var DIZZY = new Event(actor.protagonist, "feel dizzy");
var VANISH = new Event(place.apartment, "vanish");

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
