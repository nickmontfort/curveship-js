// Henny Penny by Angela Chang- a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "Henny Penny";

// EXISTENTS: Places, Actors, Things in that order

// PLACES

place.farmyard = new Place();
place.barn = new Place();
place.lake = new Place();
place.river = new Place();
place.forest = new Place();
place.cave = new Place();
place.tree = new Place();

// ACTORS

actor.henny = new Actor(place.farmyard, "female");
actor.rooster = new Actor(place.barn, "male");
actor.duck = new Actor(place.lake, "male");
actor.goose = new Actor(place.river, "female");
actor.turkey = new Actor(place.forest, "male");
actor.fox = new Actor(place.cave, "male");

category.crowd = new Category([actor.henny,
	actor.rooster,actor.duck,actor.goose,
	actor.turkey]);

// THINGS

thing.nut = new Thing(place.farmyard);
thing.head = new Thing(actor.henny);


// EVENTS
ev.hit = new Event(thing.nut,actor.henny,temporal.on, thing.head);
ev.decides = new Event(actor.henny);
ev.ranc = new Event([actor.henny,actor.rooster,actor.duck,actor.goose,actor.turkey],null,temporal.by,place.cave);
ev.meetf =new Event(actor.henny,actor.fox,temporal.by,place.cave);
ev.greetf=new Event(actor.fox);
ev.cry5 = new Event(actor.henny);
ev.foxhit=new Event(actor.cosmos);
ev.cry6 = new Event(actor.fox);
ev.refute = new Event(actor.henny);
ev.laugh = new Event(category.crowd,actor.fox);

var world = new World(place, actor, category, thing, ev);
