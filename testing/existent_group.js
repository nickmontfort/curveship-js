var metadata = { title: "Existent Group Test", author: "Nick Montfort", date: "2021",
instructions: "A weak test.",
examples: [ 'speaking=after' ] };

// PLACES first
place.room = new Place("the", "room");

// ACTORS next
actor.john = new Actor("", "John", spatial.in, place.room, pronoun.masculine);
actor.mary = new Actor("", "Mary", spatial.in, place.room, pronoun.feminine);
actor.bill = new Actor("", "Bill", spatial.in, place.room, pronoun.nonBinary);

// THINGS next
thing.rock = new Thing("the", "rock", spatial.in, place.room);
thing.chair = new Thing("the", "chair", spatial.in, place.room);
thing.table = new Thing("the", "table", spatial.in, place.room);
thing.window = new Thing("the", "window", spatial.in, place.room);

// Finally, EVENTS
var LOOK1 = new Event(actor.john, "look at", [actor.mary, actor.bill]);
var LOOK2 = new Event(actor.john, "look at", [thing.rock, actor.john]);
var LOOK3 = new Event(actor.john, "look at", [thing.chair, thing.table, thing.window]);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
