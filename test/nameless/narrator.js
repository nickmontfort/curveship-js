var spin = {
  groupings: "properties",
};

let told_by = "a narrator";

names = {};

vp = {};

vp.see = new VerbPh("see");
vp.taunt = new VerbPh("pester");
// vp.sigh = new VerbPh("sigh");
// vp.throw = new VerbPh("throw");
// vp.catch = new VerbPh("catch");
// vp.give = new VerbPh("give");
vp.eat = new VerbPh("eat");

function run() { narrate(title, told_by, world, spin, names, vp); }
