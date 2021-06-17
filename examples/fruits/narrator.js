var spin = {};

let told_by = "a narrator";

names = {};

names.room = new Names("a room", "the room");

names.eater = new Names("a fruit-eater", "the fruit-eater");

names.apple = new NameByCategory(); // TODO this isn't needed explicitly,
                                // the system must fall back to naming by
                                // category or if no category "generically"
names.strawberry = new Names("a strawberry", "the strawberry");
names.cherry = new Names("a cherry", "the cherry");

names.fruit = new CategoryNames("fruit");
names.berries = new CategoryNames("berry");
names.humans = new CategoryNames("human");
names.galaApple = new CategoryNames("apple", "Gala");

vp = {};

vp.eatBerries = new VerbPh("eat");
vp.eat = new VerbPh("eat");
vp.eatApple = new VerbPh("eat");
vp.eatSelf = new VerbPh("eat");

function run() { narrate(title, told_by, world, spin, names, vp); }
