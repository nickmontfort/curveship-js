// Curveship-js test narrator
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var toldBy = "Patrick Lecter";

// spin.order = "retrograde";
// spin.timePhrases = true;

names.soda = new BrandNames(
  "(a soda)",
  null,
  "a Sprite",
  "bought from Westside Market",
  "a cold"
);

names.car = new BrandNames(
  "(an automobile)",
  "an Audi",
  "an A4 Avant"
);

names.shirt = new BrandNames(
  "a shirt",
  "a Gucci",
  null,
  "purchased from Saks Fifth Avenue",
  "a blindingly pink"
);

names.chair = new Names("a scarlet wooden swivel chair", "the chair");

names.knife = new BrandNames(
  "a knife",
  null,
  "a Wusthof Classic",
  null,
  "a skymetal"
);

names.meat = new Names("a juicy steak", "the steak");

vp.drink = new VerbPh("drink");
vp.dream = new VerbPh("dream");
vp.putOn = new VerbPh("button up");
vp.grab = new VerbPh("grab");
vp.stab = new VerbPh("stab");
vp.cook = new VerbPh("cook");
vp.thinkOf = new VerbPh("hunger for");

function run() {
  narrate(title, toldBy, world, spin, names, vp);
}
