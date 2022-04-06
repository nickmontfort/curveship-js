// Waiting for Godot - Hat Scene
// Author: Kitty Zeng

var = title = "Waiting for Godot with Hats";

// EXISTENTS: Places, Actors, Things in that order

// Places:
place.road = new Place();
place.ground = new Place();

// Actors:
actor.pozzo = new Actor(place.road, "male");
actor.lucky = new Actor(place.road, "male");

// Things:

// objects
thing.hat = new Thing(thing.luckysHead);

// EVENTS
ev.ask = new Event(actor.pozzo, "That was nearly sixty years ago...you wouldn't think it to look at me, would you? Compared to him I look like a young man, no?", temporal.to, actor.lucky);
ev.exclaim = new Event(actor.pozzo, "Hat!", temporal.to, actor.lucky);
ev.takeOffLucky = new Event(actor.lucky, thing.hat, temporal.from, actor.lucky.head);
ev.hairFall = new Event(actor.lucky.hair);
ev.dropHat = new Event(actor.lucky, thing.hat, temporal.to, place.ground);
ev.pickUp = new Event(actor.pozzo, thing.hat, temporal.from, place.ground);
ev.putOnPozzo = new Event(actor.pozzo, thing.hat, temporal.on, actor.pozzo.head);

var world = new World(place, actor, category, thing, ev);
