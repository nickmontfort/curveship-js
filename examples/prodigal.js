// The Prodigal Son - an example Curveship-js story, 2019-11-08
//  Copyright 2019 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// This story was selected for Curveship-js adaptation because it is well-known
// and culturally significant, and to provide a range of different narrative
// types, including the parable.

var metadata = { title: "The Prodigal Son", author: "Luke the Physician (traditionally attributed)", date: "1st or 2nd Century CE",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee, which can be found by looking at the code. Examples:",
examples: [ "narrator=younger,narratee=father,speaking=after,event_numbers",
"order=retrograde,time_markers" ] };

// PLACES first
place.house = new Place("a", "large house");
place.city = new Place("a", "city");
place.citizens_field = new Place("a", "field");
place.rich_field = new Place("a", "field");
place.front = new Place("the", "front of the house");

place.rich_field.addView(place.front, "from afar");
place.front.addView(place.rich_field, "in the field outside");
place.rich_field.addView(place.house, "in the house");

// ACTORS next
actor.father = new Actor("a", "land owner", spatial.in, place.house, pronoun.masculine);
actor.older = new Actor("an", "older son", spatial.in, place.house, pronoun.masculine);
actor.younger = new Actor("a", "younger son", spatial.in, place.house, pronoun.masculine);
actor.citizen = new Actor("a", "citizen", spatial.in, place.citizens_field, pronoun.masculine);
actor.swine = new Actor("some", "swine", spatial.in, place.citizens_field, pronoun.neuter, 2);
actor.servants = new Actor("some", "servants", spatial.in, place.rich_field, pronoun.masculine, 2);
actor.servants.owner = actor.father;

place.citizens_field.owner = actor.citizen;
place.rich_field.owner = actor.father;

// THINGS next
thing.inheritance = new Thing("an", "allotted inheritance", spatial.of, actor.father);
thing.husks = new Thing("some", "husks", spatial.of, actor.cosmos);
thing.robe = new Thing("a", "robe", spatial.of, actor.cosmos);
thing.ring = new Thing("a", "ring", spatial.of, actor.cosmos);
thing.shoes = new Thing("some", "shoes", spatial.of, actor.cosmos);
thing.calf = new Thing("a", "fatted calf", spatial.of, actor.cosmos);

// Finally, EVENTS
var WITH_OLDER = new Event(actor.father, "inhabit", place.house, temporal.with, [actor.older, actor.younger]);
// TODO Group the two sons into a set or sequence (array) and have them realized together?
var REQUEST_INHERITANCE = new Event(actor.younger, "request", thing.inheritance);
var GIVE_INHERITANCE = new Event(actor.father, "give", thing.inheritance, temporal.to, actor.younger);
var GATHER_INHERITANCE = new Event(actor.younger, "gather", thing.inheritance);
var TRAVEL = new Event(actor.younger, "travel", null, temporal.to, place.city);
var WASTE_INHERITANCE = new Event(actor.younger, "waste", thing.inheritance, "by riotous living");
// FIXME https://nickm.com/classes/interactive_narrative/2019_fall/csjs/prodigal.html?order=retrograde,time_markers,event_numbers
var FAMINE = new Event(actor.cosmos, "not rain");
var STARVE = new Event(actor.younger, "hunger");
var TAKE_JOB = new Event(actor.younger, "work", null, temporal.for, actor.citizen);
var ENTER_FIELD = new Event(actor.younger, "enter", place.citizens_field);
var FEED_SWINE = new Event(actor.younger, "feed", actor.swine, temporal.using, thing.husks);
var HUNGER = new Event(actor.younger, "hunger");
var SAID_FIRST = new Event(actor.younger, "think", "“How many hired servants of my father's have bread enough and to spare, and I perish with hunger!”");
var SAID_NEXT = new Event(actor.younger, "think", "“I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, and am no more worthy to be called thy son: make me as one of thy hired servants”");
var TRAVEL_TO_FATHER = new Event(actor.younger, "travel", null, temporal.to, place.front);
var SEE_YOUNGER_SON = new Event(actor.father, "see", actor.younger);
var RUN_TO_YOUNGER_SON = new Event(actor.father, "run", null, temporal.to, actor.younger);
var KISS_YOUNGER_SON = new Event(actor.father, "embrace", actor.younger);
var SAID_TO_FATHER = new Event(actor.younger, "say", "“Father, I have sinned against heaven, and in thy sight, and am no more worthy to be called thy son”", temporal.to, actor.father);
var SAID_TO_SERVANTS = new Event(actor.father, "say", "“Bring forth the best robe, and put it on him; and put a ring on his hand, and shoes on his feet: and bring hither the fatted calf, and kill it; and let us eat, and be merry: for this my son was dead, and is alive again; he was lost, and is found”", temporal.to, actor.servants);
var ENTERED = new Event([actor.father, actor.younger], "enter", place.house);
var FAMILY_DANCED = new Event([actor.father, actor.younger], "dance");
FAMILY_DANCED.duration = 15;
var STOOD = new Event(actor.older, "near", place.house);
var HEARD_MUSIC = new Event(actor.older, "hear", "music");
var ASKED_SERVANTS = new Event(actor.older, "inquire of", actor.servants);
var TELL_OF_RETURN = new Event(actor.servants, "say", "“Thy brother is come; and thy father hath killed the fatted calf, because he hath received him safe and sound”", temporal.to, actor.older);
var BECAME_ANGRY = new Event(actor.older, "become angry");
var REFUSE_TO_ENTER = new Event(actor.older, "not enter", place.house);
var EMERGE = new Event(actor.father, "leave", place.house, temporal.to, place.rich_field);
var COMPLAIN = new Event(actor.older, "say", "“Lo, these many years do I serve thee, neither transgressed I at any time thy commandment: and yet thou never gavest me a kid, that I might make merry with my friends: but as soon as this thy son was come, which hath devoured thy living with harlots, thou hast killed for him the fatted calf”", temporal.to, actor.father);
var REPLY = new Event(actor.father, "say", "“Son, thou art ever with me, and all that I have is thine. It was meet that we should make merry, and be glad: for this thy brother was dead, and is alive again; and was lost, and is found”", temporal.to, actor.older);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
