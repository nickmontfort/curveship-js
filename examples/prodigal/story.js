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
place.citizensField = new Place();
place.richField = new Place();
place.front = new Place();

actor.father = new Actor(place.house, "male");
actor.older = new Actor(place.house, "male");
actor.younger = new Actor(place.house, "male");
actor.citizen = new Actor(place.citizensField, "male");
actor.servant1 = new Actor(place.richField, "male");
actor.servant2 = new Actor(place.richField, "male");
actor.servant3 = new Actor(place.richField, "male");

thing.inheritance = new Thing(actor.father);
thing.inheritance.setOwner(actor.younger);
thing.swine = new Thing(place.citizensField);
thing.swine.setOwner(actor.citizen);
thing.husks = new Thing();
thing.robe = new Thing();
thing.ring = new Thing();
thing.shoes = new Thing();
thing.calf = new Thing();
thing.riotous = new Thing();
thing.music = new Thing();

// EVENTS

ev.withOlder = new Event([actor.father, actor.older, actor.younger], place.house);
ev.requestInheritance = new Event(actor.younger, thing.inheritance);
ev.giveInheritance = new Event(actor.father, thing.inheritance, temporal.to, actor.younger);
ev.gatherInheritance = new Event(actor.younger, thing.inheritance);
ev.travel = new Event(actor.younger, null, temporal.to, place.city);
ev.wasteInheritance = new Event(actor.younger, thing.inheritance, temporal.by, thing.riotous);
ev.famine = new Event();
ev.starve = new Event(actor.younger);
ev.takeJob = new Event(actor.younger, null, temporal.for, actor.citizen);
ev.enterField = new Event(actor.younger, place.citizensField);
ev.feedSwine = new Event(actor.younger, actor.swine, temporal.using, thing.husks);
ev.hunger = new Event(actor.younger);
ev.saidFirst = new Event(actor.younger);
ev.saidNext = new Event(actor.younger);
ev.travelToFather = new Event(actor.younger, null, temporal.to, place.front);
ev.seeYoungerSon = new Event(actor.father, actor.younger);
ev.runToYoungerSon = new Event(actor.father, null, temporal.to, actor.younger);
ev.kissYoungerSon = new Event(actor.father, actor.younger);
ev.saidToFather = new Event(actor.younger, null, temporal.to, actor.father);
ev.saidToServants = new Event(actor.father, null, temporal.to, [actor.servant1, actor.servant2, actor.servant3]);
ev.entered = new Event([actor.father, actor.older], place.house);
ev.familyDanced = new Event([actor.father, actor.older]);
ev.stood = new Event(actor.older, place.house);
ev.heardMusic = new Event(actor.older, thing.music);
ev.askedServants = new Event(actor.older, [actor.servant1, actor.servant2, actor.servant3]);
ev.tellOfReturn = new Event([actor.servant1, actor.servant2, actor.servant3], null, temporal.to, actor.older);
ev.becameAngry = new Event(actor.older);
ev.refuseToEnter = new Event(actor.older, place.house);
ev.emerge = new Event(actor.father, place.house, temporal.to, place.richField);
ev.complain = new Event(actor.older, null, temporal.to, actor.father);
ev.reply = new Event(actor.father, null, temporal.to, actor.older);

var world = new World(place, actor, category, thing, ev);
