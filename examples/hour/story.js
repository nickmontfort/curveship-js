// The Simulated Bank Robbery - a Curveship-js example
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

actor.louise = new Actor(spatial.in, place.downstairs, "female");
actor.brently = new Actor(spatial.far, place.rail, "male");
actor.richards = new Actor(spatial.in, place.office, "male");
actor.josephine = new Actor(spatial.in, place.downstairs, "female");
actor.doctors = new Actor(spatial.in, actor.cosmos, "male");
actor.peddler = new Actor(spatial.in, actor.cosmos, "male");

thing.train = new Thing(spatial.on, place.rail);
thing.josephinearms = new Thing(spatial.of, actor.josephine);
thing.louisearms = new Thing(spatial.of, actor.louise);
thing.chair = new Thing(spatial.in, place.room);
thing.trees = new Thing(spatial.in, place.outside);
thing.patches = new Thing(spatial.in, place.outside);
thing.clouds = new Thing(spatial.in, place.outside);
thing.unknown = new Thing(spatial.of, actor.cosmos);
thing.pulses = new Thing(spatial.of, actor.louise);
thing.rain = new Thing(spatial.of, place.outside);
thing.air = new Thing(spatial.of, place.outside);
thing.street = new Thing(spatial.of, actor.cosmos);
thing.song = new Thing(spatial.of, actor.cosmos);
thing.sparrow = new Thing(spatial.of, actor.cosmos);
thing.air_features = new Thing(spatial.of, thing.air);
thing.procession = new Thing(spatial.of, actor.louise);
thing.elixir = new Thing(spatial.of, actor.cosmos);
thing.window = new Thing(spatial.of, thing.room);
thing.door = new Thing(spatial.of, thing.room);
thing.f_door = new Thing(spatial.of, thing.room);
thing.latchkey = new Thing(spatial.of, actor.brently);

// EVENTS

ev.shudder = new Event(actor.louise);
ev.crash = new Event(thing.train);
ev.far_away = new Event(actor.brently, null, temporal.from, thing.train);
ev.does_not_know = new Event(actor.brently); // Do, Does not?
ev.learn_of_crash = new Event(actor.richards); // Eng-rel
ev.learn_of_death = new Event(actor.richards); // Fix
ev.confirm_crash = new Event(actor.richards); // Eng-rel
ev.hasten = new Event(actor.richards, null, temporal.to, place.downstairs);
ev.tell_josephine = new Event(actor.richards, actor.josephine); // Eng-rel
ev.tell_mrs_mallard = new Event(actor.josephine, actor.louise); // Eng-rel
ev.is_not_paralyzed = new Event(actor.louise); //Do, Does not?
ev.weep = new Event(actor.louise, null, temporal.into, thing.josephinearms); //ing form
ev.finish_weeping = new Event(actor.louise); // arms were supposed to be part of J?
ev.go_to_room = new Event(actor.louise, null, temporal.to, place.room);
ev.sit_in_chair = new Event(actor.louise, null, temporal.in, thing.chair);
ev.see_trees = new Event(actor.louise, thing.trees, temporal.outside, place.room);
ev.sense_breath_of_rain = new Event(actor.louise, thing.rain, temporal.in, thing.air);
ev.hear_peddler = new Event(actor.louise, actor.peddler, temporal.in, thing.street);
ev.hear_song = new Event(actor.louise, thing.song);
ev.hear_sparrows = new Event(actor.louise, thing.sparrow);
ev.show_through_clouds = new Event(thing.patches, null, temporal.through, thing.clouds);
ev.loll = new Event(actor.louise, null, temporal.on, thing.chair);
ev.sob = new Event(actor.louise);
ev.see_show = new Event(actor.louise, thing.patches); // Eng-rel
ev.stare_at_patches = new Event(actor.louise, null, temporal.at, thing.patches);
ev.wait = new Event(actor.louise, null, temporal.for, thing.unknown);
ev.think_what = new Event(actor.louise);
ev.not_understand = new Event(actor.louise, thing.unknown); //ad-hoc fix adding "it" to the thingness
ev.feels_thing = new Event(actor.louise, thing.unknown);
ev.reach = new Event(thing.unknown, actor.louise, temporal.through, thing.air_features);
ev.breathe = new Event(actor.louise);
ev.begin_to_recognize = new Event(actor.louise, thing.unknown);
ev.resist = new Event(actor.louise, thing.unknown);
ev.say_free = new Event(actor.louise);
ev.look_ahead = new Event(actor.louise);
ev.beat_fast = new Event(thing.pulses); // plural err
ev.see_years = new Event(actor.louise, thing.procession);
ev.open_arms = new Event(actor.louise, thing.louisearms);
ev.whisper_free = new Event(actor.louise); // What to do with quotes?
ev.ask_to_enter = new Event(actor.josephine, place.room);
ev.implore = new Event(actor.josephine, null, temporal.to, actor.louise);
ev.reply = new Event(actor.louise, null, temporal.to, actor.josephine);
ev.drink_elixir = new Event(actor.louise, thing.elixir, temporal.through, thing.window);
ev.pray = new Event(actor.louise);
ev.open_door = new Event(actor.louise, thing.door);
ev.stride_down = new Event(actor.louise, null, temporal.down, place.stairs);
ev.decend = new Event(actor.josephine, place.stairs);
ev.open_front = new Event(actor.brently, thing.f_door, temporal.with, thing.latchkey);
ev.enter_house = new Event(actor.brently, place.downstairs);
ev.cry = new Event(actor.josephine);
ev.stand_amazed_at_cry = new Event(actor.brently); // Eng-rel
ev.try_to_hide = new Event(actor.richards, actor.brently, temporal.from, actor.louise);
ev.stand_amazed_at_hide = new Event(actor.brently);
ev.fall_down = new Event(actor.louise);
ev.die = new Event(actor.louise);
ev.arrive = new Event(actor.doctors, null, temporal.at, place.downstairs);
ev.say_cause = new Event(actor.doctors);

//


var world = new World(place, actor, category, thing, ev);
