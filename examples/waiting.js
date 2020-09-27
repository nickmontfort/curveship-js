// I’m Waiting for the Man - an example Curveship-js story
//  Copyright 2020 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// This story was selected for Curveship-js adaptation in part because the
// narrator (the “I” of the story, the drug purchaser) shifts during the
// narration to become the narratee (the “you”). This selection also means
// that a narrative from a popular song is represented among the examples.

var metadata = { title: "I’m Waiting for the Man", author: "Lou Reed", date: "1967",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee, which can be found by looking at the code. Examples:",
examples: [ "narrator=buyer,speaking=after",
"narrator=buyer,narratee=man",
"order=random,narratee=man,time_markers,expression_numbers,event_numbers" ] };

// PLACES first
place.intersection = new Place("the", "intersection of Lexington and 125th");
place.brownstone = new Place("a", "brownstone");
place.stairs = new Place("three", "flights of stairs");
place.stairs.number = 2;
place.inside = new Place("", "inside");

// ACTORS next
actor.buyer = new Actor("a", "drug buyer", spatial.in, place.intersection, pronoun.masculine);
actor.resident = new Actor("a", "resident", spatial.in, place.intersection, pronoun.masculine);
actor.neighbors = new Actor("the", "neighbors", spatial.in, place.intersection, pronoun.neuter, 2);
actor.man = new Actor("a", "drug dealer", spatial.of, actor.cosmos, pronoun.masculine);

// THINGS next
thing.money = new Thing("twenty-six", "dollars", spatial.of, actor.buyer);
thing.hand = new Thing("one", "hand", spatial.of, actor.buyer);
thing.hand.owner = actor.buyer;
thing.clothing = new Thing("", "black clothes", spatial.on, actor.man);
thing.hat = new Thing("a", "straw hat", spatial.on, actor.man);
thing.heroin = new Thing("", "heroin", spatial.in, place.brownstone);

// Finally, EVENTS
var WANT_TO_BUY_HEROIN = new Event(actor.buyer, "want to buy", thing.heroin);
var GO_UPTOWN = new Event(actor.buyer, "go", null, temporal.upTo, place.intersection);
var WAIT = new Event(actor.buyer, "wait", null, temporal.for, actor.man);
var HOLD_MONEY = new Event(actor.buyer, "hold", thing.money, temporal.in, thing.hand);
var FEEL_SICK = new Event(actor.buyer, "feel", "sick and dirty");
var WAIT = new Event(actor.buyer, "wait", null, temporal.for, actor.man);
var CONFRONT_1 = new Event(actor.resident, "say", "“Hey white boy, what you doing uptown?”", temporal.to, actor.buyer);
var CONFRONT_2 = new Event(actor.resident, "say", "“Hey white boy, you chasin’ our women around?”", temporal.to, actor.buyer);
var REPLY_1 = new Event(actor.buyer, "reply", "“Oh pardon me sir, it’s the furthest from my mind”", temporal.to, actor.resident);
var REPLY_2 = new Event(actor.buyer, "reply", "“I’m just looking for a dear dear friend of mine”", temporal.to, actor.resident);
var ARRIVE = new Event(actor.man, "arrive", null, temporal.at, place.intersection);
var KNOW_PURPOSE = new Event(actor.neighbors, "know", WANT_TO_BUY_HEROIN);
var NOT_CARE = new Event(actor.neighbors, "not care", WANT_TO_BUY_HEROIN);
var GO_TO_BROWNSTONE = new Event([actor.man, actor.buyer], "go", null, temporal.upTo, place.brownstone);
var GO_UPSTAIRS = new Event([actor.man, actor.buyer], "go", null, temporal.up, place.stairs);
// thing.heroin.owner = actor.man;   FIXME this can't be used to switch the owner back & forth
var TASTE = new Event(actor.buyer, "taste", thing.heroin);
var BUY = new Event(actor.buyer, "buy", thing.heroin, temporal.from, actor.man);
var LACK_TIME = new Event(actor.buyer, "not have", "time to waste");
var GO_DOWNSTAIRS = new Event(actor.buyer, "go", null, temporal.down, place.stairs);
var SPLIT = new Event(actor.buyer, "split", null, temporal.from, place.intersection);
var NOT_HOLLER = new Event(actor.buyer, "not holler");
var NOT_BAWL = new Event(actor.buyer, "not bawl");
var NOT_SHOUT = new Event(actor.buyer, "not shout");
var FEEL_GOOD = new Event(actor.buyer, "feel +ing", "good");
var FEEL_FINE = new Event(actor.buyer, "feel +ing", "fine");

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
