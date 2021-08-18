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

var told_by = "a “proper” narrator";

// PLACES

names.house = new Names("the apartment", "the house");
names.kitchen = new Names("the kitchen");

// ACTORS
names.john = new ProperNames("John", "", pronoun.male);
names.doug = new ProperNames("Doug", "", pronoun.male);

// THINGS
names.whale = new Names("the whale", "the beast");
names.note = new Names("a sticky note", "the note");
names.mouth = new Names("the top of whale's mouth", "the whale's mouth");
names.breath = new Names("a deep breath");
names.book = new Names("the book on the table", "the book");
names.violin = new Names("the violin", "the instrument");
names.couch = new Names("the couch");
names.music = new Names("the music");
names.sound = new Names("a terrifying sound", "the howling");
names.knife = new Names("the knife");
names.eyes = new Names("eyes");
names.hour = new Names("an hour");
names.card = new Names("a laminated card", "the card");
names.hands = new Names("hand");

// EVENTS
// doorbin makhfi
vp = {};

vp.stand = new VerbPh("stand up");
vp.move = new VerbPh("go");
vp.stick = new VerbPh("is stuck");
vp.note_content = new VerbPh("say 'Wait for the whale's mouth to open and receive the messenger'");
vp.read_note = new VerbPh("read");
vp.stare = new VerbPh("stare at");
vp.breathe = new VerbPh("take");
vp.pick_up = new VerbPh("pick up");
vp.talk = new VerbPh("say 'MUSIC AND ITS EFFECT ON ANIMALS? I thought you were trying to seduce the guy inside the whale's belly with music to come out. I really have to take a mental health test after this from my roommates'");
vp.nothing = new VerbPh("say nothing back");
vp.argue = new VerbPh("shout 'We have to vacate this house in a few days. If you haven't forgotten, I couldn't keep up with the rent all by myself, and our lease got terminated, so we gotta go and find somewhere else for a while until either you go back to work or I find a roommate who hasn't gone mad!'");
vp.nothing = new VerbPh("say nothing back");
vp.pick_up_violin = new VerbPh("pick up");
vp.play_violin = new VerbPh("start playing");
vp.whisper = new VerbPh("whisper 'If Bach cannot persuade a mysterious, perhaps divine, messenger to come out of the whale's belly, nothing else can'");
vp.raise = new VerbPh("raise to crescendo");
vp.stop_music = new VerbPh("muffle");
vp.stare_2 = new VerbPh("stare at");
vp.shake = new VerbPh("shake for a while");
vp.shake_ap = new VerbPh("tremble");
vp.stop = new VerbPh("stop suddenly");
vp.blow = new VerbPh("trump for three and a half minute");
vp.play_violin_2 = new VerbPh("start again");
vp.no_resp = new VerbPh("do not respond");
vp.talk_3 = new VerbPh("say 'It would've destroyed the whole building if it had moved more! I have been tolerating this filth and flesh in my house for a month. Enough is enough!'");
vp.pick_up_knife = new VerbPh("pick up");
vp.stab = new VerbPh("stab");
vp.close = new VerbPh("close");
vp.enter = new VerbPh("enter");
vp.pass = new VerbPh("pass");
vp.out = new VerbPh("come out");
vp.bloody = new VerbPh("is bloody");
vp.summon = new VerbPh("summon");
vp.card = new VerbPh("have");
vp.stare_3 = new VerbPh("stare at");
vp.card_content = new VerbPh("say 'If you had any problems or did not receive a response, call the number below: +1 (857) 204 0988'");

function run() { narrate(title, told_by, world, spin, names, vp); }
