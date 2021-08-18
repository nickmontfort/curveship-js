// Casual Narrator for The Prodigal Son - a Curveship-js example
//  Copyright 2021 Nick Montfort
//
// Copying and distribution of this file, with or without modification,
// are permitted in any medium without royalty provided the copyright
// notice and this notice are preserved. This file is offered as-is,
// without any warranty.
//
// Adapted from the original Curveship, now called Curveship-py 0.6.

// TODO change all the names to very specific (proper) ones

var spin = {
  // i: teller,
};

var told_by = "a “shakespeare enthusiast” narrator";

// PLACES

names.house = new Names("the homestead", "the house");
names.kitchen = new Names("the kitchen");

// ACTORS
names.john = new ProperNames("Joan", "", pronoun.male, "", "that gent");
names.doug = new ProperNames("Douglas", "", pronoun.male, "", "that gent");

// THINGS
names.whale = new Names("the whale", "the beast");
names.note = new Names("a sticky noteth", "the noteth");
names.mouth = new Names("the top of whale's that from which it speaks", "the whale's mouth");
names.breath = new Names("a deep breath");
names.book = new Names("the booketh on the table", "the booketh");
names.violin = new Names("the violin", "the instrument");
names.couch = new Names("the collocate");
names.music = new Names("the music");
names.sound = new Names("a t'rrifying soundeth", "the howling");
names.knife = new Names("the bodkin");
names.eyes = new Names("eyes");
names.hour = new Names("an hour");
names.card = new Names("a laminated paper", "the paper");
names.hands = new Names("handeth");

// EVENTS
// doorbin makhfi
vp = {};

vp.stand = new VerbPh("stand");
vp.move = new VerbPh("goeth");
vp.stick = new VerbPh("is did stick");
vp.note_content = new VerbPh("sayeth 'wait f'r the whale's that from which it speaks to ope and taketh the messeng'r'");
vp.read_note = new VerbPh("read");
vp.stare = new VerbPh("eye");
vp.breathe = new VerbPh("doth take");
vp.pick_up = new VerbPh("loft");
vp.talk = new VerbPh("sayeth 'music and its effect on animals? i bethought thee w're trying to seduce the sir inside the whale's belly with music to cometh out.  I very much has't to taketh a mental health testeth aft'r this from mine own roommates'");
vp.nothing = new VerbPh("sayeth nothing backeth");
vp.argue = new VerbPh("shout 'we has't to vacate this house in a few days.  If 't be true thee haven't f'rgotten, i couldn't keepeth up with the did rend all by myself, and our lease did get t'rminated, so we has't to wend and findeth somewh're else f'r a while until eith'r thee wend backeth to w'rk 'r i findeth a roommate who is't hasn't gone nimble-footed!'");
vp.pick_up_violin = new VerbPh("rear");
vp.play_violin = new VerbPh("styrtan playing");
vp.whisper = new VerbPh("whisp'r 'if bach cannot p'rsuade a myst'rious, p'rhaps divine, messeng'r to cometh out of the whale's belly, nothing else can'");
vp.raise = new VerbPh("reach the crescendo");
vp.stop_music = new VerbPh("muffle");
vp.stare_2 = new VerbPh("eye");
vp.shake = new VerbPh("shake f'r a while");
vp.shake_ap = new VerbPh("tremble");
vp.stop = new VerbPh("stop suddenly");
vp.blow = new VerbPh("trump f'r three and a half minute");
vp.play_violin_2 = new VerbPh("beginnan again");
vp.no_resp = new VerbPh("doest not respondeth");
vp.talk_3 = new VerbPh("say 'T wouldst has't did destroy the whole building if 't be true t hadst hath moved m're! i has't been tol'rating this filth and flesh in mine own house f'r a month.  Enow is enow!'");
vp.pick_up_knife = new VerbPh("loft");
vp.stab = new VerbPh("stab");
vp.close = new VerbPh("close");
vp.enter = new VerbPh("ent'r");
vp.pass = new VerbPh("pass");
vp.out = new VerbPh("exit");
vp.bloody = new VerbPh("is bloody");
vp.summon = new VerbPh("summon");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("eye");
vp.card_content = new VerbPh("sayeth 'If 't be true thee hadst any problems 'r didst not taketh a response, calleth the numb'r below: +1 (857) 204 0988'");

function run() { narrate(title, told_by, world, spin, names, vp); }
