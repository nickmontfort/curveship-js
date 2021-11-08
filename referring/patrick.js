var toldBy = "Patrick Bateman";

names.gate = new Names("gate 23");
names.firstClass = new Names("first class");

names.gateOfficial = new Names("this woman working for the airline");
names.flightAttendant = new Names("a male flight attendant");
names.passenger = new Names("a woman");

names.boardingPass = new Names("a boarding pass");
names.scanner = new BrandNames("a barcode scanner", "a Zebra", "an MS471", null, "a fixed-mount");
names.seat1A = new Names("seat 1A");
names.seat1B = new Names("seat 1B");

names.jacket = new BrandNames("a sportscoat", "a Michael Andrews", null, null, "a bespoke");
names.sneakers = new BrandNames("(sneakers)", "Air Jordan 4", "Retro Kaws", "purchased from Flight Club");
names.pen = new BrandNames("a pen", "a BIC", null, "from K-Mart on Astor Place");
names.notepad = new BrandNames("a memo pad", "a Mead", null, "bought at Key Foods");

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
