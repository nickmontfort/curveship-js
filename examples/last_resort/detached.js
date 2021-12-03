// Casual Narrator for The Simulated Bank Robbery - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

var toldBy = "a detached storyteller";

// spin.order = "retrograde";
spin.timePhrases = true;

names.resort_bar = new Names("the resort bar", "the bar");
names.cave = new Names("the home");
names.the_land = new Names("the land");

// The narrator doesn’t know the bank teller’s name, and is not even going
// to mention that she is a bank teller. So in this file, names.teller is not
// assigned a value. This results in a generic term, “woman,” being used.
names.knight = new Names("the knight");
names.dragon = new Names("the dragon", "the scaly woman");
names.bartender = new Names("the bartender");

names.things = new Names("her things");
names.hope = new Names("hope");
names.pina_colada = new Names("a pina colada");
names.far_and_wide = new Names("far and wide");
names.signs = new Names("the signs for the resort");
names.round = new Names("a round");


vp.wake_up = new VerbPh("wake up early");
vp.looking = new VerbPh("look for");
vp.packs = new VerbPh("pack");
vp.travels = new VerbPh("travel");
vp.loses_hope = new VerbPh("lose");
vp.d_checks_in = new VerbPh("check in to the resort");
vp.d_orders = new VerbPh("order");
vp.k_follows = new VerbPh("follow");
vp.k_sits_next_to = new VerbPh("sit next to","at");
vp.says = new VerbPh("pity");
vp.buys_round = new VerbPh("buy");

function run() { narrate(title, toldBy, world, spin, names, vp); }
