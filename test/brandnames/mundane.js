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

names.soda = new BrandNames(
  "soda"
);

names.car = new BrandNames(
  "car"
);

names.cloth = new BrandNames(
  "shirt"
);

names.chair = new BrandNames(
  "chair"
);

names.knife = new BrandNames(
  "knife"
);

names.meat = new BrandNames(
  "meat"
);

vp.drink = new VerbPh("drink");
vp.dream = new VerbPh("dream");
vp.wear = new VerbPh("wear");
vp.grab = new VerbPh("grab");
vp.stab = new VerbPh("cut");
vp.cook = new VerbPh("cook");
vp.enjoy = new VerbPh("yearn");

function run() { narrate(title, toldBy, world, spin, names, vp); }
