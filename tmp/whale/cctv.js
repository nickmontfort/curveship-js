// Casual Narrator for The Prodigal Son - a Curveship-js example
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

var told_by = "a “CCTV” narrator";

// PLACES

names.house = new Names("the transmitted image", "the house");
names.kitchen = new Names("the adjacent space");

// ACTORS

names.john = new Names("the first person", null, pronoun.male);
names.doug = new Names("the second person", null, pronoun.male);

// THINGS
names.whale = new Names("the animal");
names.note = new Names("a paper", "it");
names.mouth = new Names("the animal's skin");
names.breath = new Names("");
names.book = new Names("a book on the table", "the book");
names.violin = new Names("an instrument", "the instrument");
names.couch = new Names("the couch");
names.music = new Names("something");
names.sound = new Names("creature");
names.knife = new Names("the knife");
names.eyes = new Names("eyes");
names.hour = new Names("an hour");
names.card = new Names("something", "the thing");
names.hands = new Names("hand");

// EVENTS
// doorbin makhfi
vp = {};

vp.stand = new VerbPh("stand up");
vp.move = new VerbPh("go");
vp.stick = new VerbPh("is stuck");
vp.note_content = new VerbPh("is indistinct");
vp.read_note = new VerbPh("look at");
vp.stare = new VerbPh("stare at");
vp.breathe = new VerbPh("is there");
vp.pick_up = new VerbPh("pick up");
vp.talk = new VerbPh("say something");
vp.nothing = new VerbPh("is silent");
vp.argue = new VerbPh("shout");
vp.nothing = new VerbPh("say nothing back");
vp.pick_up_violin = new VerbPh("pick up");
vp.play_violin = new VerbPh("start playing");
vp.whisper = new VerbPh("whisper something");
vp.raise = new VerbPh("happen");
vp.stop_music = new VerbPh("react to");
vp.stare_2 = new VerbPh("stare at");
vp.shake = new VerbPh("shake for a while");
vp.shake_ap = new VerbPh("tremble");
vp.stop = new VerbPh("stop suddenly");
vp.blow = new VerbPh("shrink");
vp.play_violin_2 = new VerbPh("play again");
vp.no_resp = new VerbPh("do not move");
vp.talk_3 = new VerbPh("say something");
vp.pick_up_knife = new VerbPh("pick up");
vp.stab = new VerbPh("stab");
vp.close = new VerbPh("close");
vp.enter = new VerbPh("enter");
vp.pass = new VerbPh("pass");
vp.out = new VerbPh("come out");
vp.bloody = new VerbPh("is red");
vp.summon = new VerbPh("point at");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("stare at");
vp.card_content = new VerbPh("have something to say");

function run() { narrate(title, told_by, world, spin, names, vp); }
