// Lou Reed for I'm Waiting for the Man - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "Lou Reed";

spin.groupings = "category";

// PLACES

names.intersection = new Names("the intersection of Lexington and 125th");
names.brownstone = new Names("a brownstone");
names.stairs = new Names("three flights of stairs");
//names.inside = new Names("inside");

// ACTORS

names.buyer = new Names("a drug buyer");
names.resident = new Names("a resident");
names.neighbor_1 = new Names("the neighbor");
names.neighbor_2 = new Names("the neighbor");
names.man = new Names("a drug dealer");

// THINGS

names.money = new Names("twenty-six dollars");
names.hand = new Names("one hand");
names.clothing = new Names("black clothes");
names.hat = new Names("a straw hat");
names.heroin = new Names("heroin");

names.neighbor = new Names("neighbor");

// EVENTS

vp.want = new VerbPh("want to buy");
vp.go = new VerbPh("go up");
vp.wait_1 = new VerbPh("wait");
vp.hold = new VerbPh("hold");
vp.feel = new VerbPh("feel sick and dirty");
vp.wait_2 = new VerbPh("wait");
vp.confront_1 = new VerbPh("say");
vp.confront_2 = new VerbPh("say");
vp.reply_1 = new VerbPh("reply");
vp.reply_2 = new VerbPh("reply");
vp.arrive = new VerbPh("arrive");
vp.know = new VerbPh("know");
vp.care = new VerbPh("do not care");
vp.go_brownstone = new VerbPh("go up");
vp.go_upstairs = new VerbPh("go up");
vp.taste = new VerbPh("taste");
vp.buy = new VerbPh("buy");
vp.lack = new VerbPh("do not have time to waste");
vp.go_downstairs = new VerbPh("go down");
vp.split = new VerbPh("split");
vp.holler = new VerbPh("do not holler");
vp.bawl = new VerbPh("do not bawl");
vp.shout = new VerbPh("do not shout");
vp.feel_2 = new VerbPh("feel good");
vp.fine = new VerbPh("feel fine");

function run() { narrate(title, toldBy, world, spin, names, vp); }
