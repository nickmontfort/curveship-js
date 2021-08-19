// Curveship-js test of grouping
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

let title = "Grouping Test";

// EXISTENTS: Places, Actors, Things, Categories in that order

place.room = new Place();

actor.john = new Actor(place.room, "male");

thing.bike = new Thing(place.room);
thing.tire = new Thing();
thing.handlebar = new Thing();
thing.seat = new Thing();
thing.shell = new Thing();
thing.cover = new Thing();

thing.bike.setParts([thing.tire, thing.handlebar, thing.seat]);
thing.seat.setParts([thing.shell, thing.cover]);

thing.apple = new Thing(place.room);
thing.cherry = new Thing(place.room);
thing.strawberry = new Thing(place.room);
thing.blueberry = new Thing(place.room);

category.fruit = new Category();
category.fujiApple = new Category([thing.apple], category.fruit);
category.fujiApple.addProperties(["red"]);
category.berries = new Category([thing.cherry, thing.strawberry, thing.blueberry], category.fruit);
category.cherries = new Category([thing.cherry], category.berries);
category.cherries.addProperties(["red"]);
category.strawberry = new Category([thing.strawberry], category.berries);
category.strawberry.addProperties(["red"]);
category.blueberries = new Category([thing.blueberry], category.berries);
category.blueberries.addProperties(["blue"]);

category.human = new Category([actor.john]);

// EVENTS

ev.dismount = new Event(actor.john, thing.bike);
ev.inspect = new Event(actor.john, [thing.tire, thing.seat, thing.handlebar, thing.shell]);
ev.touch = new Event(actor.john, [thing.shell, thing.cover]);
ev.ogle = new Event(actor.john, [thing.strawberry, thing.cherry]);

// TODO things must be removed after they are consumed
// avoid nonsensical events in examples/testing

ev.lick = new Event(actor.john, [thing.apple, thing.cherry, thing.strawberry]);
ev.sniff = new Event(actor.john, thing.apple);
ev.eat = new Event(actor.john, [thing.apple, thing.cherry, thing.blueberry]);

// TODO replace nonsensical self-eating with a more sensible event

var world = new World(place, actor, category, thing, ev);
