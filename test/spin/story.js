// Curveship-js test of spin changes
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var title = "Spin Test";

// EXISTENTS: Places, Actors, Things in that order

place.room = new Place();

actor.mary = new Actor(place.room, "female");
actor.bill = new Actor(place.room, "male");
actor.john = new Actor(place.room, "male");
actor.jimmy = new Actor(place.room, "male", "child");

// EVENTS

ev.lookAround = new Event(actor.john);
ev.play = new Event(actor.jimmy);
ev.greet = new Event(actor.john, actor.mary);
ev.interrupt = new Event(actor.bill, [actor.john, actor.mary]);

var world = new World(place, actor, category, thing, ev);
