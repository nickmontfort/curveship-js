// Curveship-js test narrator
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var toldBy = "Patrick Lecter";

//spin.order = "retrograde";
//spin.timePhrases = true;

names.soda = new BrandNames(
  "a",
  "soda",
  null,
  "Sprite",
  "bought from Trader Joe’s",
  "cold",
  false
);

names.car = new BrandNames(
  null,
  "car",
  "1980",
  "Audi",
  null,
  "convertible",
  false
);

names.cloth = new BrandNames(
  null,
  "shirt",
  null,
  "Gucci",
  "purchased from Saks Fifth Avenue",
  "blindingly pink"
);

names.chair = new BrandNames(
  null,
  "chair",
  null,
  "wooden",
  null,
  "scarlet swivel"
);

names.knife = new BrandNames(
  null,
  "knife",
  null,
  "Wusthof classic",
  null,
  "skymetal"
);

names.meat = new BrandNames("a", "meat", null, null, null, "juicy dark");

vp.drink = new VerbPh("drink");
vp.dream = new VerbPh("dream");
vp.wear = new VerbPh("wear");
vp.grab = new VerbPh("grab");
vp.stab = new VerbPh("stab");
vp.cook = new VerbPh("cook");
vp.enjoy = new VerbPh("enjoy");

function run() {
  narrate(title, toldBy, world, spin, names, vp);
}
