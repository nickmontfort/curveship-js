// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "The Prodigal Son";

// EXISTENTS: Places, Actors, Things in that order

place.house = new Place();
place.city = new Place();
place.citizens_field = new Place();
place.rich_field = new Place();
place.front = new Place();

actor.father = new Actor(spatial.in, place.house, "male");
actor.older = new Actor(spatial.in, place.house, "male");
actor.younger = new Actor(spatial.in, place.house, "male");
actor.citizen = new Actor(spatial.in, place.citizens_field, "male");
actor.swine = new Actor(spatial.in, place.citizens_field, "neuter");
actor.servant_1 = new Actor(spatial.in, place.rich_field, "male");
actor.servant_2 = new Actor(spatial.in, place.rich_field, "male");
actor.servant_3 = new Actor(spatial.in, place.rich_field, "male");

thing.inheritance = new Thing(spatial.of, actor.father);
thing.husks = new Thing(spatial.of, actor.cosmos);
thing.robe = new Thing(spatial.of, actor.cosmos);
thing.ring = new Thing(spatial.of, actor.cosmos);
thing.shoes = new Thing(spatial.of, actor.cosmos);
thing.calf = new Thing(spatial.of, actor.cosmos);
thing.riotous = new Thing(spatial.of, actor.cosmos);
thing.music = new Thing(spatial.of, actor.cosmos);

// EVENTS

ev.with_older = new Event([actor.father, actor.older, actor.younger], place.house);
ev.request_inheritance = new Event(actor.younger, thing.inheritance);
ev.give_inheritance = new Event(actor.father, thing.inheritance, temporal.to, actor.younger);
ev.gather_inheritance = new Event(actor.younger, thing.inheritance);
ev.travel = new Event(actor.younger, null, temporal.to, place.city);
ev.waste_inheritance = new Event(actor.younger, thing.inheritance, temporal.by, thing.riotous);
ev.famine = new Event(actor.cosmos);
ev.starve = new Event(actor.younger);
ev.take_job = new Event(actor.younger, null, temporal.for, actor.citizen);
ev.enter_field = new Event(actor.younger, place.citizens_field);
ev.feed_swine = new Event(actor.younger, actor.swine, temporal.using, thing.husks);
ev.hunger = new Event(actor.younger);
ev.said_first = new Event(actor.younger);
ev.said_next = new Event(actor.younger);
ev.travel_to_father = new Event(actor.younger, null, temporal.to, place.front);
ev.see_younger_son = new Event(actor.father, actor.younger);
ev.run_to_younger_son = new Event(actor.father, null, temporal.to, actor.younger);
ev.kiss_younger_son = new Event(actor.father, actor.younger);
ev.said_to_father = new Event(actor.younger, null, temporal.to, actor.father);
ev.said_to_servants = new Event(actor.father, null, temporal.to, [actor.servant_1, actor.servant_2, actor.servant_3]);
ev.entered = new Event([actor.father, actor.older], place.house);
ev.family_danced = new Event([actor.father, actor.older]);
ev.stood = new Event(actor.older, place.house);
ev.heard_music = new Event(actor.older, thing.music);
ev.asked_servants = new Event(actor.older, [actor.servant_1, actor.servant_2, actor.servant_3]);
ev.tell_of_return = new Event([actor.servant_1, actor.servant_2, actor.servant_3], null, temporal.to, actor.older);
ev.became_angry = new Event(actor.older);
ev.refuse_to_enter = new Event(actor.older, place.house);
ev.emerge = new Event(actor.father, place.house, temporal.to, place.rich_field);
ev.complain = new Event(actor.older, null, temporal.to, actor.father);
ev.reply = new Event(actor.father, null, temporal.to, actor.older);


var world = new World(place, actor, category, thing, ev);
