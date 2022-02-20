// Anagram Narrator for Beware of the Deep Blue Sea - a Curveship-js example
//  Copyright 2022 Ardalan SadeghiKivi
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "a ram nag";

//spin.i = actor.urashima;
//spin.focalizer = actor.teller;

// spin.eventNumbers = true;

names.shore = new Names("the horse");
names.sea = new Names("the canoe");
names.home = new Names("headmost");

names.urashima = new Names("the he-tuner");
names.fairy = new Names("the dire arm");
names.person = new Names("a rep-son");

names.box = new Names("a torn car");
names.youth = new Names("hot-you");
names.air = new Names("the rai");

vp.reply = new VerbPh("reply");
vp.back = new VerbPh("return");
vp.bestow = new VerbPh("bestow");
vp.return = new VerbPh("return");
vp.torn = new VerbPh("is torn apart");
vp.walk = new VerbPh("walk by");
vp.ask = new VerbPh("ask");
vp.respond = new VerbPh("reply");
vp.startle = new VerbPh("startle");
vp.returnSea = new VerbPh("return back");
vp.open = new VerbPh("open up");
vp.perish = new VerbPh("pass from sight");
vp.fade = new VerbPh("drown");

function run() {
    narrate(title, toldBy, world, spin, names, vp);
}
