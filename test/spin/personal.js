var toldBy = "John";

spin.i = actor.john;
spin.you = actor.mary;

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("is playing");
vp.noticeJimmy = new VerbPh("see");
vp.noticeMary = new VerbPh("notice");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
