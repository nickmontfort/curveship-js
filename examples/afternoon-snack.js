// Fairy Tale In Parts

var metadata = { title: "Afternoon Snack", author: "Joanne Yuan", date: "2021",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee. Examples:",
examples: [ "i=x",
"order=retrograde", "speaking=after" ] };


// PLACES first
place.cave = new Place("a", "cave");

// ACTORS next
actor.X = new Actor("", "X", spatial.in, place.cave, pronoun.masculine);

// THINGS next
thing.woman = new Thing("a", "woman facedown in the dirt",  spatial.of, actor.lady);
thing.man = new Thing("a", "man stabbed through the stomach")
thing.child = new Thing("a", "child crying in front of his parents")

//2
var WALK = new Event(actor.X, "walk in", place.cave);
var SEE1 = new Event(actor.X, "see", thing.woman);
var SEE2 = new Event(actor.X, "see", thing.man);
var SEE3 = new Event(actor.X, "see", thing.child);
var SURVEY = new Event(actor.X, "survey", [thing.woman, thing.man, thing.child]);


var world = new World(place, actor, thing, eventSeq);

function run() {
    var spin = getParameters(world.actor);
    narrate(metadata, spin, world);
};
