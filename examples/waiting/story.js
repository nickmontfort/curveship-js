// I'm Waiting for the Man - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

var title = "I'm Waiting for the Man";

// EXISTENTS: Places, Actors, Things in that order

place.intersection = new Place();
place.brownstone = new Place();
place.stairs = new Place();
place.inside = new Place();

actor.buyer = new Actor(place.intersection, "male");
actor.resident = new Actor(place.intersection, "male");
actor.neighbor_1 = new Actor(null, "male");
actor.neighbor_2 = new Actor(null, "male");
actor.man = new Actor(null, "male");


thing.money = new Thing(actor.buyer);
//thing.money.setOwner(actor.buyer);
thing.hand = new Thing(actor.buyer);
thing.hand.setOwner(actor.buyer);
actor.buyer.setParts([thing.hand]);
thing.clothing = new Thing(actor.man);
thing.clothing.setOwner(actor.man);
thing.hat = new Thing(actor.man);
thing.hat.setOwner(actor.man);
thing.heroin = new Thing();

category.neighbor = new Category([actor.neighbor_1, actor.neighbor_2]);

// EVENTS

ev.want = new Event(actor.buyer, thing.heroin);
ev.go = new Event(actor.buyer, null, temporal.to, place.intersection);
ev.wait_1 = new Event(actor.buyer, null, temporal.for, actor.man);
ev.hold = new Event(actor.buyer, thing.money, temporal.in, thing.hand);
ev.feel = new Event(actor.buyer);
ev.wait_2 = new Event(actor.buyer, null, temporal.for, actor.man);
ev.confront_1 = new Event(actor.resident, "Hey white boy, what you doing uptown?", temporal.to, actor.buyer);
ev.confront_2 = new Event(actor.resident, "Hey white boy, you chasin’ our women around?", temporal.to, actor.buyer);
ev.reply_1 = new Event(actor.buyer, "Oh pardon me sir, it’s the furthest from my mind", temporal.to, actor.resident);
ev.reply_2 = new Event(actor.buyer, "I’m just looking for a dear dear friend of mine", temporal.to, actor.resident);
ev.arrive = new Event(actor.man, null, temporal.at, place.intersection);
ev.know = new Event([actor.neighbor_1, actor.neighbor_2], ev.want);
ev.care = new Event([actor.neighbor_1, actor.neighbor_2], ev.want);
ev.go_brownstone = new Event([actor.man, actor.buyer], null, temporal.to, place.brownstone);
ev.go_upstairs = new Event([actor.man, actor.buyer], null, temporal.to, place.stairs);
ev.taste = new Event(actor.buyer, thing.heroin);
ev.buy = new Event(actor.buyer, thing.heroin, temporal.from, actor.man);
ev.lack = new Event(actor.buyer);
ev.go_downstairs = new Event(actor.buyer, place.stairs);
ev.split = new Event(actor.buyer, null, temporal.from, place.intersection);
ev.holler = new Event(actor.buyer);
ev.bawl = new Event(actor.buyer);
ev.shout = new Event(actor.buyer);
ev.feel_2 = new Event(actor.buyer);
ev.fine = new Event(actor.buyer);

var world = new World(place, actor, category, thing, ev);
