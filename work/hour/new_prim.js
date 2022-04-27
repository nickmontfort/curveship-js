// Prim Narrator for The Story of an Hour - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "a prim narrator";

spin.groupings = "category";

// PLACES

names.downstairs = new Names("the Mallard house");
names.office = new Names("the newspaper office");
names.room = new Names("the room");
names.stairs = new Names("the stairs");
names.outside = new Names("outside", "outside the Mallard house");
names.rail = new Names("a rail line");

// ACTORS

names.louise = new ProperNames("Louise", "Mallard", pronoun.feminine, "the wife", "Mrs.");
names.brently = new ProperNames("Brently", "Mallard", pronoun.masculine, "the husband", "Mr.");
names.richards = new ProperNames("Richards", null, pronoun.masculine, "the friend");
names.josephine = new ProperNames("Josephine", null, pronoun.feminine, "the sister");
names.peddler = new Names("a peddler");

// THINGS

names.train = new Names("a train", "the iron horse");
names.josephinesArms = new Names("arms");
names.louisesArms = new Names("arms");
names.chair = new Names("a comfortable chair", "the chair");
names.trees = new Names("some trees");
names.patches = new Names("some patches of blue sky");
names.clouds = new Names("the clouds");
names.unknown = new Names("some unknown thing");
names.pulse = new Names("pulse");
names.rain = new Names("the delicious breath of rain");
names.air = new Names("the air");
names.airFeatures = new Names("the sounds, the scents, the colors of the air");
names.procession = new Names("a procession of years that would belong to her absolutely");
names.door = new Names("the door");
names.frontDoor = new Names("the front door");
names.latchkey = new Names("a latchkey");
names.street = new Names("the street below");
names.song = new Names("the notes of a distant song");
names.sparrow = new Names("countless sparrows twittering");
names.elixir = new Names("the very elixir of life");
names.window = new Names("the open window");

// GROUPINGS

groupings.doctors = [actor.doctorSmith, actor.doctorJones];

names.doctors = new GroupNames("the pair of doctors", "the duo", asOne=true);
// names.doctors = new GroupNames("the doctors");

vp.shudder = new VerbPh("shudder to think that life might be long");
vp.crash = new VerbPh("crash");
vp.farAway = new VerbPh("is far away");
vp.doesNotKnow = new VerbPh("know");
vp.learnOfCrash = new VerbPh("learn");
vp.listedAsDead = new VerbPh("is listed as dead");
vp.gasp = new VerbPh("gasp");
vp.confirmDeath = new VerbPh("confirm");
vp.hasten = new VerbPh("hasten");
vp.tellJosephine = new VerbPh("tell");
vp.tellMrsMallard = new VerbPh("tell");
vp.isNotParalyzed = new VerbPh("become paralyzed");
vp.weep = new VerbPh("weep");
vp.finishWeeping = new VerbPh("finish weeping");
vp.goToRoom = new VerbPh("go");
vp.sitInChair = new VerbPh("sit");
vp.seeTrees = new VerbPh("see");
vp.senseBreathOfRain = new VerbPh("sense");
vp.hearPeddler = new VerbPh("hear");
vp.hearSong = new VerbPh("hear");
vp.hearSparrows = new VerbPh("hear");
vp.showThroughClouds = new VerbPh("show");
vp.loll = new VerbPh("loll");
vp.sob = new VerbPh("sob");
vp.seeShow = new VerbPh("see");
vp.stareAtPatches = new VerbPh("stare");
vp.wait = new VerbPh("wait");
vp.thinkWhat = new VerbPh("think");
vp.notUnderstand = new VerbPh("understand");
vp.feelsThing = new VerbPh("feel");
vp.reach = new VerbPh("reach");
vp.breathe = new VerbPh("breathe");
vp.beginToRecognize = new VerbPh("begin to recognize");
vp.resist = new VerbPh("resist");
vp.sayFree = new VerbPh("say");
vp.lookAhead = new VerbPh("look ahead");
vp.beatFast = new VerbPh("beat");
vp.seeYears = new VerbPh("see");
vp.openArms = new VerbPh("open");
vp.whisperFree = new VerbPh("whisper");
vp.askToEnter = new VerbPh("ask to enter");
vp.implore = new VerbPh("say");
vp.reply = new VerbPh("say");
vp.drinkElixir = new VerbPh("drink");
vp.pray = new VerbPh("pray that life might be long");
vp.openDoor = new VerbPh("open");
vp.strideDown = new VerbPh("stride");
vp.decend = new VerbPh("decend");
vp.openFront = new VerbPh("open");
vp.enterHouse = new VerbPh("enter");
vp.cry = new VerbPh("cry out");
vp.standAmazedAtCry = new VerbPh("stand amazed");
vp.tryToHide = new VerbPh("try to hide");
vp.standAmazedAtHide = new VerbPh("stand amazed");
vp.fallDown = new VerbPh("fall down");
vp.die = new VerbPh("die");
vp.sayCause = new VerbPh("say that");
vp.arrive = new VerbPh("arrive");

function run() { narrate(title, toldBy, world, spin, names, gorupings, vp); }
