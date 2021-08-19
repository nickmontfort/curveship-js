// Casual Narrator for the Henny Penny - a Curveship-js example
//  Copyright 2021 Angela Chang
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.
// Mixed with text from Vivian French and William Stubbs versions
var spin = {
   //i: actor.henny,
};

var told_by = "";

names = {};

names.farmyard = new Names("garden");
names.cave = new Names("Fox Lox's den");

names.henny = new Names("Hen Pen");
names.rooster = new Names( "Cocky Locky");
names.duck = new Names("Ducky Luck");
names.goose = new Names("Goose Loose");
names.turkey = new Names("Turkey Lurkey");
names.fox = new Names("Fox Lox");
names.tree= new Names("a pea-stack");
names.nut = new Names("a pea");
names.head = new Names("the head")
names.head2 = new Names("his head")

names.crowd = new Names("The animals")
vp = {};
vp.hit = new VerbPh("whack");
vp.decides = new VerbPh("decide to tell the king");
vp.ranc = new VerbPh("went along");
vp.meetf= new VerbPh("meet");
vp.cry = new VerbPh("cry 'The sky's a-falling! I must go to tell the king.'");
vp.invite= new VerbPh("say 'I will show you the way.'");
vp.hitfox = new VerbPh("fall out of the pea stack and hits")
vp.cry6 = new VerbPh("cry 'The sky's a-falling! We must tell the king.'");
vp.refute= new VerbPh("say 'Oh, the sky is not falling! A pea fell on your head. Let's run home'");
//how do you add prefixes "Again, But..."
vp.laugh= new VerbPh("snap at the");

function run() { narrate(title, told_by, world, spin, names, vp); }
