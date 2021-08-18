// A Whale In Brookline written by Ardalan SadeghiKivi - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py.

let title = "A Whale In Brookline";

// EXISTENTS: Places, Actors, Things in that order

// PLACES

place.house = new Place();

// ACTORS

actor.john = new Actor(place.house, "male");
actor.doug = new Actor(place.house, "male");

// THINGS

thing.whale = new Thing();
thing.violin = new Thing(actor.john);
thing.violin.setOwner(actor.john);
thing.music = new Thing();
thing.sound = new Thing(thing.whale);
thing.card = new Thing();
thing.hands = new Thing(actor.doug);

// EVENTS

ev.play_violin = new Event(actor.john, thing.violin);
ev.whisper = new Event(actor.john);
ev.stop_music = new Event(thing.sound, thing.music);
ev.talk_3 = new Event(actor.doug);
ev.stab = new Event(actor.doug, thing.whale);
ev.enter = new Event(actor.doug, thing.whale);
ev.out = new Event(actor.doug);
ev.card = new Event(actor.doug, thing.card, temporal.in, thing.hands);
ev.stare_3 = new Event([actor.doug, actor.john], thing.card);
ev.card_content = new Event(thing.card);

var world = new World(place, actor, category, thing, ev);
