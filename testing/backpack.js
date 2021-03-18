var metadata = { title: "Backpack Feast", author: "anjchang", date: "2021",
instructions: "A weak test.",
examples: [ 'i=chris,speaking=after','i=alice',"i=bob,you=john","i=john",
"order=random" ] };

// PLACES first
place.room = new Place("the", "room");

// ACTORS next
actor.alice = new Actor("", "Alice", spatial.in, place.room, pronoun.masculine);
actor.bob = new Actor("", "Bob", spatial.in, place.room, pronoun.feminine);
actor.chris= new Actor("", "Chris", spatial.in, place.room, pronoun.nonBinary);
actor.john= new Actor("", "John", spatial.in, place.room, pronoun.masculine);

// THINGS next
thing.backpack = new Thing("the", "backpack", spatial.in, place.room);
thing.backpack.owner= actor.chris
thing.table = new Thing("the", "table", spatial.in, place.room);
thing.apple = new Thing("the", "apple", spatial.in, place.room);
thing.banana = new Thing("the", "banana", spatial.in, place.room);
thing.pear = new Thing("the", "pear", spatial.in, place.room);
thing.pomegranate = new Thing("the", "pomegranate", spatial.in, place.room);

// Finally, EVENTS
var LOOK1 = new Event(actor.alice, "smile at", [actor.bob, actor.chris]);  //them //the guys
var LOOK2 = new Event(actor.bob, "look at", [thing.backpack, actor.chris]); //Chris and his backpack
var TAKEOUT = new Event(actor.chris, "take out", [thing.apple, thing.banana, thing.pear, thing.pomegranate]);
var LAYOUT = new Event(actor.chris, "place", [thing.apple, thing.banana, thing.pear, thing.pomegranate],spatial.on,thing.table)

var LOOK3 = new Event(actor.john, "look at", [thing.apple, thing.banana, thing.pear, thing.pomegranate],spatial.on,thing.table)
var SPEAK1 = new Event(actor.john, "say", "I look at everything with skin", temporal.to, [actor.alice,actor.bob,actor.chris]);
var SPEAK2 = new Event(actor.john, "say", "“What delicious things", spatial.on, thing.table);
var SPEAK3 = new Event(actor.john, "say", "“Thank you for bringing the fruit“", temporal.to, actor.chris);
var SPEAK4 = new Event(actor.alice, "say", "“What a feast we will have“", temporal.to, [actor.chris, actor.bob, actor.john]);
var TAKE1 = new Event(actor.john, "grab", thing.pomegranate)
var TAKE2 = new Event(actor.alice, "take a bite out of", thing.apple);
var TAKE3 = new Event(actor.bob, "peel", thing.banana);
var SPEAK5 = new Event(actor.chris, "say","“Dibs on the pear“")
var TAKE4 =new Event(actor.chris, "nibble", thing.pear);
var FEAST = new Event([actor.bob,actor.chris,actor.john, actor.alice],"had a feast");


var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
