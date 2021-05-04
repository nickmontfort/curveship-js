// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "The Simulated Bank Robbery";

// EXISTENTS: Places, Actors, Things in that order

place.vestibule = new Place();
place.lobby = new Place();
place.guard_post = new Place();
place.street = new Place();

actor.teller = new Actor(spatial.in, place.vestibule, "female");
actor.robber = new Actor(spatial.in, place.street, "male");
actor.guard = new Actor(spatial.in, place.guard_post, "male");

thing.slip = new Thing(spatial.in, place.vestibule);
thing.fake_money = new Thing(spatial.in, place.vestibule);
thing.bag = new Thing(spatial.in, place.vestibule);
thing.mask = new Thing(spatial.of, actor.robber);
thing.fake_gun = new Thing(spatial.of, actor.robber);
thing.pistol = new Thing(spatial.of, actor.guard, actor.guard);

// EVENTS

ev.read = new Event(actor.teller, thing.slip);
ev.snooze = new Event(actor.guard);
ev.reread = new Event(actor.teller, thing.slip);
ev.cover_face = new Event(actor.robber, thing.mask);
ev.type = new Event(actor.teller);
ev.play = new Event(actor.teller);
ev.begin_robbing = new Event(actor.robber);
ev.wave = new Event(actor.teller, actor.robber);
ev.threaten = new Event(actor.robber, actor.teller, temporal.using, thing.fake_gun);
ev.laugh = new Event(actor.teller);
ev.wake = new Event(actor.guard);
ev.see_threat = new Event(actor.guard, actor.robber);
ev.leave_post = new Event(actor.guard, place.guard_post);
ev.grab_fake = new Event(actor.teller, thing.fake_money, temporal.into, thing.bag);
ev.turn = new Event(actor.robber, actor.guard);
ev.shoot_1 = new Event(actor.guard, actor.robber);
ev.shoot_2 = new Event(actor.guard, actor.robber);
ev.fall = new Event(actor.robber);
ev.die = new Event(actor.robber);
ev.drop_gun = new Event(actor.guard, thing.pistol);
ev.drop_gun.reconfigures(thing.pistol, "parent", actor.guard, actor.cosmos);
ev.cry = new Event(actor.teller);
ev.stare = new Event(actor.guard, thing.pistol);

var world = new World(place, actor, thing, ev);
