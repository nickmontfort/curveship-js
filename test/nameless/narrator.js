var toldBy = "a narrator unaware of specifics";

spin.groupings = "properties";

names.apple = new Names(""); // always use a pronoun to refer to the apple

vp.see = new VerbPh("see");
vp.taunt = new VerbPh("pester");
// vp.sigh = new VerbPh("sigh");
// vp.throw = new VerbPh("throw");
// vp.catch = new VerbPh("catch");
// vp.give = new VerbPh("give");
vp.eat = new VerbPh("eat");
// vp.help = new VerbPh("help");

function run() { narrate(title, toldBy, world, spin, names, vp); }
