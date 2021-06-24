// Casual Narrator for the Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var spin = {};

let told_by = "a typical narrator";

names = {};

names.man = new Names("the man");

names.bike = new Names("the bike");
names.tire = new Names("the tire");
names.handlebar = new Names("the handlebar");
names.seat = new Names("the seat");
names.shell = new Names("the shell");
names.cover = new Names("the cover");

vp = {};

vp.see1 = new VerbPh("see");
vp.see2 = new VerbPh("see");
vp.see3 = new VerbPh("see");


function run() { narrate(title, told_by, world, spin, names, vp); }
