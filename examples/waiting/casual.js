// Lou Reed for I'm Waiting for the Man - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "someone even more sedate than Lou Reed";

spin.groupings = "category";

// PLACES

names.intersection = new Names("the intersection of Lexington and 125th");
names.brownstone = new Names("a brownstone");
names.stairs = new Names("three flights of stairs");
//names.inside = new Names("inside");

// ACTORS

names.buyer = new Names("a drug buyer");
names.resident = new Names("a resident");
names.neighbor1 = new Names("the neighbor");
names.neighbor2 = new Names("the neighbor");
names.man = new Names("a drug dealer");

// THINGS

names.money = new Names("twenty_six dollars");
names.hand = new Names("one hand");
names.clothing = new Names("black clothes");
names.hat = new Names("a straw hat");
names.heroin = new Names("heroin");

names.neighbor = new Names("neighbor");

// EVENTS

vp.want = new VerbPh("want to buy");
vp.go = new VerbPh("go up");
vp.wait1 = new VerbPh("wait");
vp.hold = new VerbPh("hold");
vp.feel = new VerbPh("feel sick and dirty");
vp.wait2 = new VerbPh("wait");
vp.confront1 = new VerbPh("say");
vp.confront2 = new VerbPh("say");
vp.reply1 = new VerbPh("reply");
vp.reply2 = new VerbPh("reply");
vp.arrive = new VerbPh("arrive");
vp.know = new VerbPh("know");
vp.care = new VerbPh("do not care");
vp.goBrownstone = new VerbPh("go up");
vp.goUpstairs = new VerbPh("go up");
vp.taste = new VerbPh("taste");
vp.buy = new VerbPh("buy");
vp.lack = new VerbPh("do not have time to waste");
vp.goDownstairs = new VerbPh("go down");
vp.split = new VerbPh("split");
vp.holler = new VerbPh("do not holler");
vp.bawl = new VerbPh("do not bawl");
vp.shout = new VerbPh("do not shout");
vp.feel2 = new VerbPh("feel good");
vp.fine = new VerbPh("feel fine");

function run() { narrate(title, toldBy, world, spin, names, vp); }
