// Casual Narrator for The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort

var toldBy = "a parable teller";

names.gate = new Names("the gate");
names.firstClass = new Names("the first class seating area");

names.gateOfficial = new Names("an airline employee");
names.flightAttendant = new Names("a flight attendant");

names.boardingPass = new Names("a boarding pass");
names.scanner = new Names("a scanner");
names.seat1A = new Names("seat 1A");
names.seat1B = new Names("seat 1B");

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
vp.withdraw = new VerbPh("take");
vp.show = new VerbPh("show");
vp.apologize = new VerbPh("mutter");
vp.obtain = new VerbPh("procure");
vp.request = new VerbPh("say");

function run() { narrate(title, toldBy, world, spin, names, vp); }
