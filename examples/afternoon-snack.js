// Fairy Tale In Parts

var metadata = { title: "Afternoon Snack", author: "Joanne Yuan", date: "2021",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee. Examples:",
examples: [ "i=x", "i=woman", "i=man", "i=child",
"order=retrograde", "speaking=after" ] };


// PLACES first
place.cave = new Place("a", "cave");

// ACTORS next
actor.X = new Actor("", "X", spatial.in, place.cave, pronoun.masculine);
actor.woman = new Actor("a", "woman facedown in the dirt",  spatial.in, place.cave, pronoun.feminine);
actor.man = new Actor("a", "man stabbed through the stomach", spatial.in, place.cave, pronoun.masculine)
actor.child = new Actor("a", "child", spatial.in, place.cave, pronoun.masculine)

//2
var WALK = new Event(actor.X, "walk in", place.cave);
var SEE1 = new Event(actor.X, "see", actor.woman);
var SEE2 = new Event(actor.X, "see", actor.man);
var SEE3 = new Event(actor.X, "see", actor.child);
var SURVEY = new Event(actor.X, "survey", [actor.woman, actor.man, actor.child]);


var world = new World(place, actor, thing, eventSeq);

function run() {
    var spin = getParameters(world.actor);
    narrate(metadata, spin, world);
};
