// Curveship-js test narrator
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var spin = {
  i: "john",
  you: "mary",
};

var toldBy = "John";

names = {};

vp = {};

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("play");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
