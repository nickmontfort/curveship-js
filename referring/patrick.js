var toldBy = "Patrick Bateman";

names.gate = new Names("gate 23");
names.firstClass = new Names("first class");

names.gateOfficial = new Names("this woman working for the airline");
names.flightAttendant = new Names("a male flight attendant");
names.passenger = new Names("a woman");

names.boardingPass = new Names("a boarding pass");
names.scanner = new BrandNames("a", "barcode scanner", null, "Zebra", "MS471", null, "fixed-mount");
names.seat1A = new Names("seat 1A");
names.seat1B = new Names("seat 1B");

names.jacket = new BrandNames("a", "sportscoat", null, "Michael Andrews", null, null, "bespoke");
names.sneakers = new BrandNames("", "sneakers", null, "Nike", "Air Jordan 4 Retro Kaws", null, "Flight Club");
names.pen = new BrandNames("a", "pen", null, "BIC", null, "from K-Mart on Astor Place", null, false);
names.notepad = new BrandNames("a", "memo pad", null, "Mead", null, "of some bodega");

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
