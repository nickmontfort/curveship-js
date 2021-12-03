// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

var title = "The Simulated Bank Robbery";

// EXISTENTS: Places, Actors, Things in that order

place.vestibule = new Place();
place.lobby = new Place();
place.guardPost = new Place();
place.street = new Place();

actor.teller = new Actor(place.vestibule, "female");
actor.robber = new Actor(place.street, "male");
actor.guard = new Actor(place.guardPost, "male");

thing.slip = new Thing(place.vestibule);
thing.fakeMoney = new Thing(place.vestibule);
thing.bag = new Thing(place.vestibule);
thing.mask = new Thing(actor.robber);
thing.fakeGun = new Thing(actor.robber);
thing.pistol = new Thing(actor.guard);
thing.fakeGun.setOwner(actor.robber);
thing.pistol.setOwner(actor.guard);

// EVENTS

ev.read = new Event(actor.teller, thing.slip);
ev.snooze = new Event(actor.guard);
ev.reread = new Event(actor.teller, thing.slip);
ev.coverFace = new Event(actor.robber, thing.mask);
ev.type = new Event(actor.teller);
ev.play = new Event(actor.teller);
ev.beginRobbing = new Event(actor.robber);
ev.beginRobbing.alters(actor.robber, "location", place.street, place.lobby);
ev.wave = new Event(actor.teller, actor.robber);
ev.threaten = new Event(actor.robber, actor.teller, temporal.using, thing.fakeGun);
ev.laugh = new Event(actor.teller);
ev.wake = new Event(actor.guard);
ev.seeThreat = new Event(actor.guard, actor.robber);
ev.leavePost = new Event(actor.guard, place.guardPost);
ev.leavePost.alters(actor.guard, "location", place.guardPost, place.lobby);
ev.grabFake = new Event(actor.teller, thing.fakeMoney, temporal.into, thing.bag);
ev.grabFake.alters(thing.fakeMoney, "location", place.vestibule, thing.bag);
ev.turn = new Event(actor.robber, actor.guard);
ev.shoot1 = new Event(actor.guard, actor.robber);
ev.shoot2 = new Event(actor.guard, actor.robber);
ev.fall = new Event(actor.robber);
ev.die = new Event(actor.robber);
ev.dropGun = new Event(actor.guard, thing.pistol);
ev.dropGun.alters(thing.pistol, "location", actor.guard, place.lobby);
ev.dropGun.alters(thing.pistol, "owner", actor.guard, null);
ev.regret = new Event(actor.guard, ev.shoot1);
ev.cry = new Event(actor.teller);
ev.stare = new Event(actor.guard, thing.pistol);

var world = new World(place, actor, category, thing, ev);
