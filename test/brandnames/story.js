// Curveship-js test of spin changes
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var title = "Brand Names Test";

// EXISTENTS: Places, Actors, Things in that order

actor.jack = new Actor(null, "male");
actor.molly = new Actor(null, "female");

thing.soda = new Thing();
thing.car = new Thing();
thing.car.setOwner(actor.molly);
thing.cloth = new Thing();
thing.chair = new Thing();
thing.knife = new Thing();
thing.meat = new Thing();

// EVENTS

ev.drink = new Event(actor.jack, thing.soda);
ev.dream = new Event(actor.jack, null, temporal.of, thing.car);
ev.wear = new Event(actor.jack, thing.cloth);
ev.stab = new Event(actor.jack, thing.meat);
ev.cook = new Event(actor.jack, thing.meat);
ev.grab = new Event(actor.jack, thing.chair);
ev.enjoy = new Event(actor.jack, actor.molly);


var world = new World(place, actor, category, thing, ev);
