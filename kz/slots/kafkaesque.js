// In the style of "Before the Law" by Franz Kafka

var toldBy = "a Kafka-esque narrator (??)";
spin.main = "0-9";

// Places
names.casino = new Names("the Casino");

// Actors
names.attendant = new Names("a service attendant");
names.gambler = new Names("the gambler");
names.addict = new Names("the numb woman nearby", pronoun.feminine);

// Things
names.machine = new Names("a slot machine");
names.platter = new Names("an empty platter", "the platter");
names.slots = new Names("her spinning numbers");
names.brain = new Names("his brain");
names.newSlots = new Names("his numbers")

// Verb Phrases
vp.arrive = new VerbPh("arrive before");
vp.chooseMachine = new VerbPh("select");
vp.attendantAsk = new VerbPh("say");
vp.attendantOffer = new VerbPh("hold out");
vp.addictInterrupt = new VerbPh("cackle");
vp.gamblerLook = new VerbPh("have waited the long day");
vp.transferBrain = new VerbPh("place without a word");
vp.attendantSmile = new VerbPh("smile pleasantly");
vp.dismiss = new VerbPh("say , with his eyes fixed on the screen");
vp.beginPlay = new VerbPh("begin to spin");


function run() { narrate(title, toldBy, world, spin, names, vp); }
