// Exaggerated Narrator for Beware of the Deep Blue Sea - a Curveship-js example
//  Copyright 2022 Ardalan SadeghiKivi
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "a picaro";

spin.i = actor.urashima;
//spin.focalizer = actor.teller;

// spin.eventNumbers = true;

names.shore = new Names("the bloodsoaked shore");
names.sea = new Names("the angry sea");
names.home = new Names("the balding house");

names.urashima = new Names("the misty troubled fisherman");
names.fairy = new Names("the outrageously overweight mermaid");
names.person = new Names("an immediately annoying person");

names.box = new Names("a goddam noisy box");
names.youth = new Names("lanky youth");
names.air = new Names("the noxious air");

vp.reply = new VerbPh("reply evasively");
vp.back = new VerbPh("return");
vp.bestow = new VerbPh("bestow");
vp.return = new VerbPh("return to");
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
