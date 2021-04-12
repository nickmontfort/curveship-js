
var metadata = { title: "Red Carpet", author: "anjchang", date: "2021",
instructions: "Simple example with two actors",
examples: [ "i=reporter",
"order=retrograde,you=actress,i=actress,event_numbers",
"speaking=after,i=reporter,order=random" ] };

// PLACES first
place.redcarpet = new Place("on the", "red carpet");
place.pressroom = new Place("the", "press room");

place.redcarpet.addView(place.redcarpet, "On the red carpet");
place.pressroom.addView(place.pressroom, "From the press room");

// ACTORS next
actor.actress = new Actor("an", "actress", spatial.in, place.redcarpet, pronoun.feminine);
actor.reporter = new Actor("a", "reporter", spatial.in, place.pressroom, pronoun.masculine);

// THINGS next
thing.camera = new Thing("a", "camera", spatial.on, actor.reporter);
thing.camera.owner = actor.reporter;
thing.purse = new Thing("a", "purse", spatial.on, actor.actress);
thing.purse.owner = actor.actress;

// Finally, EVENTS
var APPEAR = new Event(actor.actress, "appear", place.redcarpet);
var SHOOT = new Event(actor.reporter, "point", thing.camera);
var MOVE = new Event(actor.reporter, "interview",actor.actress);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
