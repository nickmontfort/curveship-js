// first week creative work for modeling two literary styles
// author: Kitty Zeng

var title = "Slots";

// EXISTENTS: Places, Actors, Things in that order

place.casino = new Place();

actor.attendant = new Actor(place.casino, "male");
actor.gambler = new Actor(place.street, "male");
actor.addict = new Actor(place.casino, "female");

thing.machine = new Thing(place.casino);
thing.platter = new Thing(actor.guard);
thing.slots = new Thing(actor.addict);
thing.brain = new Thing(actor.gambler);
thing.newSlots = new Thing(thing.machine);

// EVENTS

ev.arrive = new Event(actor.gambler, place.casino);
ev.chooseMachine = new Event(actor.gambler, thing.machine);
ev.attendantAsk = new Event(actor.attendant, "Stop. If you want to play, you must first pay.", temporal.to, actor.gambler);
ev.attendantOffer = new Event(actor.attendant, thing.platter, temporal.to, actor.gambler);
ev.addictInterrupt = new Event(actor.addict, null, temporal.at, thing.slots);
ev.gamblerLook = new Event(actor.gambler, null, temporal.for, thing.slots);
ev.transferBrain = new Event(actor.gambler, thing.brain, temporal.on, thing.platter);
ev.attendantSmile = new Event(actor.attendant, null, temporal.at, actor.gambler);
ev.dismiss = new Event(actor.gambler, "Leave me alone. I want to be alone.", temporal.to, actor.attendant);
ev.beginPlay = new Event(actor.gambler, thing.newSlots);

var world = new World(place, actor, category, thing, ev);
