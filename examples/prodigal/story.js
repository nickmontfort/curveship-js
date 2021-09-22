// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

var title = "The Prodigal Son";

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

category.servant = new Category([actor.servant1, actor.servant2, actor.servant3]);

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
ev.thinkFirst = new Event(actor.younger, "how many hired servants of my father’s have bread enough and to spare, and I perish with hunger!");
ev.thinkNext = new Event(actor.younger, "I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son: make me as one of thy hired servants");
ev.travelToFather = new Event(actor.younger, null, temporal.to, place.front);
ev.seeYoungerSon = new Event(actor.father, actor.younger);
ev.runToYoungerSon = new Event(actor.father, null, temporal.to, actor.younger);
ev.kissYoungerSon = new Event(actor.father, actor.younger);
ev.sayToFather = new Event(actor.younger, "father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son", temporal.to, actor.father);
ev.sayToServants = new Event(actor.father, "bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: and bring hither the fatted calf, and kill it; and let us eat, and be merry: for this my son was dead, and is alive again; he was lost, and is found", temporal.to, [actor.servant1, actor.servant2, actor.servant3]);
ev.enter = new Event([actor.father, actor.older], place.house);
ev.dance = new Event([actor.father, actor.older]);
ev.stand = new Event(actor.older, place.house);
ev.hearMusic = new Event(actor.older, thing.music);
ev.askServants = new Event(actor.older, [actor.servant1, actor.servant2, actor.servant3]);
ev.tellOfReturn = new Event([actor.servant1, actor.servant2, actor.servant3], "thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound", temporal.to, actor.older);
ev.becomeAngry = new Event(actor.older);
ev.refuseToEnter = new Event(actor.older, place.house, null, null, true);
ev.emerge = new Event(actor.father, place.house, temporal.to, place.richField);
ev.complain = new Event(actor.older, "lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends: but as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf", temporal.to, actor.father);
ev.reply = new Event(actor.father, "son, thou art ever with me, and all that I have is thine", temporal.to, actor.older);
ev.continueReply = new Event(actor.father, "it was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found", temporal.to, actor.older);

var world = new World(place, actor, category, thing, ev);
