var toldBy = "Jane Austen";

spin.speaking = "after";
spin.main = "2;0,3-14";

names.gate = new Names("the turnstile");
names.firstClass = new Names("the first class cabin");

names.gateOfficial = new Names("an airline employee", "the employee");
names.flightAttendant = new Names("a flight attendant", "the attendant");
names.celebrity = new ProperNames("Harry", "Styles", pronoun.masculine, "a celebrity", "Sir");
names.passenger = new ProperNames("Carly", "Fiorina", pronoun.feminine, "an executive", "Ms.");

names.boardingPass = new Names("a boarding pass");
names.scanner = new Names("a scanner");
names.seat1A = new Names("seat 1A");
names.seat1B = new Names("seat 1B");

names.jacket = new Names("a sportscoat");
names.sneakers = new Names("casual shoes");
names.pen = new Names("a pen");
names.notepad = new Names("a notepad");

vp.scan = new VerbPh("hold");
vp.beep = new VerbPh("beep");
vp.gasp = new VerbPh("gasp");
vp.pocket = new VerbPh("place");
vp.depart = new VerbPh("depart");
vp.board = new VerbPh("walk");
vp.sit = new VerbPh("sit");
vp.beSurprised = new VerbPh("react");
vp.see = new VerbPh("notice");
vp.confront = new VerbPh("sneer");
vp.withdraw = new VerbPh("get");
vp.show = new VerbPh("show");
vp.apologize = new VerbPh("mutter");
vp.obtain = new VerbPh("grab");
vp.request = new VerbPh("say");

function run() { narrate(title, toldBy, world, spin, names, vp); }
