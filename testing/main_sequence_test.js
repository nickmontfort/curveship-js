var metadata = { title: "Main Sequence Test 2021-01-17", author: "Nick Montfort", date: "2021",
instructions: "A test.",
examples: [ "main=0;3;6;8", "main=0;3-6;8" ] };

// PLACES first
place.home = new Place("", "home");
place.park = new Place("the", "park");

// ACTORS next
actor.man = new Actor("a", "man", spatial.in, place.park, pronoun.masculine);
actor.girl = new Actor("a", "girl", spatial.in, place.home, pronoun.feminine);
place.home.owner = actor.girl;
actor.streetlamp = new Actor("a", "streetlamp", spatial.in, place.park, pronoun.neuter);

// THINGS next
// None for this test.

// Finally, EVENTS
var PUTTER = new Event(actor.girl, "putter around", place.home);
var DEPART = new Event(actor.girl, "leave", place.home);
var ENTER = new Event(actor.girl, "enter", place.park);
var WHISTLE = new Event(actor.man, "whistle loudly");
var LOOK = new Event(actor.man, "look knowingly at", actor.girl);
var SMILE = new Event(actor.girl, "smile at", actor.man);
var APPROACH = new Event(actor.man, "approach", actor.girl);
var CHAT = new Event([actor.girl, actor.man], "chat");
var FLICKER = new Event(actor.streetlamp, "flicker off");

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
