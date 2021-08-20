var spin = {
  groupings: "properties",
};

let told_by = "a narrator";

names = {};

vp = {};

vp.taunt = new VerbPh("pester");
vp.sigh = new VerbPh("sigh");
vp.throw = new VerbPh("throw");
vp.catch = new VerbPh("catch");
vp.give = new VerbPh("give");
// vp.sigh ...
// vp.throw ...
// vp.give ...
vp.eat = new VerbPh("eat");

function run() { narrate(title, told_by, world, spin, names, vp); }
