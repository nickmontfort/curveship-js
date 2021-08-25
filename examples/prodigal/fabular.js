// Casual Narrator for The Prodigal Son - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "a teller of parables";

// PLACES

names.house = new Names("a large house", "the house");
names.city = new Names("a city");
names.citizensField = new Names("a field");
names.richField = new Names("a field");
names.front = new Names("the front of the house");

// ACTORS

names.father = new Names("a land owner", "the father");
names.older = new Names("an older son", "the older son");
names.younger = new Names("a younger son", "the younger son");
names.citizen = new Names("a citizen");
names.swine = new Names("some swine");
names.servant1 = new Names("a servant");
names.servant2 = new Names("a servant");
names.servant3 = new Names("a servant");

// THINGS

names.inheritance = new Names("an alloted inheritance", "the inheritance");
names.husks = new Names("some husks");
names.robe = new Names("a robe");
names.ring = new Names("a ring");
names.shoes = new Names("some shoes");
names.calf = new Names("a fatted calf");
names.riotous = new Names("riotous living");
names.music = new Names("the music");

vp.withOlder = new VerbPh("inhabit");
vp.requestInheritance = new VerbPh("request");
vp.giveInheritance = new VerbPh("give");
vp.gatherInheritance = new VerbPh("gather");
vp.travel = new VerbPh("travel");
vp.wasteInheritance = new VerbPh("waste");
vp.famine = new VerbPh("dry up");
vp.starve = new VerbPh("hunger");
vp.takeJob = new VerbPh("work");
vp.enterField = new VerbPh("enter");
vp.feedSwine = new VerbPh("feed");
vp.hunger = new VerbPh("hunger");
vp.thinkFirst = new VerbPh("think");
vp.thinkNext = new VerbPh("think");
vp.travelToFather = new VerbPh("travel");
vp.seeYoungerSon = new VerbPh("see");
vp.runToYoungerSon = new VerbPh("run");
vp.kissYoungerSon = new VerbPh("embrace");
vp.sayToFather = new VerbPh("say");
vp.sayToServants = new VerbPh("say");
vp.enter = new VerbPh("enter");
vp.dance = new VerbPh("dance");
vp.stand = new VerbPh("near");
vp.hearMusic = new VerbPh("hear");
vp.askServants = new VerbPh("inquire of");
vp.tellOfReturn = new VerbPh("say");
vp.becomeAngry = new VerbPh("become angry");
vp.refuseToEnter = new VerbPh("do not enter");
vp.emerge = new VerbPh("leave");
vp.complain = new VerbPh("say");
vp.reply = new VerbPh("say");
vp.continueReply = new VerbPh("say");

function run() { narrate(title, toldBy, world, spin, names, vp); }
