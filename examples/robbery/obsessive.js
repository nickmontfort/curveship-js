// Casual Narrator for The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "an obsessed-with-brand-names storyteller";

spin.focalize = place.guardPost;

names.lobby = new Names("the lobby");
names.street = new Names("a sidewalk outside the bank", "a sidewalk");
names.vestibule = new Names("that bulletproof booth", "the vestibule");
names.guardPost = new Names("the guard post");

// The narrator doesn’t know the bank teller’s name, and is not even going
// to mention that she is a bank teller. So in this file, names.teller is not
// assigned a value. This results in a generic term, “woman,” being used.
names.robber = new Names("a nervous man", "the pretend robber");
names.guard = new Names("this burly guard", "the guard");

names.slip = new BrandNames("(a deposit slip)", "a Bank of America", "CD");
names.fakeMoney = new BrandNames("(some fake money)", "some fake Benjamins");
names.bag = new BrandNames("a bag", "a Burberry", "Medium Freya Tote");
names.mask = new BrandNames("a mask", "a Dora the Explorer", null, "purchased from Target");
names.fakeGun = new BrandNames("(a gun-shaped object)", "an Adventure Force", "AK-47 Machine Gun", "bought from Tadpole", "a fake");
names.pistol = new BrandNames("a pistol", "a Smith & Wesson", "2mm Kolibri");

vp.read = new VerbPh("read");
vp.snooze = new VerbPh("snooze");
vp.reread = new VerbPh("reread");
vp.coverFace = new VerbPh("put on");
vp.type = new VerbPh("type");
vp.play = new VerbPh("fiddle around");
vp.beginRobbing = new VerbPh("pretend to rob");
vp.wave = new VerbPh("wave to");
vp.threaten = new VerbPh("threaten");
vp.laugh = new VerbPh("laugh");
vp.wake = new VerbPh("wake up");
vp.seeThreat = new VerbPh("see");
vp.leavePost = new VerbPh("leave");
vp.grabFake = new VerbPh("bag");
vp.turn = new VerbPh("turn to");
vp.shoot1 = new VerbPh("shoot");
vp.shoot2 = new VerbPh("shoot");
vp.fall = new VerbPh("fall");
vp.die = new VerbPh("die");
vp.dropGun = new VerbPh("drop");
vp.regret = new VerbPh("regret");
vp.cry = new VerbPh("cry");
vp.stare = new VerbPh("stare at");

function run() { narrate(title, toldBy, world, spin, names, vp); }
