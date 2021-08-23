var spin = {
  groupings: "properties",
};

let told_by = "a narrator";

names = {};

names.room = new Names("a room");
names.john = new Names("John");
names.odysseus = new ProperNames("Odysseus", null, null, null, null, "Odysseus’")
names.bike = new Names("the bike");
names.tire = new Names("the tire");
names.handlebar = new Names("the handlebar");
names.seat = new Names("the seat");
names.backpack = new Names("a backpack");
names.raft = new Names("a raft");


vp = {};

vp.layDown = new VerbPh("lay down");
vp.pickUp = new VerbPh("grab");
vp.inspect = new VerbPh("examine");
vp.swivel = new VerbPh("turn");
vp.sigh = new VerbPh("sigh");
vp.repair = new VerbPh("refurbish");

function run() { narrate(title, told_by, world, spin, names, vp); }
