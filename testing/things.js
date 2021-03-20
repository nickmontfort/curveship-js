// Things - an example Curveship-js story
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// This story is meant to explore how different referring expressions
// could interact with narrative.

var metadata = { title: "Things", author: "Nick Montfort", date: "2021",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for i (narrator) and you (narratee). These can be found by looking at the code. Examples:",
examples: [ "group=parts" ] };

// PLACES first
place.garage = new Place("the", "garage");
place.kitchen = new Place("the", "kitchen");

// ACTORS next
actor.jim = new Actor("", "Jim", spatial.in, place.garage, pronoun.masculine);

place.garage.owner = actor.jim;
place.kitchen.owner = actor.jim;

// THINGS next
thing.car = new Thing("a", "Volkswagon", spatial.in, place.garage);
thing.car.owner = actor.jim;

thing.compartment = new Thing("an", "engine compartment", spatial.partOf, thing.car);
thing.engine = new Thing("an", "engine", spatial.partOf, thing.car);
// thing.engine has more than one spatial relation:
// it is both partOf thing.car AND in thing.compartment
thing.intake = new Thing("an", "air intake", spatial.partOf, thing.engine);
thing.coil = new Thing("an", "ignition coil", spatial.partOf, thing.engine);
thing.manifold = new Thing("an", "intake manifold", spatial.partOf, thing.engine);
thing.distributor = new Thing("a", "distributor", spatial.partOf, thing.engine);
thing.pump = new Thing("a", "fuel pump", spatial.partOf, thing.engine);
thing.carburetor = new Thing("a", "carburetor", spatial.partOf, thing.engine);
thing.generator = new Thing("a", "generator", spatial.partOf, thing.engine);
thing.pulley = new Thing("a", "camshaft pulley", spatial.partOf, thing.engine);
thing.fan = new Thing("a", "cooling fan", spatial.partOf, thing.engine);

// Finally, EVENTS
var ENTER_GARAGE = new Event(actor.jim, "enter", place.garage);
var LOOK_AT_CAR = new Event(actor.jim, "take a look at", thing.car);
var EXAMINE_ENGINE = new Event(actor.jim, "examine", thing.engine);
var INSPECT_PARTS = new Event(actor.jim, "inspect",
[thing.intake, thing.coil, thing.manifold, thing.distributor, thing.pump, thing.carburetor, thing.generator, thing.pulley, thing.fan]);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }
