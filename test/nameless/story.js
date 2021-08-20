// Curveship-js test of naming fallback
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

let title = "Missing Names Test";

// EXISTENTS: Places, Actors, Things, Categories in that order

place.room = new Place();

actor.hero = new Actor(place.room, "male");
actor.heroine = new Actor(place.room, "female");
actor.littleMan = new Actor(place.room, "male", "child");
actor.littleWoman = new Actor(place.room, "female", "child");

thing.ball = new Thing(place.room);
thing.apple = new Thing(place.room);
thing.cherry = new Thing(place.room);
thing.strawberry = new Thing(place.room);
thing.blueberry = new Thing(place.room);

category.fruit = new Category();
category.apple = new Category([thing.apple], category.fruit);
category.berry = new Category([thing.cherry, thing.strawberry, thing.blueberry], category.fruit);

// EVENTS

ev.see = new Event(actor.heroine, place.room);
ev.taunt = new Event(actor.littleMan, actor.littleWoman);
ev.sigh = new Event(actor.heroine);
ev.throw = new Event(actor.littleWoman, thing.ball);
ev.catch = new Event(actor.littleMan, thing.ball);
ev.give = new Event(actor.heroine, thing.apple, temporal.to, actor.hero);
ev.eat = new Event(actor.hero, [thing.cherry, thing.strawberry]);

var world = new World(place, actor, category, thing, ev);
