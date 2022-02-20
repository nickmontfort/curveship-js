// Beware of the Deep Blue Sea - a Curveship-js example
//  Copyright 2022 Ardalan SadeghiKivi
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

var title = "Beware of the Deep Blue Sea";

// EXISTENTS: Places, Actors, Things in that order

place.sea = new Place();
place.shore = new Place();
place.home = new Place();

actor.ghost = new Actor(place.home, "female");
actor.urashima = new Actor(place.sea, "male");
actor.fairy = new Actor(place.sea, "female");
actor.person = new Actor(place.shore, "male");

thing.box = new Thing(actor.fairy);
thing.box.setOwner(actor.fairy);
thing.youth = new Thing(actor.urashima);
thing.youth.setOwner(actor.urashima);
thing.air = new Thing(actor.cosmos);


// EVENTS

ev.reply = new Event(actor.urashima, "Just this night", temporal.to, actor.fairy);
ev.back = new Event(actor.fairy, actor.urashima, temporal.to, place.shore);
ev.back.alters(actor.urashima, "location", place.sea, place.shore);
ev.bestow = new Event(actor.fairy, thing.box, temporal.to, actor.urashima);
ev.bestow.alters(thing.box, "owner", actor.fairy, actor.urashima);
ev.return = new Event(actor.urashima, place.home);
ev.torn = new Event(place.home);
ev.walk = new Event(actor.person);
ev.ask = new Event(actor.urashima, "Do you know what happened to this place and its tenants?", temporal.from, actor.person);
ev.respond = new Event(actor.person, "Legends say that one day, the father of the household, a fisherman, left to the sea and never returned. The winter was brutal, and they were out of supplies. The fisherman's wife and young son froze to death, no one claimed the house for years, and it gradually fell apart");
ev.startle = new Event(actor.urashima);
ev.returnSea = new Event(actor.urashima, null, temporal.to, place.sea);
ev.returnSea.alters(actor.urashima, "location", place.shore, place.sea);
ev.open = new Event(actor.urashima, thing.box);
ev.perish = new Event(thing.youth, null, temporal.to, thing.air);
ev.perish.alters(thing.youth, "owner", actor.urashima, actor.fairy);
ev.fade = new Event(actor.urashima, null, temporal.in, place.sea);

var world = new World(place, actor, category, thing, ev);
