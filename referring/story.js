// First Class
//  Copyright 2021 Nick Montfort

var title = "First Class";

// EXISTENTS: Places, Actors, Things in that order

place.gate = new Place();
place.firstClass = new Place();

actor.celebrity = new Actor(place.gate, "male");
actor.gateOfficial = new Actor(place.gate, "female");
actor.flightAttendant = new Actor(place.firstClass, "male");
actor.passenger = new Actor(thing.seat1A, "female");

thing.seat1A = new Thing(place.firstClass);
thing.femaleUniform = new Thing(actor.gateOfficial);
thing.femaleUniform.owner = actor.gateOfficial;
thing.maleUniform = new Thing(actor.flightAttendant);
thing.maleUniform.owner = actor.flightAttendant;
thing.sneakers = new Thing(actor.celebrity);
thing.sneakers.owner = actor.celebrity;
thing.jacket = new Thing(actor.celebrity);
thing.jacket.owner = actor.celebrity;
thing.sunglasses = new Thing(actor.celebrity);
thing.sunglasses.owner = actor.celebrity;
thing.scanner = new Thing(place.gate);
thing.boardingPass = new Thing(actor.celebrity);
thing.boardingPass.owner = actor.celebrity;
thing.seat1B = new Thing(place.firstClass);
thing.notepad = new Thing();
thing.pen = new Thing();

// EVENTS

ev.scan = new Event(actor.celebrity, thing.boardingPass, temporal.against, thing.scanner);
ev.beep = new Event(thing.scanner);
ev.gasp = new Event(actor.gateOfficial);
ev.pocket = new Event(actor.celebrity, thing.boardingPass, temporal.in, thing.jacket);
ev.pocket.alters(thing.boardingPass, "location", actor.celebrity, thing.jacket);
ev.depart = new Event(actor.celebrity, place.gate);
ev.board = new Event(actor.celebrity, null, temporal.to, place.firstClass);
ev.sit = new Event(actor.celebrity, null, temporal.in, thing.seat1B);
ev.beSurprised = new Event(actor.passenger);
ev.see = new Event(actor.flightAttendant, thing.sneakers);
ev.confront = new Event(actor.flightAttendant, "sir, I believe you’re in the wrong cabin", temporal.to, actor.celebrity);
ev.withdraw = new Event(actor.celebrity, thing.boardingPass, temporal.from, thing.jacket);
ev.withdraw.alters(thing.boardingPass, "location", thing.jacket, actor.celebrity);
ev.show = new Event(actor.celebrity, thing.boardingPass, temporal.to, actor.flightAttendant);
ev.apologize = new Event(actor.flightAttendant, "oh, I’m sorry", temporal.to, actor.celebrity);
ev.obtain = new Event(actor.flightAttendant, [thing.pen, thing.notepad]);
ev.obtain.alters(thing.pen, "location", null, actor.flightAttendant);
ev.obtain.alters(thing.notepad, "location", null, actor.flightAttendant);
ev.request = new Event(actor.flightAttendant, "I shouldn’t ask, but ... my daughter would really love to have your autograph", temporal.to, actor.celebrity);

var world = new World(place, actor, category, thing, ev);
