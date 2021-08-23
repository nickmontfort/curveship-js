// CCTV Narrator for A Whale In Brookline written by Ardalan SadeghiKivi - a Curveship-js example
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

var toldBy = "a “CCTV” narrator";

// PLACES

// names.house = new Names("the transmitted image");

// ACTORS

// names.john = new Names("the first person", null, pronoun.masculine);
// names.doug = new Names("the second person", null, pronoun.masculine);

// THINGS

names.whale = new Names("the animal");
names.violin = new Names("an instrument", "the instrument");
// names.music = new Names("something");
names.sound = new Names("creature");
// names.knife = new Names("the knife");
// names.card = new Names("something", "the thing");
names.hands = new Names("hand");

// EVENTS

vp = {};

vp.play_violin = new VerbPh("play");
vp.whisper = new VerbPh("talk");
vp.stop_music = new VerbPh("react to");
vp.talk_3 = new VerbPh("say something");
vp.stab = new VerbPh("stab");
vp.enter = new VerbPh("enter");
vp.out = new VerbPh("come out covered in red");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("stare at");
vp.card_content = new VerbPh("have something to say");

function run() { narrate(title, toldBy, world, spin, names, vp); }
