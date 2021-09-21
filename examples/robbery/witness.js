// Bank Teller Narrator for The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "the bank teller";

spin.i = "teller";

// Uncomment this to see how events are numbered. Useful for development,
// but you will want to keep it off in the final version.
//
// spin.eventNumbers = true;

// In a future version of Curveship, we intend that focalization will be
// directly supported. For now we “manually simulate” focalization by
// selecting only those events that the teller has witnessed.
//
spin.main = "0;2;4;5-9;12-22";

names.lobby = new Names("the lobby");
names.street = new Names("a sidewalk outside the bank", "a sidewalk");
names.guardPost = new Names("the guard post");

// The teller doesn’t need a name in this file because she is the “I” of the
// narrative.
//

// The robber is a friend of the bank teller, conducting this pre-arranged
// fake robbery. So the bank teller knows his name.
//
names.robber = new ProperNames("Jimmy", "Smith", pronoun.masculine, "my friend");

// Although the guard is a co-worker, the bank teller doesn’t happen to know
// this guard’s name. He ususally sits in that guard booth with one-way glass.
//
names.guard = new Names("our guard", "the guard");

names.slip = new Names("a completed Form D-22", "the deposit slip");
names.fakeMoney = new Names("some fake money");
names.bag = new Names("a black bag", "the bag");
names.mask = new Names("a Dora the Explorer mask", "the mask");
names.fakeGun = new Names("a gun-shaped object", "the fake gun");
names.pistol = new Names("a pistol");

vp.read = new VerbPh("glance at");
vp.reread = new VerbPh("look over");
vp.type = new VerbPh("do some data entry");
vp.play = new VerbPh("play Solitaire");
vp.beginRobbing = new VerbPh("pretend to rob");
vp.wave = new VerbPh("wave to");
vp.threaten = new VerbPh("pose for");
vp.laugh = new VerbPh("laugh");
vp.leavePost = new VerbPh("pop out of");
vp.grabFake = new VerbPh("place");
vp.turn = new VerbPh("turn to");
vp.shoot1 = new VerbPh("shoot");
vp.shoot2 = new VerbPh("execute");
vp.fall = new VerbPh("fall");
vp.die = new VerbPh("die");
vp.dropGun = new VerbPh("drop");
vp.regret = new VerbPh("recall");
vp.cry = new VerbPh("weep");
vp.stare = new VerbPh("stare at");

function run() { narrate(title, toldBy, world, spin, names, vp); }
