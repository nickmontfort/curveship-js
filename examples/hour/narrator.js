// Casual Narrator for the Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var spin = {
  // i: teller,
};

var told_by = "a casual, very oblique narrator";

names = {};


// PLACES

names.downstairs = new Names("downstairs", "the Mallard house");
names.office = new Names("the newspaper office");
names.room = new Names("the room");
names.stairs = new Names("the stairs");
names.outside = new Names("outside", "outside the Mallard house");
names.rail = new Names("a rail line");

// ACTORS

names.louise = new ProperNames("Louise", "Mallard", pronoun.female, "the wife", "Mrs.");
names.brently = new ProperNames("Brently", "Mallard", pronoun.male, "the husband", "Mr.");
names.richards = new ProperNames("Richards", "", pronoun.male, "the friend");
names.josephine = new ProperNames("Josephine", "", pronoun.female, "the sister");
names.doctor1 = new Names("the doctor", "", pronoun.male);
names.doctor2 = new Names("the doctor", "", pronoun.male);
names.peddler = new Names("a peddler");


// THINGS

names.train = new Names("a train", "the iron horse");
names.josephinearms = new Names("arms");
names.louisearms = new Names("arms");
names.chair = new Names("a comfortable chair", "a chair");
names.trees = new Names("some trees");
names.patches = new Names("some patches of blue sky");
names.clouds = new Names("the clouds");
names.unknown = new Names("some unknown thing", "the unknown thing");
names.pulses = new Names("pulses");
names.rain = new Names("the delicious breath of rain");
names.air = new Names("the air");
names.air_features = new Names("the sounds, the scents, the colors of the air");
names.procession = new Names("a procession of years that would belong to her absolutely");
names.door = new Names("the door");
names.f_door = new Names("the front door");
names.latchkey = new Names("a latchkey");
names.street = new Names("the street below");
names.song = new Names("the notes of a distant song");
names.sparrow = new Names("countless sparrows twittering");
names.elixir = new Names("the very elixir of life");
names.window = new Names("the open window");

// EVENTS

vp = {};

vp.shudder = new VerbPh("shudder to think that life might be long");
vp.crash = new VerbPh("crash");
// vp.far_away = new VerbPh("is far away");
// vp.does_not_know = new VerbPh("do not know");
vp.learn_of_crash = new VerbPh("learn");
vp.learn_of_death = new VerbPh("see Brently Mallard listed as dead");
vp.confirm_crash = new VerbPh("confirm");
vp.hasten = new VerbPh("hasten");
vp.tell_josephine = new VerbPh("tell");
// vp.tell_mrs_mallard = new VerbPh("tell");
// vp.is_not_paralyzed = new VerbPh("do not become paralyzed");
// vp.weep = new VerbPh("weep");
// vp.finish_weeping = new VerbPh("finish weeping");
// vp.go_to_room = new VerbPh("go");
// vp.sit_in_chair = new VerbPh("sit");
// vp.see_trees = new VerbPh("see");
// vp.sense_breath_of_rain = new VerbPh("sense");
// vp.hear_peddler = new VerbPh("hear");
// vp.hear_song = new VerbPh("hear");
// vp.hear_sparrows = new VerbPh("hear");
// vp.show_through_clouds = new VerbPh("show");
// vp.loll = new VerbPh("loll");
// vp.sob = new VerbPh("sob");
// vp.see_show = new VerbPh("see");
// vp.stare_at_patches = new VerbPh("stare");
// vp.wait = new VerbPh("wait");
// vp.think_what = new VerbPh("think 'What is it?'");
// vp.not_understand = new VerbPh("do not undertand");
// vp.feels_thing = new VerbPh("feel");
// vp.reach = new VerbPh("reach");
// vp.breathe = new VerbPh("breathe");
// vp.begin_to_recognize = new VerbPh("begin to recognize");
// vp.resist = new VerbPh("resist");
// vp.say_free = new VerbPh("say 'Free! Free! Free!'");
// vp.look_ahead = new VerbPh("look ahead");
// vp.beat_fast = new VerbPh("beat");
// vp.see_years = new VerbPh("see");
// vp.open_arms = new VerbPh("open");
// vp.whisper_free = new VerbPh("whisper 'Free! Body and soul free!'");
// vp.ask_to_enter = new VerbPh("ask to enter");
// vp.implore = new VerbPh("say 'Louise, open the door! I beg; open the door. You will make yourself ill. What are you doing, Louise? For heaven's sake open the door'");
// vp.reply = new VerbPh("say 'Go away. I am not making myself ill'");
// vp.drink_elixir = new VerbPh("drink");
// vp.pray = new VerbPh("pray that life might be long");
// vp.open_door = new VerbPh("open");
// vp.stride_down = new VerbPh("stride");
// vp.decend = new VerbPh("decend");
// vp.open_front = new VerbPh("open");
// vp.enter_house = new VerbPh("enter");
// vp.cry = new VerbPh("cry out");
// vp.stand_amazed_at_cry = new VerbPh("stand amazed");
// vp.try_to_hide = new VerbPh("try to hide");
// vp.stand_amazed_at_hide = new VerbPh("stand amazed");
// vp.fall_down = new VerbPh("fall down");
// vp.die = new VerbPh("die");
// vp.say_cause = new VerbPh("say that 'Mrs. Mallard died of heart disease — of the joy that kills'");
// vp.arrive = new VerbPh("arrive");

function run() { narrate(title, told_by, world, spin, names, vp); }
