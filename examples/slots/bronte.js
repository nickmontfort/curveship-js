// In the style of "Jane Eyre" by Charlotte Bronte

var toldBy = "a Bronte-esque narrator (??)";
spin.main = "0-9";
spin.i = actor.gambler;

// Places
names.casino = new Names("the Casino");

// Actors
names.attendant = new Names("a stern-looking serviceman", "the serviceman");
names.addict = new Names("an unfortunately hysterical woman", pronoun.feminine);

// Things
names.machine = new Names("a slot machine");
names.platter = new Names("an empty silver platter", "the platter");
names.slots = new Names("her numbers which spin silently and ceaselessly", "my own share of those numbers, their flickering shine");
names.brain = new Names("my prepared section of grey matter");
names.newSlots = new Names("the numbers");

// Verb phrases
vp.arrive = new VerbPh("enter");
vp.chooseMachine = new VerbPh("select");
vp.attendantAsk = new VerbPh("say");
vp.attendantOffer = new VerbPh("hold out");
vp.addictInterrupt = new VerbPh("laugh mirthlessly");
vp.gamblerLook = new VerbPh("have waited the long day");
vp.transferBrain = new VerbPh("place without a word");
vp.attendantSmile = new VerbPh("smile pleasantly");
vp.dismiss = new VerbPh("implore");
vp.beginPlay = new VerbPh("begin to spin");

function run() { narrate(title, toldBy, world, spin, names, vp); }
