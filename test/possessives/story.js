// Curveship-js test of possessives
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

let title = "Possessives Test";

// EXISTENTS: Places, Actors, Things, Categories in that order

place.room = new Place();

actor.john = new Actor(place.room, "male");
actor.mary = new Actor(place.room, "female");
actor.odysseus = new Actor(thing.cosmos, "male");

thing.bike = new Thing(place.room);
thing.bike.owner = actor.mary;
thing.tire = new Thing();
thing.handlebar = new Thing();
thing.seat = new Thing();
thing.bike.setParts([thing.tire, thing.handlebar, thing.seat]);
thing.backpack = new Thing();
thing.backpack.owner = actor.john;
thing.raft = new Thing();
thing.raft.owner = actor.odysseus;

// EVENTS

ev.layDown = new Event(actor.john, thing.bike);
ev.pickUp = new Event(actor.john, thing.backpack);
ev.inspect = new Event(actor.john, [thing.tire, thing.seat]);
ev.swivel = new Event(actor.john, thing.handlebar);
ev.sigh = new Event(actor.mary);
ev.repair = new Event(actor.mary, thing.raft);

var world = new World(place, actor, category, thing, ev);
