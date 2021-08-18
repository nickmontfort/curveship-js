// The Simulated Bank Robbery - a Curveship-js example
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

place.house = new Place();
place.kitchen = new Place();

actor.john = new Actor(place.house, "male");
actor.doug = new Actor(place.house, "male");

thing.whale = new Thing();
thing.note = new Thing();
thing.mouth = new Thing(thing.whale);
thing.breath = new Thing();
thing.book = new Thing();
thing.violin = new Thing(actor.john);
thing.violin.setOwner(actor.john);
thing.couch = new Thing();
thing.music = new Thing();
thing.sound = new Thing(thing.whale);
thing.knife = new Thing(place.kitchen);
thing.hour = new Thing();
thing.card = new Thing();
thing.hands = new Thing(actor.doug);
thing.eyes = new Thing();

// EVENTS

ev.stand = new Event(actor.john);
ev.move = new Event(actor.john, null, temporal.to, thing.whale);
ev.stick = new Event(thing.note, null, temporal.to, thing.mouth);
ev.note_content = new Event(thing.note);
ev.read_note = new Event(actor.john, thing.note);
ev.stare = new Event(actor.john, thing.whale);
ev.breathe = new Event(actor.doug, thing.breath);
ev.pick_up = new Event(actor.doug, thing.book);
ev.talk = new Event(actor.doug, null, temporal.to, actor.john);
ev.nothing = new Event(actor.john) //, null, temporal.to, actor.doug);
ev.argue = new Event(actor.doug) //, null, temporal.at, actor.john);
ev.pick_up_violin = new Event(actor.john, thing.violin, temporal.from, thing.couch);
ev.play_violin = new Event(actor.john, thing.violin);
ev.whisper = new Event(actor.john);
ev.raise = new Event(thing.music);
ev.stop_music = new Event(thing.sound, thing.music);
ev.stare_2 = new Event([actor.john, actor.doug], thing.whale);
ev.shake = new Event(thing.whale);
ev.shake_ap = new Event(thing.sound, place.house);
ev.stop = new Event(thing.whale);
ev.blow = new Event(thing.whale);
ev.play_violin_2 = new Event(actor.john);
ev.no_resp = new Event(thing.whale);
ev.talk_3 = new Event(actor.doug);
ev.pick_up_knife = new Event(actor.doug, thing.knife, temporal.from, place.kitchen);
ev.stab = new Event(actor.doug, thing.whale);
ev.close = new Event(actor.john, thing.eyes);
ev.enter = new Event(actor.doug, thing.whale);
ev.pass = new Event(thing.hour);
ev.out = new Event(actor.doug, thing.whale);
ev.bloody = new Event(actor.doug);
ev.summon = new Event(actor.doug, actor.john);
ev.card = new Event(actor.doug, thing.card, temporal.in, thing.hands);
ev.stare_3 = new Event([actor.doug, actor.john], thing.card);
ev.card_content = new Event(thing.card);

var world = new World(place, actor, category, thing, ev);
