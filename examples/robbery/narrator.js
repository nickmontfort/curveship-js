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

let told_by = "a casual and very oblique narrator";

names = {};

names.vestibule = new Names("that bulletproof booth", "the vestibule");
names.lobby = new Names("the lobby");
names.guard_post = new Names("the guard post");
names.street = new Names("the sidewalk outside the bank", "the sidewalk");

names.teller = new Names("a lady working for the bank", "the bank teller");
names.robber = new Names("a nervous man", "the pretend robber");
names.guard = new Names("this burly guard", "the guard");

names.slip = new Names("a deposit slip", "the deposit slip");
names.fake_money = new Names("some fake money");
names.bag = new Names("a black bag", "the bag");
names.mask = new Names("a Dora the Explorer mask", "the mask");
names.fake_gun = new Names("a gun-shaped object", "the fake gun");
names.pistol = new Names("a pistol");

representations = {};

function run() { narrate(title, told_by, world, spin, names, representations); }
