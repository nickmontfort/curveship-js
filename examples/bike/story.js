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

actor.man = new Actor(spatial.in, place.street, "male");

thing.bike = new Thing(spatial.in, place.street);
thing.tire = new Thing(spatial.in, place.street);
thing.handlebar = new Thing(spatial.in, place.street);
thing.seat = new Thing(spatial.in, place.street);
thing.shell = new Thing(spatial.in, place.street);
thing.cover = new Thing(spatial.in, place.street);


thing.bike.setParts([thing.tire, thing.handlebar, thing.seat]);
thing.seat.setParts([thing.shell, thing.cover]);



// EVENTS

ev.see1 = new Event(actor.man, thing.bike);
ev.see2 = new Event(actor.man, [thing.tire, thing.seat, thing.handlebar, thing.shell]);
ev.see3 = new Event(actor.man, [thing.shell, thing.cover]);


var world = new World(place, actor, category, thing, ev);
