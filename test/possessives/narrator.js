var toldBy = "a narrator who groups by properties";

spin.groupings = "properties";

names.room = new Names("a room");
names.john = new Names("John");
names.odysseus = new ProperNames("Odysseus", null, null, null, null, "Odysseus’");
names.bike = new Names("the bike");
names.tire = new Names("the tire");
names.handlebar = new Names("the handlebar");
names.seat = new Names("the seat");
names.backpack = new Names("a backpack");
names.raft = new Names("a raft");

vp.layDown = new VerbPh("lay down");
vp.pickUp = new VerbPh("grab");
vp.prepare = new VerbPh("ready");
vp.inspect = new VerbPh("examine");
vp.swivel = new VerbPh("turn");
vp.sigh = new VerbPh("sigh");
vp.repair = new VerbPh("refurbish");

function run() { narrate(title, toldBy, world, spin, names, vp); }
