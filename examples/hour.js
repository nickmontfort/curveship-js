// The Story of an Hour - an example Curveship-js story, 2019-11-08
//  Copyright 2019 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// This story was selected for Curveship-js adaptation because it seemed to
// present little explicit and important action and a great deal of
// representation of a character’s emotional state. Does it still work with
// with system? This selection also means that a narrative initially presented
// as a short story is represented among the examples.

var metadata = { title: "The Story of an Hour", author: "Kate Chopin", date: "1894",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for narrator and narratee, which can be found by looking at the code. Examples:",
examples: [ "narrator=josephine,narratee=brently",
"order=retrograde,event_numbers,expression_numbers",
"speaking=before,narratee=louise" ] };

// PLACES first
place.downstairs = new Place("", "the Mallard house");
place.office = new Place("the", "newspaper office");
place.room = new Place("", "room");
place.stairs = new Place("the", "stairs");
place.outside = new Place("", "outside the Mallard house");
place.rail = new Place("a", "rail line");

place.stairs.addView(place.room, " in the room", 0.1);
place.room.addView(place.stairs, " out to the stairs", 0.1);
place.room.addView(place.outside, " outside", 0.8);

// ACTORS next
actor.louise = new Actor("", "Mrs. Mallard", spatial.in, place.downstairs, pronoun.feminine);
place.room.owner = actor.louise;
actor.brently = new Actor("", "Brently Mallard", spatial.far, place.rail, pronoun.masculine);
actor.richards = new Actor("", "Richards", spatial.in, place.office, pronoun.masculine);
actor.josephine = new Actor("", "Josephine", spatial.in, place.downstairs, pronoun.feminine);
actor.doctors = new Actor("the", "doctors", spatial.of, actor.cosmos, pronoun.masculine, 2);

// THINGS next
thing.train = new Thing("a", "train", spatial.on, place.rail);
thing.josephinearms = new Thing("", "arms", spatial.of, actor.josephine);
thing.josephinearms.owner = actor.josephine;
thing.chair = new Thing("a", "comfortable chair", spatial.in, place.room);
thing.trees = new Thing("some", "trees", spatial.in, place.outside);
thing.patches = new Thing("some", "patches of blue sky", spatial.in, place.outside);
thing.clouds = new Thing("the", "clouds", spatial.in, place.outside);
thing.unknown = new Thing("some", "unknown thing", spatial.of, actor.cosmos);
thing.pulses = new Thing("", "pulses", spatial.of, actor.louise);
thing.pulses.owner = actor.louise;
thing.pulses.number = 2;

// Finally, EVENTS
var SHUDDER = new Event(actor.louise, "shudder", "to think that life might be long.");
clock += 1000;
var CRASH = new Event(thing.train, "crash");
clock -= 10;
var FAR_AWAY = new Event(actor.brently, "is", null, spatial.far, thing.train);
var DOES_NOT_KNOW = new Event(actor.brently, "not know", CRASH);
clock += 290;
var LEARN_OF_CRASH = new Event(actor.richards, "learn", CRASH, temporal.by, "telegram");
var LEARN_OF_DEATH = new Event(actor.richards, "see", "Brently Mallard listed as dead", null, actor.brently);
LEARN_OF_DEATH.setTemplate("[agent/s] [see/v] [extra/o] listed as dead");
var CONFIRM_CRASH = new Event(actor.richards, "confirm", CRASH, temporal.by, "telegram");
var HASTEN = new Event(actor.richards, "hasten", null, temporal.to, place.downstairs);
var TELL_JOSEPHINE = new Event(actor.richards, "say", CRASH, temporal.to, actor.josephine);
var TELL_MRS_MALLARD = new Event(actor.josephine, "say", CRASH, temporal.to, actor.louise, "very gently");
var IS_NOT_PARALYZED = new Event(actor.louise, "not become paralyzed");
var WEEP = new Event(actor.louise, "weep +ing", null, temporal.in, thing.josephinearms, "immediately");
clock += 40;
var FINISH_WEEPING = new Event(actor.louise, "finish weeping");
var GO_TO_ROOM = new Event(actor.louise, "go", null, temporal.to, place.room);
var SIT_IN_CHAIR = new Event(actor.louise, "sit", null, temporal.in, thing.chair);
var SEE_TREES = new Event(actor.louise, "see", thing.trees, temporal.outside, place.room);
var SENSE_BREATH_OF_RAIN = new Event(actor.louise, "sense", "the delicious breath of rain", temporal.in, "the air");
var HEAR_PEDDLER = new Event(actor.louise, "hear", "a peddler", temporal.in, "the street below");
var HEAR_SONG = new Event(actor.louise, "hear", "the notes of a distant song");
var HEAR_SPARROWS = new Event(actor.louise, "hear", "countless sparrows twittering");
var SHOW_THROUGH_CLOUDS = new Event(thing.patches, "show", null, temporal.through, thing.clouds);
var LOLL = new Event(actor.louise, "loll", null, temporal.on, thing.chair);
var SOB = new Event(actor.louise, "sob");
var SEE_SHOW = new Event(actor.louise, "see", SHOW_THROUGH_CLOUDS);
var STARE_AT_PATCHES = new Event(actor.louise, "stare", null, temporal.at, thing.patches, "dully");
var WAIT = new Event(actor.louise, "wait", null, temporal.for, thing.unknown);
var THINK_WHAT = new Event(actor.louise, "think", "“What is it?”");
var NOT_UNDERSTAND = new Event(actor.louise, "not undertand", thing.unknown);
var FEELS_THING = new Event(actor.louise, "feel", thing.unknown);
var REACH = new Event(thing.unknown, "reach", actor.louise, temporal.through, "the sounds, the scents, the colors of the air", "slowly");
var BREATHE = new Event(actor.louise, "breathe", null, null, null, "heavily");
var BEGIN_TO_RECOGNIZE = new Event(actor.louise, "begin to recognize", thing.unknown);
var RESIST = new Event(actor.louise, "resist", thing.unknown);
var SAY_FREE = new Event(actor.louise, "say", "“Free! Free! Free!”", null, null, "repeatedly");
var LOOK_AHEAD = new Event(actor.louise, "look ahead", null, null, null, "keenly");
var BEAT_FAST = new Event(thing.pulses, "beat", null, null, null, "quickly and peacefully");
var SEE_YEARS = new Event(actor.louise, "see", "a procession of years that would belong to her absolutely");
var OPEN_ARMS = new Event(actor.louise, "open", thing.louisearms);
var WHISPER_FREE = new Event(actor.louise, "whisper +ing", "“Free! Body and soul free!”", null, null, "continuously");
var ASK_TO_ENTER = new Event(actor.josephine, "ask to enter", place.room);
var IMPLORE = new Event(actor.josephine, "say", "“Louise, open the door! I beg; open the door—you will make yourself ill. What are you doing, Louise? For heaven’s sake open the door”", temporal.to, actor.louise);
var REPLY = new Event(actor.louise, "say", "“Go away. I am not making myself ill”", temporal.to, actor.josephine);
var DRINK_ELIXIR = new Event(actor.louise, "drink +ing", "the very elixir of life", temporal.through, "the open window");
var PRAY = new Event(actor.louise, "pray", "that life might be long", null, null, "quickly");
var OPEN_DOOR = new Event(actor.louise, "open", "the door");
var STRIDE_DOWN = new Event(actor.louise, "stride", null, temporal.down, place.stairs, "assuredly");
clock -= 10;
var DECEND = new Event(actor.josephine, "decend", place.stairs, null, null, "supportively");
var OPEN_FRONT = new Event(actor.brently, "open +ing", "the front door", temporal.with, "a latchkey");
var ENTER_HOUSE = new Event(actor.brently, "enter", place.downstairs, null, null, "composedly");
var CRY = new Event(actor.josephine, "cry out");
clock -= 9;
var STAND_AMAZED_AT_CRY = new Event(actor.brently, "stand amazed", CRY);
clock -= 1;
var TRY_TO_HIDE = new Event(actor.richards, "try to hide", actor.brently, temporal.from, actor.louise);
clock -= 9;
var STAND_AMAZED_AT_HIDE = new Event(actor.brently, "stand amazed", TRY_TO_HIDE);
var FALL_DOWN = new Event(actor.louise, "fall down");
var DIE = new Event(actor.louise, "die");
clock += 100;
var ARRIVE = new Event(actor.doctors, "arrive", null, temporal.at, place.downstairs);
var SAY_CAUSE = new Event(actor.doctors, "say", "that Mrs. Mallard died of heart disease—of the joy that kills");

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
