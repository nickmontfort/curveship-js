var toldBy = "a narrator of confusion";

spin.order = "random";

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("is playing");
vp.noticeJimmy = new VerbPh("see");
vp.noticeMary = new VerbPh("notice");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
