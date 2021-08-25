// Casual Narrator for The Prodigal Son - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

// TODO change all the names to very specific (proper) ones

var toldBy = "a “proper” narrator"; // FIXME eventually! Needs work

spin.i = "citizen";

// PLACES

names.house = new Names("a large house", "the house");
names.city = new Names("a city");
names.citizensField = new Names("a field");
names.richField = new Names("a field");
names.front = new Names("the front of the house");

// ACTORS

names.father = new Names("a land owner", "the father");
names.older = new Names("an older son");
names.younger = new Names("a younger son");
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

// EVENTS

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
vp.saidFirst = new VerbPh("think 'How many hired servants of my father's have bread enough and to spare, and I perish with hunger!'");
vp.saidNext = new VerbPh("think 'I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son: make me as one of thy hired servants'");
vp.travelToFather = new VerbPh("travel");
vp.seeYoungerSon = new VerbPh("see");
vp.runToYoungerSon = new VerbPh("run");
vp.kissYoungerSon = new VerbPh("embrace");
vp.saidToFather = new VerbPh("say 'Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son'");
vp.saidToServants = new VerbPh("say 'Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: and bring hither the fatted calf, and kill it; and let us eat, and be merry: for this my son was dead, and is alive again; he was lost, and is found'");
vp.entered = new VerbPh("enter");
vp.familyDanced = new VerbPh("dance");
vp.stood = new VerbPh("near");
vp.heardMusic = new VerbPh("hear");
vp.askedServants = new VerbPh("inquire of");
vp.tellOfReturn = new VerbPh("say 'Thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound'");
vp.becameAngry = new VerbPh("become angry");
vp.refuseToEnter = new VerbPh("do not enter");
vp.emerge = new VerbPh("leave");
vp.complain = new VerbPh("say 'Lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends: but as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf'");
vp.reply = new VerbPh("say 'Son, thou art ever with me, and all that I have is thine. It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found'");

function run() { narrate(title, toldBy, world, spin, names, vp); }
