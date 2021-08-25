var toldBy = "a narrator who leaves one thing out";

spin.main = "0;2-3";

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("play");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
