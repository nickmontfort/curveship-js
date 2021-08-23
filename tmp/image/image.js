// A Photographer Narrator for The Birth of Image written by Ardalan SadeghiKivi - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var spin = {
  /*i: "image",
  you: "dragon",*/
};

var told_by = "A Photographer";

names = {};

names.image = new Names("an image");

names.dragon = new Names("a dragon");

names.water = new Names("the water");

vp = {};

vp.live = new VerbPh("live");
vp.burn = new VerbPh("burn");
vp.birth = new VerbPh("birth");
vp.melt = new VerbPh("melt");
vp.drink = new VerbPh("drink");
vp.become = new VerbPh("become");

function run() { narrate(title, told_by, world, spin, names, vp); }
