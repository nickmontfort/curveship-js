var toldBy = "a parable teller";

spin.main = "4-12;14";
spin.speaking = "after";

names.gate = new Names("the gate");
names.firstClass = new Names("the first class cabin");

names.flightAttendant = new Names("a flight attendant");

names.boardingPass = new Names("a boarding pass");
names.seat1A = new Names("a wide seat");
names.seat1B = new Names("a wide seat");

names.jacket = new Names("a jacket");
names.sneakers = new Names("sneakers");
names.pen = new Names("a pen");
names.notepad = new Names("a notepad");

vp.depart = new VerbPh("walk from");
vp.board = new VerbPh("go");
vp.sit = new VerbPh("sit");
vp.beSurprised = new VerbPh("is surprised");
vp.see = new VerbPh("notice");
vp.confront = new VerbPh("say");
vp.withdraw = new VerbPh("take");
vp.show = new VerbPh("show");
vp.apologize = new VerbPh("apologize");
delete ev.apologize.direct;
delete ev.apologize.temporal;
delete ev.apologize.indirect;
vp.obtain = new VerbPh("obtain");
vp.request = new VerbPh("say");

function run() { narrate(title, toldBy, world, spin, names, vp); }
