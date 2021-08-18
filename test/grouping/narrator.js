var spin = {
  groupings: "properties",
};

let told_by = "a narrator";

names = {};

names.room = new Names("a room", "the room");
names.john = new Names("John");
names.bike = new Names("the bike");
names.tire = new Names("the tire");
names.handlebar = new Names("the handlebar");
names.seat = new Names("the seat");
names.shell = new Names("the shell");
names.cover = new Names("the cover");
names.table = new Names("a table", "the table");
names.apple = new NameByCategory(); // TODO this isn't needed explicitly,
                                // the system must fall back to naming by
                                // category or if no category "generically"
names.cherry = new Names("a cherry", "the cherry");
names.strawberry = new Names("a strawberry", "the strawberry");
names.blueberry = new Names("a blueberry", "the blueberry");

names.fruit = new CategoryNames("fruit");
names.fujiApple = new CategoryNames("apple", "Fuji");
names.cherries = new CategoryNames("cherries");
names.strawberries = new CategoryNames("strawberries");
names.blueberry = new CategoryNames("blueberry");
names.berries = new CategoryNames("berry");
names.humans = new CategoryNames("human");

vp = {};

vp.dismount = new VerbPh("get off");
vp.inspect = new VerbPh("examine");
vp.touch = new VerbPh("palpates");
vp.ogle = new VerbPh("eye"); // TODO seems like we should only need to
vp.lick = new VerbPh("lick");       // define the action to VP mapping once
vp.sniff = new VerbPh("smell");
vp.eat = new VerbPh("eat");


// SET UP for narrating

function run() { narrate(title, told_by, world, spin, names, vp); }
