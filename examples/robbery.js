// The Simulated Bank Robbery - an example Curveship-js story, 2019-11-08
//  Copyright 2019-2020 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// This is a non-interactive narrative from the original Curveship,
// Curveship-py 0.5, also available in the Python 3 version, Curveship-py 0.6.

var metadata = { title: "The Simulated Bank Robbery", author: "Nick Montfort", date: "2007",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee, which can be found by looking at the code. Examples:",
examples: [ "narrator=teller",
"order=retrograde,narratee=robber,narrator=guard,event_numbers",
"speaking=after,narrator=teller,order=random,event_numbers,expression_numbers" ] };

// PLACES first
place.vestibule = new Place("the", "vestibule");
place.lobby = new Place("the", "lobby");
place.guardPost = new Place("the", "guard post");
place.street = new Place("the", "street outside the bank");

place.vestibule.addView(place.lobby, "out in the lobby");
place.lobby.addView(place.vestibule, "inside the vestibule");
place.guardPost.addView(place.lobby, "through the one-way mirror");

// ACTORS next
actor.teller = new Actor("a", "bank teller", spatial.in, place.vestibule, pronoun.feminine);
actor.robber = new Actor("a", "twitchy man", spatial.in, place.street, pronoun.masculine);
actor.guard = new Actor("a", "burly guard", spatial.in, place.guard_post, pronoun.masculine);

// THINGS next
thing.slip = new Thing("a", "deposit slip", spatial.in, place.vestibule);
thing.fake_money = new Thing("some", "fake money", spatial.in, place.vestibule);
thing.bag = new Thing("a", "black bag", spatial.in, place.vestibule);
thing.mask = new Thing("a", "Dora the Explorer mask", spatial.of, actor.robber);
thing.fake_gun = new Thing("a", "gun-shaped object", spatial.of, actor.robber);
thing.pistol = new Thing("a", "pistol", spatial.of, actor.guard);
thing.pistol.owner = actor.guard;

// Finally, EVENTS
var READ = new Event(actor.teller, "read", thing.slip);
var SNOOZE = new Event(actor.guard, "sleep +ing");
var COUNT = new Event(actor.teller, "recheck", thing.slip);
clock += 50;
var COVER_FACE = new Event(actor.robber, "wear", thing.mask);
COVER_FACE.changeState(thing.mask, spatial.of, actor.robber, spatial.on, actor.robber);
COVER_FACE.setTemplate("[agent/s] [put/v] on [object/o]");
var TYPE = new Event(actor.teller, "type");
var PLAY = new Event(actor.teller, "play");
PLAY.setTemplate("[agent/s] [play/v] Solitaire a bit on [agent's] computer");
var BEGIN_ROBBING = new Event(actor.robber, "enter");
BEGIN_ROBBING.changeState(actor.robber, spatial.in, place.street, spatial.in, place.lobby);
BEGIN_ROBBING.setTemplate("[agent/s] [leave/v] the street");
var WAVE = new Event(actor.teller, "wave", actor.robber);
WAVE.setTemplate("[agent/s] [wave/v] to [object/o]");
var THREATEN = new Event(actor.robber, "threaten", actor.teller, temporal.using, thing.fake_gun);
var LAUGH = new Event(actor.teller, "laugh");
var WAKE = new Event(actor.guard, "wake");
var SEE_THREAT = new Event(actor.guard, "see", actor.robber);
SEE_THREAT.setSense("sight");
var LEAVE_POST = new Event(actor.guard, "leave");
LEAVE_POST.changeState(actor.guard, spatial.in, place.guard_post, spatial.in, place.lobby);
LEAVE_POST.setTemplate("[agent/s] [leave/v] the guard post");
var GRAB_FAKE = new Event(actor.teller, "put", thing.fake_money, temporal.into, thing.bag);
GRAB_FAKE.changeState(thing.fake_money, spatial.in, place.vestibule, spatial.into, thing.bag);
var TURN = new Event(actor.robber, "turn", actor.guard);
TURN.setTemplate("[agent/s] [turn/v] to [object/o]");
var SHOOT_1 = new Event(actor.guard, "shoot", actor.robber);
SHOOT_1.setTemplate("[agent/s] [shoot/v] [object/o] in the chest");
var SHOOT_2 = new Event(actor.guard, "shoot", actor.robber);
SHOOT_2.setTemplate("[agent/s] [shoot/v] [object/o] in the chest");
var FALL = new Event(actor.robber, "fall");
var DIE = new Event(actor.robber, "die");
var SHOOT_2 = new Event(actor.guard, "shoot", actor.robber);
var DROP_GUN = new Event(actor.guard, "drop", thing.pistol);
DROP_GUN.reconfigures(thing.pistol, "owner", actor.guard, null);
var CRY = new Event(actor.teller, "weep");
var STARE = new Event(actor.guard, "stare at", thing.pistol);

var world = new World(place, actor, thing, eventSeq);

function run() {
    var spin = getParameters(world.actor);
    narrate(metadata, spin, world);
};
