var toldBy = "a spare author";

spin.main = "1-2;0;4-14"
spin.speaking = "after";

names.gate = new Names("the gate");
names.firstClass = new Names("the first class seating area");

names.gateOfficial = new Names("the airline employee");
names.flightAttendant = new Names("a flight attendant");
names.celebrity = new ProperNames("Harry", "Styles");

names.boardingPass = new Names("a boarding pass");
names.scanner = new Names("the scanner");
names.seat1B = new Names("a seat in the first row");

names.jacket = new Names("a jacket");
names.sneakers = new Names("sneakers");
names.pen = new Names("a pen");
names.notepad = new Names("a notepad");

vp.scan = new VerbPh("hold");
vp.beep = new VerbPh("beep");
vp.gasp = new VerbPh("gasp");
vp.pocket = new VerbPh("place");
vp.depart = new VerbPh("depart");
vp.board = new VerbPh("walk");
vp.sit = new VerbPh("sit");
vp.beSurprised = new VerbPh("express a bit of surprise");
vp.see = new VerbPh("notice");
vp.confront = new VerbPh("say");
delete ev.confront.temporal;
delete ev.confront.indirect;
vp.withdraw = new VerbPh("take");
vp.show = new VerbPh("show");
vp.apologize = new VerbPh("mutter");
delete ev.apologize.temporal;
delete ev.apologize.indirect;
vp.obtain = new VerbPh("procure");
vp.request = new VerbPh("say");
delete ev.request.temporal;
delete ev.request.indirect;

function run() { narrate(title, toldBy, world, spin, names, vp); }
