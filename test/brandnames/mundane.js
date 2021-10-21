// Curveship-js test narrator
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var toldBy = "a horny man";

//spin.order = "retrograde";
//spin.timePhrases = true;

names.soda = new Names("a soda");
names.car = new Names("a car");
names.cloth = new Names("a shirt");
names.chair = new Names("a chair");
names.knife = new Names("a knife");
names.meat = new Names("meat");

vp.drink = new VerbPh("drink");
vp.dream = new VerbPh("dream");
vp.wear = new VerbPh("put on");
vp.grab = new VerbPh("grab");
vp.stab = new VerbPh("cut");
vp.cook = new VerbPh("cook");
vp.enjoy = new VerbPh("yearn for");

function run() { narrate(title, toldBy, world, spin, names, vp); }
