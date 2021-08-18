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

var told_by = "a “shakespeare enthusiast” narrator";

// PLACES

names.house = new Names("the homestead", "the house");

// ACTORS

names.john = new ProperNames("Joan", "", pronoun.male, "", "that gent");
names.doug = new ProperNames("Douglas", "", pronoun.male, "", "that gent");

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
vp.whisper = new VerbPh("whisp'r 'if Byrd cannot p'rsuade a myst'rious, p'rhaps divine, messeng'r to cometh out of the whale's belly, nothing else can'");
vp.stop_music = new VerbPh("muffle");
vp.talk_3 = new VerbPh("sayeth 'T wouldst has't did destroy the whole castle if 't be true t hadst hath moved m're! i has't been tol'rating this filth and flesh in mine own house f'r a month.  Enow is enow!'");
vp.stab = new VerbPh("stab");
vp.enter = new VerbPh("ent'r");
vp.out = new VerbPh("exit covered in blood");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("eye");
vp.card_content = new VerbPh("sayeth 'If 't be true thee hadst any problems 'r didst not taketh a prophet, rep'rt to thy nearest coven'");

function run() { narrate(title, told_by, world, spin, names, vp); }
