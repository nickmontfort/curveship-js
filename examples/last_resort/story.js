// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

var title = "The Last Resort";

/*
dragon wakes up early, hes got places to be
knight goes looking for a dragon to kill
dragon packs his things and heads out
knight travels far and wide
knight is losing hope, he is lost and desparate

the dragon checks into the resort and orders a pina colada from the bartender
the knight follows signs for a resort
the knight orders a drink from the bartender
the knight sits down at the bar next to a scaly man
the dragon says, "you look like you've had a long day" and buys him a round

*/


// EXISTENTS: Places, Actors, Things in that order

place.resort_bar = new Place();
place.the_land = new Place();
place.cave = new Place();

actor.dragon = new Actor(place.vestibule, "female");
actor.knight = new Actor(place.street, "male");
actor.bartender = new Actor(place.guardPost, "male");

thing.things = new Thing(place.cave);
thing.hope = new Thing(place.the_land);
thing.pina_colada = new Thing(actor.bartender);
thing.far_and_wide = new Thing(actor.knight);
thing.signs = new Thing(place.the_land);
thing.round = new Thing(place.resort_bar);

// EVENTS

ev.wake_up = new Event(actor.dragon);                       // 1
ev.looking = new Event(actor.knight, actor.dragon);         // 2
ev.packs = new Event(actor.dragon, thing.things);           // 3
ev.travels = new Event(actor.knight, place.the_land);                       // 4
ev.loses_hope = new Event(actor.knight, thing.hope);        // 5
ev.d_checks_in = new Event(actor.dragon, place.resort);     // 6
ev.d_orders = new Event(actor.dragon, thing.pina_colada);   // 7

ev.k_follows = new Event(actor.knight, thing.signs);        // 8
ev.k_sits_next_to = new Event(actor.knight, actor.dragon, place.bar); // 9

ev.says = new Event(actor.dragon,actor.knight);            // 10
ev.buys_round = new Event(actor.dragon, actor.knight, thing.pina_colada); // 11

var world = new World(place, actor, category, thing, ev);
