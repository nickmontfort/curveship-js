//  Proper Narrator for A Whale In Brookline written by Ardalan SadeghiKivi - a Curveship-js example
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

var told_by = "a “proper” narrator";

// PLACES

names.house = new Names("the apartment", "the house");

// ACTORS

names.john = new ProperNames("John", "", pronoun.masculine);
names.doug = new ProperNames("Doug", "", pronoun.masculine);

// THINGS

names.whale = new Names("the whale", "the beast");
names.violin = new Names("the violin");
names.music = new Names("the music");
names.sound = new Names("a terrifying sound");
names.knife = new Names("the knife");
names.card = new Names("a laminated card", "the card");
names.hands = new Names("hand");

// EVENTS

vp = {};

vp.play_violin = new VerbPh("start playing");
vp.whisper = new VerbPh("whisper 'If Bach cannot persuade a mysterious, perhaps divine, messenger to come out of the whale's belly, nothing else can'");
vp.stop_music = new VerbPh("muffle");
vp.talk_3 = new VerbPh("say 'It would've destroyed the whole building if it had moved more! I have been tolerating this filth and flesh in my house for a month. Enough is enough!'");
vp.stab = new VerbPh("stab");
vp.enter = new VerbPh("enter");
vp.out = new VerbPh("come out covered in blood");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("stare at");
vp.card_content = new VerbPh("say 'If you had any problems or did not receive the messenger, call the number below: +1 (857) 204 0988'");

function run() { narrate(title, told_by, world, spin, names, vp); }
