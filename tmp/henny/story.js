// Henny Penny - a Curveship-js example
// Copyright 2021 Angela Chang
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.
// Adapted from text https://archive.org/stream/HennyPenny/Henny%20Penny_djvu.txt

let title = "Henny Penny";

// EXISTENTS: Places, Actors, Things in that order

place.farmyard = new Place();
place.barn = new Place();
place.lake = new Place();
place.river = new Place();
place.forest = new Place();
place.cave = new Place();
place.tree = new Place()

actor.henny = new Actor(place.farmyard, "female");
actor.rooster = new Actor(place.barn, "male");
actor.duck = new Actor(place.lake, "male");
actor.goose = new Actor(place.river, "female");
actor.turkey = new Actor(place.forest, "male");
actor.fox = new Actor(place.cave, "male");

category.crowd = new Category([actor.henny,
	actor.rooster,actor.duck,actor.goose,
	actor.turkey]);

thing.nut = new Thing(place.farmyard);
thing.head = new Thing(actor.henny);
thing.head2 = new Thing(actor.fox);
// EVENTS
//how to add "in the farmyard preamble?"
ev.hit = new Event(thing.nut,actor.henny,temporal.on, thing.head);
ev.decides = new Event(actor.henny);
ev.ranc = new Event([actor.henny,actor.rooster,actor.duck,actor.goose,actor.turkey],null,temporal.by,place.cave);
//subject verb agreement when using categories
ev.meetf =new Event(category.crowd,actor.fox);
ev.cry = new Event(actor.henny);
ev.invite = new Event(actor.fox);
ev.hitfox= new Event(thing.nut,actor.fox,temporal.on,thing.head2);
ev.cry6 = new Event(actor.fox);
ev.refute = new Event(actor.henny);
ev.laugh = new Event(category.crowd,actor.fox);

var world = new World(place, actor, category, thing, ev);
