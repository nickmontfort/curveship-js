var spin = {};

let told_by = "a narrator";

names = {};

names.room = new Names("a room", "the room");

names.eater = new Names("a fruit-eater", "the fruit-eater");

names.table = new Names("a table", "the table");

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

vp.eatBerries = new VerbPh("eat"); // TODO seems like we should only need to
vp.eat = new VerbPh("eat");       // define the action to VP mapping once
vp.eatApple = new VerbPh("eat");
vp.eatSelf = new VerbPh("eat");


// SET UP for narrating

function run() { narrate(title, told_by, world, spin, names, vp); }
