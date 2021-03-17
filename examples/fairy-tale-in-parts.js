// Fairy Tale In Parts

var metadata = { title: "Fairy Tale In Parts", author: "Joanne Yuan", date: "2021",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee. Examples:",
examples: [ "i=lady,main=0;1;4", "i=servant,main=0-3;5", "i=king,main=2;3", "main=0;3;6", "main=0;6", "main=1;2;4",
"order=retrograde", "speaking=after" ] };

// PLACES first
place.bedroom = new Place("the", "bedroom");
place.hall = new Place("the", "great hall");

// ACTORS next
actor.lady = new Actor("the", "lady", spatial.in, place.bedroom, pronoun.feminine);
actor.servant = new Actor("the", "servant", spatial.in, place.bedroom, pronoun.masculine);
actor.king = new Actor("the", "king", spatial.in, place.hall, pronoun.masculine);

// THINGS next
thing.handkerchief = new Thing("", "handkerchief",  spatial.of, actor.lady);
thing.handkerchief.owner = actor.lady;
thing.medicine = new Thing("the", "medicine",  spatial.of, actor.lady);
thing.medicine.owner = actor.king
thing.l_life = new Thing("", "life",  spatial.of, actor.lady);
thing.l_life.owner = actor.lady;
thing.s_life = new Thing("", "life",  spatial.of, actor.servant);
thing.s_life.owner = actor.servant;

//2
var CONFIDE = new Event(actor.lady, "confide in", actor.servant);
var COUGH = new Event(actor.lady, "cough in", thing.handkerchief);
var SPIN = new Event(actor.servant, "steal", thing.medicine);
var WHIP = new Event(actor.king, "whip", actor.servant);
var WAKE = new Event(actor.lady, "wake", "up");
var WAKE = new Event(thing.s_life, "fade");
var KNOWS = new Event(actor.lady, "know", "nothing")


var world = new World(place, actor, thing, eventSeq);

function run() {
    var spin = getParameters(world.actor);
    narrate(metadata, spin, world);
};
