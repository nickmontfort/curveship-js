// Curveship-js test narrator
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.

var toldBy = "a backwards-looking narrator";

spin.order = "retrograde";
spin.timePhrases = true;

vp.lookAround = new VerbPh("look around");
vp.play = new VerbPh("is playing");
vp.noticeJimmy = new VerbPh("see");
vp.noticeMary = new VerbPh("notice");
vp.greet = new VerbPh("greet");
vp.interrupt = new VerbPh("interrupt");

function run() { narrate(title, toldBy, world, spin, names, vp); }
