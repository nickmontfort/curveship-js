// Casual Narrator for The Prodigal Son - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var spin = {
  // i: teller,
};

var told_by = "a teller of parables";

// PLACES

names.house = new Names("a large house", "the house");
names.city = new Names("a city");
names.citizens_field = new Names("a field");
names.rich_field = new Names("a field");
names.front = new Names("the front of the house");

// ACTORS

names.father = new Names("a land owner", "the father");
names.older = new Names("an older son", "the older son");
names.younger = new Names("a younger son", "the younger son");
names.citizen = new Names("a citizen");
names.swine = new Names("some swine", "the swine");
names.servant_1 = new Names("a servant");
names.servant_2 = new Names("a servant");
names.servant_3 = new Names("a servant");

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

vp = {};

vp.with_older = new VerbPh("inhabit");
vp.request_inheritance = new VerbPh("request");
vp.give_inheritance = new VerbPh("give");
vp.gather_inheritance = new VerbPh("gather");
vp.travel = new VerbPh("travel");
vp.waste_inheritance = new VerbPh("waste");
vp.famine = new VerbPh("dry up");
vp.starve = new VerbPh("hunger");
vp.take_job = new VerbPh("work");
vp.enter_field = new VerbPh("enter");
vp.feed_swine = new VerbPh("feed");
vp.hunger = new VerbPh("hunger");
vp.said_first = new VerbPh("think 'How many hired servants of my father's have bread enough and to spare, and I perish with hunger!'");
vp.said_next = new VerbPh("think 'I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son: make me as one of thy hired servants'");
vp.travel_to_father = new VerbPh("travel");
vp.see_younger_son = new VerbPh("see");
vp.run_to_younger_son = new VerbPh("run");
vp.kiss_younger_son = new VerbPh("embrace");
vp.said_to_father = new VerbPh("say 'Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son'");
vp.said_to_servants = new VerbPh("say 'Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: and bring hither the fatted calf, and kill it; and let us eat, and be merry: for this my son was dead, and is alive again; he was lost, and is found'");
vp.entered = new VerbPh("enter");
vp.family_danced = new VerbPh("dance");
vp.stood = new VerbPh("near");
vp.heard_music = new VerbPh("hear");
vp.asked_servants = new VerbPh("inquire of");
vp.tell_of_return = new VerbPh("say 'Thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound'");
vp.became_angry = new VerbPh("become angry");
vp.refuse_to_enter = new VerbPh("do not enter");
vp.emerge = new VerbPh("leave");
vp.complain = new VerbPh("say 'Lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends: but as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf'");
vp.reply = new VerbPh("say 'Son, thou art ever with me, and all that I have is thine. It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found'");


function run() { narrate(title, told_by, world, spin, names, vp); }
