// Casual Narrator for the Henny Penny - a Curveship-js example
//  Copyright 2021 Angela Chang
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.
// Adapted from text https://archive.org/stream/HennyPenny/Henny%20Penny_djvu.txt
var spin = {
   //i: actor.henny,
};

var told_by = "a classic storyteller";

names = {};

names.farmyard = new Names("that idyllic farmyard", "the farmyard");
names.cave = new Names("the cave");

names.henny = new ProperNames("Henny","Penny", pronoun.feminine, "a chicken");
names.rooster = new ProperNames( "Cocky","Locky",pronoun.masculine,"a rooster");
names.duck = new ProperNames("Ducky Lucky",pronoun.masculine,"a duck" );
names.goose = new Names( "Goosey Loosey");
names.turkey = new Names("Turkey Lurkey");

names.fox = new Names("Foxey Loxey","the fox");
names.tree= new Names("a tree");
names.nut = new Names("an acorn", "a nut");
names.head = new Names("the head")
names.head2 = new Names("his head")
names.king = new Names("the king");
names.crowd = new Names("animals")
vp = {};
vp.hit = new VerbPh("hit");
vp.decides = new VerbPh("decide to tell it");
vp.ranc = new VerbPh("run");
vp.meetf= new VerbPh("meet");
vp.cry = new VerbPh("cry 'The sky is falling! I must go to tell the king. Come with me'");
vp.invite= new VerbPh("say 'I will, but first, rest in my cave. You must all be tired'");
vp.hitfox = new VerbPh("fall out of the tree and hits")
vp.cry6 = new VerbPh("cry 'The sky is falling! We must tell the king. Come with me'");
vp.refute= new VerbPh("say 'Oh, the sky is not falling! A nut fell on your head. Let's go home'");
vp.laugh= new VerbPh("laugh");

function run() { narrate(title, told_by, world, spin, names, vp); }
