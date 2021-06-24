// The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "Fruit Eating";

// EXISTENTS: Places, Actors, Things, Categories in that order

place.room = new Place();

actor.eater = new Actor(place.room, "male");

thing.apple = new Thing(place.room);
thing.strawberry = new Thing(place.room);
thing.cherry = new Thing(place.room);

category.fruit = new Category();
category.galaApple = new Category(
  [thing.apple],
  category.fruit);
category.berries = new Category(
  [thing.cherry, thing.strawberry],
  category.fruit
);
category.fruit.addProperties(["skin"]);

category.human = new Category(
  [actor.eater]);
category.human.addProperties(["skin"]);


// EVENTS

ev.eatBerries = new Event(actor.eater, [thing.strawberry, thing.cherry]);
ev.eat = new Event(actor.eater, [thing.apple, thing.cherry]);
ev.eatApple = new Event(actor.eater, thing.apple);
ev.eatSelf = new Event(actor.eater, [thing.apple, thing.cherry, actor.eater]);

// WORLD joining all existents and events together

var world = new World(place, actor, category, thing, ev);
