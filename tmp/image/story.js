// The Birth of Image written by Ardalan SadeghiKivi - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var title = "The Birth of Image";

// EXISTENTS: Places, Actors, Things in that order

place.image = new Place();

// THINGS

actor.dragon = new Actor(place.image, "neuter");

thing.water = new Thing();

// EVENTS

ev.live = new Event(actor.dragon, null, temporal.in, place.image);
ev.burn = new Event(place.image);
ev.birth = new Event(place.image, actor.dragon);
ev.melt = new Event(actor.dragon, place.image);
ev.drink = new Event(actor.dragon, thing.water);
ev.become = new Event(actor.dragon, place.image);


var world = new World(place, actor, category, thing, ev);
