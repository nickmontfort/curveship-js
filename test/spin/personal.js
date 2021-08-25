var toldBy = "John";

spin.i = "john";
spin.you = "mary";

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("play");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
