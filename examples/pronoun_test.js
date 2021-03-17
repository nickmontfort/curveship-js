var metadata = { title: "Pronoun Test 2021-01-17", author: "Nick Montfort", date: "2021",
instructions: "A test.",
examples: [ "i=john,you=mary", "i=sam", "i=john,you=sam,speaking=after" ] };

// PLACES first
place.room = new Place("the", "room");
place.outside = new Place("", "outside");

// ACTORS next
actor.john = new Actor("", "John", spatial.in, place.room, pronoun.masculine);
actor.mary = new Actor("", "Mary", spatial.in, place.room, pronoun.feminine);
actor.sam = new Actor("", "Sam", spatial.in, place.room, pronoun.nonBinary);

// THINGS next
thing.backpack1 = new Thing("a", "backpack", spatial.in, place.room);
thing.backpack1.owner = actor.john;
thing.backpack2 = new Thing("a", "backpack", spatial.in, place.room);
thing.backpack2.owner = actor.mary;
thing.backpack3 = new Thing("a", "backpack", spatial.in, place.room);
thing.backpack3.owner = actor.sam;

// Finally, EVENTS
//var LOOK1 = new Event(actor.sam, "examine", actor.john);
//var LOOK2 = new Event(actor.john, "examine", actor.john);
//var LOOK3 = new Event(actor.mary, "examine", actor.mary);
//var LOOK4 = new Event(actor.sam, "is examining", actor.sam);
//var LOOK5 = new Event(actor.sam, "is examining", actor.john);

// This is for the next step, dealing with possessive pronouns
var GET1 = new Event(actor.john, "take", thing.backpack1);
var GET2 = new Event(actor.mary, "take", thing.backpack2);
var GET3 = new Event(actor.sam, "take", thing.backpack3);
var DROP1 = new Event(actor.john, "drop", thing.backpack1);
var LOOK5 = new Event(actor.mary, "look", actor.mary);
var DROP2 = new Event(actor.mary, "drop", thing.backpack2);
var DROP3 = new Event(actor.sam, "drop", thing.backpack3);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
