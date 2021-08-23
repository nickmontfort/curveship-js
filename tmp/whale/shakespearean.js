// Shakespeare Enthusiast Narrator for A Whale In Brookline written by Ardalan SadeghiKivi - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

// TODO change all the names to very specific (proper) ones

var spin = {
  // i: teller,
};

var toldBy = "a “shakespeare enthusiast” narrator";

// PLACES

names.house = new Names("the homestead", "the house");

// ACTORS

names.john = new ProperNames("Joan", "", pronoun.masculine, "", "that gent");
names.doug = new ProperNames("Douglas", "", pronoun.masculine, "", "that gent");

// THINGS

names.whale = new Names("the whale", "the beast");
names.violin = new Names("the lyre", "the instrument");
names.music = new Names("the music");
names.sound = new Names("a t'rrifying soundeth", "the howling");
names.knife = new Names("the bodkin");
names.card = new Names("a paper", "the paper");
names.hands = new Names("handeth");

// EVENTS

vp = {};

vp.play_violin = new VerbPh("play");
vp.whisper = new VerbPh("whisp'r 'If Bach cannot persuade a mysterious, perhaps divine, messenger to come out of the whale's belly, nothing else can'");
vp.stop_music = new VerbPh("muffle");
vp.talk_3 = new VerbPh("sayeth 'It would've destroyed the whole building if it had moved more! I have been tolerating this filth and flesh in my house for a month. Enough is enough!'");
vp.stab = new VerbPh("stab");
vp.enter = new VerbPh("ent'r");
vp.out = new VerbPh("exit covered in blood");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("eye");
vp.card_content = new VerbPh("sayeth 'If you had any problems or did not receive the messenger, call the number below: +1 (857) 204 0988'");

function run() { narrate(title, toldBy, world, spin, names, vp); }
