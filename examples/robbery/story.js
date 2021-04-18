// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

let title = "The Simulated Bank Robbery";

// PLACES first
place.vestibule = new Place("the", "vestibule");
place.lobby = new Place("the", "lobby");
place.guard_post = new Place("the", "guard post");
place.street = new Place("the", "street outside the bank");

// ACTORS next
actor.teller = new Actor("a", "bank teller", spatial.in, place.vestibule, pronoun.feminine);
actor.robber = new Actor("a", "twitchy man", spatial.in, place.street, pronoun.masculine);
actor.guard = new Actor("a", "burly guard", spatial.in, place.guard_post, pronoun.masculine);

// THINGS next
thing.slip = new Thing("a", "deposit slip", spatial.in, place.vestibule);
thing.fake_money = new Thing("some", "fake money", spatial.in, place.vestibule);
thing.bag = new Thing("a", "black bag", spatial.in, place.vestibule);
thing.mask = new Thing("a", "Dora the Explorer mask", spatial.held_by, actor.robber);
thing.fake_gun = new Thing("a", "gun-shaped object", spatial.held_by, actor.robber);
thing.pistol = new Thing("a", "pistol", spatial.worn_by, actor.guard);
thing.pistol.owner = actor.guard;

// Finally, EVENTS
var READ = new Event(actor.teller, "read", thing.slip);
var SNOOZE = new Event(actor.guard, "sleep +ing");
var COUNT = new Event(actor.teller, "recheck", thing.slip);
clock += 50;
var COVER_FACE = new Event(actor.robber, "put on", thing.mask);
var TYPE = new Event(actor.teller, "type");
var PLAY = new Event(actor.teller, "play around");
var BEGIN_ROBBING = new Event(actor.robber, "enter");
var WAVE = new Event(actor.teller, "wave to", actor.robber);
var THREATEN = new Event(actor.robber, "threaten", actor.teller, temporal.using, thing.fake_gun);
var LAUGH = new Event(actor.teller, "laugh");
var WAKE = new Event(actor.guard, "wake");
var SEE_THREAT = new Event(actor.guard, "see", actor.robber);
var LEAVE_POST = new Event(actor.guard, "leave", place.guard_post);
var GRAB_FAKE = new Event(actor.teller, "put", thing.fake_money, temporal.into, thing.bag);
var TURN = new Event(actor.robber, "turn to", actor.guard);
var SHOOT_1 = new Event(actor.guard, "shoot", actor.robber);
var SHOOT_2 = new Event(actor.guard, "shoot", actor.robber);
var FALL = new Event(actor.robber, "fall");
var DIE = new Event(actor.robber, "die");
var SHOOT_2 = new Event(actor.guard, "shoot", actor.robber);
var DROP_GUN = new Event(actor.guard, "drop", thing.pistol);
DROP_GUN.reconfigures(thing.pistol, "owner", actor.guard, null);
var CRY = new Event(actor.teller, "weep");
var STARE = new Event(actor.guard, "stare at", thing.pistol);

var world = new World(place, actor, thing, eventSeq);
