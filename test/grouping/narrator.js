var toldBy = "a narrator";

spin.groupings = "properties";

names.room = new Names("a room");
names.john = new Names("John");
names.bike = new Names("the bike");
names.tire = new Names("the tire");
names.handlebar = new Names("the handlebar");
names.seat = new Names("the seat");
names.shell = new Names("the shell");
names.cover = new Names("the cover");
names.table = new Names("a table");
// names.apple OMITTED intentionally
names.cherry = new Names("a cherry");
names.strawberry = new Names("a strawberry");
names.blueberry = new Names("a blueberry");

// names.fruit = new CategoryNames("fruit");
// names.fujiApple = new CategoryNames("apple", "Fuji");
// names.cherries = new CategoryNames("cherries");
// names.strawberries = new CategoryNames("strawberries");
// names.blueberry = new CategoryNames("blueberry");
// names.berries = new CategoryNames("berry");
// names.humans = new CategoryNames("human");

vp.dismount = new VerbPh("get off");
vp.inspect = new VerbPh("examine");
vp.touch = new VerbPh("palpate");
vp.ogle = new VerbPh("eye");     // TODO seems like we should only need to
vp.lick = new VerbPh("lick");    // define the action to VP mapping once
vp.sniff = new VerbPh("smell");
vp.eat = new VerbPh("eat");

function run() { narrate(title, toldBy, world, spin, names, vp); }
