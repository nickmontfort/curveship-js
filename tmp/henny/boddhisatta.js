// Casual Narrator for the Henny Penny - a Curveship-js example
//  Copyright 2021 Angela Chang
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.
// Adapted from the Buddhist source story for Henny Penny
// https://www.accesstoinsight.org/lib/authors/kawasaki/bl142.html#jat322
var spin = {
   //i: actor.henny,
};

var told_by = "Buddhist monks";

names = {};

names.farmyard = new Names("grove");
names.cave = new Names("the lion's den");

names.henny = new Names("a hare");
names.rooster = new Names( "other hare");
names.duck = new Names("deer");
names.goose = new Names("boars");
names.turkey = new Names(" elk");
names.fox = new Names("Bodhisatta the lion","lion");
names.tree= new Names("a belli tree");
names.nut = new Names("a ripe belli fruit");
names.head = new Names("the head")
names.head2 = new Names("the solid earth")

names.crowd = new Names("The animals")
vp = {};
vp.hit = new VerbPh(["falls"," and whack"]);
vp.decides = new VerbPh("flee and does not look back");
vp.ranc = new VerbPh("run along in a panic");
vp.meetf= new VerbPh("see");
vp.cry = new VerbPh("cry 'The earth is breaking up! Run for your lives!'");
vp.invite= new VerbPh("say 'I will investigate the frightful noise.' He goes to the place where it started.");
vp.hitfox = new VerbPh("lay near")
vp.cry6 = new VerbPh("say 'Don't be afraid! The frightening noise is from a fallen belli fruit.'");
vp.refute= new VerbPh("say 'You are right, we won't be afraid. Let's return home'");
//how do you add prefixes "Again, But..."
vp.laugh= new VerbPh("respect the wisdom of the ");

function run() { narrate(title, told_by, world, spin, names, vp); }
