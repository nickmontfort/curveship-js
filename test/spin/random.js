var toldBy = "a narrator of confusion";

spin.order = "random";

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("play");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
