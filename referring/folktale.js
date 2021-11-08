var toldBy = "a parable teller";

spin.speaking = "after";
spin.preface = "One day...";
spin.postface = "The end.";

names.gate = new Names("the gate");
names.firstClass = new Names("the first class cabin");
names.celebrity = new Names("the Frog Prince", "the prince");

names.flightAttendant = new Names("a flight attendant");

names.boardingPass = new Names("a boarding pass");
names.scanner = new Names("a panel on the airport turnstile");
names.seat1B = new Names("a comfortable seat");

names.jacket = new Names("a jacket");
names.sneakers = new Names("sneakers");
names.pen = new Names("a pen");
names.notepad = new Names("a notepad");

vp.scan = new VerbPh("hold");
vp.beep = new VerbPh("beep");
vp.gasp = new VerbPh("gasp");
vp.pocket = new VerbPh("place");
vp.depart = new VerbPh("walk from");
vp.board = new VerbPh("enter");
vp.sit = new VerbPh("sit");
vp.beSurprised = new VerbPh("pucker up involuntarily");
vp.see = new VerbPh("notice");
vp.confront = new VerbPh("say");
delete ev.confront.temporal;
delete ev.confront.indirect;
vp.withdraw = new VerbPh("take");
vp.show = new VerbPh("show");
vp.apologize = new VerbPh("apologize by saying");
delete ev.apologize.temporal;
delete ev.apologize.indirect;
vp.obtain = new VerbPh("obtain");
vp.request = new VerbPh("say");
delete ev.request.temporal;
delete ev.request.indirect;

function run() { narrate(title, toldBy, world, spin, names, vp); }
