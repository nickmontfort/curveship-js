// The Story of an Hour - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "The Story of an Hour";

// EXISTENTS: Places, Actors, Things in that order

place.downstairs = new Place();
place.office = new Place();
place.room = new Place();
place.stairs = new Place();
place.outside = new Place();
place.rail = new Place();

actor.louise = new Actor(place.downstairs, "female");
actor.brently = new Actor(place.rail, "male");
actor.richards = new Actor(place.office, "male");
actor.josephine = new Actor(place.downstairs, "female");
actor.doctor1 = new Actor(null, "male");
actor.doctor2 = new Actor(null, "male");
actor.peddler = new Actor(null, "male");

thing.train = new Thing(place.rail);
thing.josephinesArms = new Thing(actor.josephine);
thing.josephinesArms.owner = actor.josephine;
  // FIXME should really a part, and two singular parts!
thing.louisesArms = new Thing(actor.louise);
thing.louisesArms.owner = actor.louise;
  // FIXME should really a part, and two singular parts!
thing.chair = new Thing(place.room);
thing.trees = new Thing(place.outside);
thing.patches = new Thing(place.outside);
thing.clouds = new Thing(place.outside);
thing.unknown = new Thing(null);
thing.pulses = new Thing(actor.louise);
thing.rain = new Thing(place.outside);
thing.air = new Thing(place.outside);
thing.street = new Thing(place.outside);
thing.song = new Thing(thing.cosmos);
thing.sparrow = new Thing(thing.cosmos);
thing.airFeatures = new Thing(thing.air);
thing.procession = new Thing(actor.louise);
thing.elixir = new Thing(thing.cosmos);
thing.window = new Thing(thing.room);
thing.door = new Thing(thing.room);
thing.frontDoor = new Thing(thing.room);
thing.latchkey = new Thing(actor.brently);

// EVENTS

ev.shudder = new Event(actor.louise);
ev.crash = new Event(thing.train);
ev.farAway = new Event(actor.brently, null, temporal.from, thing.train);
ev.doesNotKnow = new Event(actor.brently, ev.crash); // Do, Does not?
ev.learnOfCrash = new Event(actor.richards, ev.crash); // Eng_rel
ev.learnOfDeath = new Event(actor.richards); // Fix
ev.confirmCrash = new Event(actor.richards); // EngRel
ev.hasten = new Event(actor.richards, null, temporal.to, place.downstairs);
ev.tellJosephine = new Event(actor.richards, actor.josephine); // EngRel
ev.tellMrsMallard = new Event(actor.josephine, actor.louise); // EngRel
ev.isNotParalyzed = new Event(actor.louise); //Do, Does not?
ev.weep = new Event(actor.louise, null, temporal.into, thing.josephinesArms); //ing form
ev.finishWeeping = new Event(actor.louise); // arms were supposed to be part of J?
ev.goToRoom = new Event(actor.louise, null, temporal.to, place.room);
ev.sitInChair = new Event(actor.louise, null, temporal.in, thing.chair);
ev.seeTrees = new Event(actor.louise, thing.trees, temporal.outside, place.room);
ev.senseBreathOfRain = new Event(actor.louise, thing.rain, temporal.in, thing.air);
ev.hearPeddler = new Event(actor.louise, actor.peddler, temporal.in, thing.street);
ev.hearSong = new Event(actor.louise, thing.song);
ev.hearSparrows = new Event(actor.louise, thing.sparrow);
ev.showThroughClouds = new Event(thing.patches, null, temporal.through, thing.clouds);
ev.loll = new Event(actor.louise, null, temporal.on, thing.chair);
ev.sob = new Event(actor.louise);
ev.seeShow = new Event(actor.louise, thing.patches); // EngRel
ev.stareAtPatches = new Event(actor.louise, null, temporal.at, thing.patches);
ev.wait = new Event(actor.louise, null, temporal.for, thing.unknown);
ev.thinkWhat = new Event(actor.louise);
ev.notUnderstand = new Event(actor.louise, thing.unknown); //adHoc fix adding "it" to the thingness
ev.feelsThing = new Event(actor.louise, thing.unknown);
ev.reach = new Event(thing.unknown, actor.louise, temporal.through, thing.airFeatures);
ev.breathe = new Event(actor.louise);
ev.beginToRecognize = new Event(actor.louise, thing.unknown);
ev.resist = new Event(actor.louise, thing.unknown);
ev.sayFree = new Event(actor.louise);
ev.lookAhead = new Event(actor.louise);
ev.beatFast = new Event(thing.pulses); // plural err
ev.seeYears = new Event(actor.louise, thing.procession);
ev.openArms = new Event(actor.louise, thing.louisesArms);
ev.whisperFree = new Event(actor.louise); // What to do with quotes?
ev.askToEnter = new Event(actor.josephine, place.room);
ev.implore = new Event(actor.josephine, null, temporal.to, actor.louise);
ev.reply = new Event(actor.louise, null, temporal.to, actor.josephine);
ev.drinkElixir = new Event(actor.louise, thing.elixir, temporal.through, thing.window);
ev.pray = new Event(actor.louise);
ev.openDoor = new Event(actor.louise, thing.door);
ev.strideDown = new Event(actor.louise, null, temporal.down, place.stairs);
ev.decend = new Event(actor.josephine, place.stairs);
ev.openFront = new Event(actor.brently, thing.fDoor, temporal.with, thing.latchkey);
ev.enterHouse = new Event(actor.brently, place.downstairs);
ev.cry = new Event(actor.josephine);
ev.standAmazedAtCry = new Event(actor.brently); // EngRel
ev.tryToHide = new Event(actor.richards, actor.brently, temporal.from, actor.louise);
ev.standAmazedAtHide = new Event(actor.brently);
ev.fallDown = new Event(actor.louise);
ev.die = new Event(actor.louise);
ev.arrive = new Event([actor.doctor1, actor.doctor2], null, temporal.at, place.downstairs); // FIXME
ev.sayCause = new Event([actor.doctor1, actor.doctor2]); // FIXME

var world = new World(place, actor, category, thing, ev);
