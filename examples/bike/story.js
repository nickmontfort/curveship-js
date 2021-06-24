// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "Bike";

// EXISTENTS: Places, Actors, Things in that order

place.street = new Place();

actor.man = new Actor(place.street, "male");

thing.bike = new Thing(place.street);
thing.tire = new Thing();
thing.handlebar = new Thing();
thing.seat = new Thing();
thing.shell = new Thing();
thing.cover = new Thing();

thing.bike.setParts([thing.tire, thing.handlebar, thing.seat]);
thing.seat.setParts([thing.shell, thing.cover]);


// EVENTS

ev.see1 = new Event(actor.man, thing.bike);
ev.see2 = new Event(actor.man, [thing.tire, thing.seat, thing.handlebar, thing.shell]);
ev.see3 = new Event(actor.man, [thing.shell, thing.cover]);


var world = new World(place, actor, category, thing, ev);
