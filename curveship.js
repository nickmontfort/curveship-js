// Curveship-js version 0.4
//  Copyright 2020-2021 Nick Montfort
//
// Licensed under the GNU General Public License v3.0. See the file LICENSE
// for complete terms.
//
// Curveship-js is an implementation of the core ideas of Curveship in ES6.
// It enables narrative variation, the main point of the original (2011) system.
//
// All Curveship narratives need to source these files:
//
//  curveship.js
//  verb.js
//  noun.js
//
// Each narrative must also source a story file and a narrator file
// that combine in a way particular to that narrative:
//
//  story.js
//  narrator.js
//
// Some documentation is at https://nickm.com/curveship/#js

function choice(array) {
  return array[~~(Math.random() * array.length)];
}

function shuffle(array) {
  var i = array.length,
    r, swap;
  while (i > 0) {
    r = Math.floor(Math.random() * i);
    i = i - 1;
    swap = array[i];
    array[i] = array[r];
    array[r] = swap;
  }
  return array;
}

function select_main(telling, order) {
  var order_list = order.split(";");
  var indices = [];
  var new_telling = [];
  for (var i of order_list) {
    if (i.includes("-")) {
      ends = i.split("-");
      for (var j = parseInt(ends[0]); j <= parseInt(ends[1]); j++) {
        indices.push(j);
      }
    } else {
      indices.push(i);
    }
  }
  for (i of indices) {
    new_telling.push(telling[i]);
  }
  return new_telling;
}

var clock = 0;

class Existent {
  constructor() {
    if (new.target === Existent) {
      throw new TypeError("Can't directly instantiate Existent");
    }
  }

  includes(obj) {
    return obj === this;
  }

  configuredAs(spatialRelation, parent) {
    this.spatial = spatialRelation;
    this.parent = parent;
  }
}

class ExistentGroup extends Existent {
  constructor(existentArray) {
    super(null, null);
    this.existentArray = existentArray;
    this.number = existentArray.length;
  }
  includes(obj) {
    return this.existentArray.includes(obj);
  }
  checkGroupings() {
    for (let i = 0; i < this.existentArray.length; i++) { //check for nulls
      let elem = this.existentArray[i];
      if (elem.spatialRelation != spatial.partOf || elem.parent == null) {
        return false;
      }
    }
    for (let i = 0; i < this.existentArray.length - 1; i++) { //check for nulls
      let elem = this.existentArray[i];
      let next = this.existentArray[i + 1];
      if (elem.parent != next.parent) {
        return false;
      }
    }
    return true;
  }
}

// ### GENDERS and AGES ###

genders = ["male", "female", "nonbinary", "neuter"];
ages = ["child", "adult"];

class ValueError extends Error {
  constructor(message) {
    super(message);
  }
}

class Actor extends Existent {
  constructor(spatialRelation, parent, gender, age = "adult") {
    super();
    this.spatial = spatialRelation;
    this.parent = parent;
    if (genders.includes(gender)) {
      this.gender = gender;
    } else {
      throw new ValueError("Given " + gender + "; Supported genders are: " +
        genders.join(", ") + ".");
    }
    if (ages.includes(age)) {
      this.age = age;
    } else {
      throw new ValueError("Given " + age + "; Supported ages are: " +
        genders.join(", ") + ".");
    }
  }
}

var actor = {
  cosmos: new Actor(null, null, "neuter")
};

class Place extends Existent {
  constructor() {
    super();
    this.configuredAs(spatial.in, actor.cosmos);
  }
}

var place = {};

class Thing extends Existent {
  constructor(spatialRelation = "in", parent = actor.cosmos) {
    super();
    this.spatialRelation = spatialRelation;
    this.parent = parent;
  }
}

var thing = {};
var evSeq = [];
var lastNarratedTag = "";

class Event {
  constructor(agent, direct, temporalRelation, indirect) {
    this.agent = Array.isArray(agent) ? new ExistentGroup(agent) : agent;
    this.continuous = false;
    if (direct) {
      this.direct = Array.isArray(direct) ? new ExistentGroup(direct) : direct;
    }
    if (temporalRelation) {
      this.temporal = temporalRelation;
    }
    if (indirect) {
      this.indirect = Array.isArray(indirect) ? new ExistentGroup(indirect) : indirect;
    }
    this.start = clock;
    clock += 10;
    this.duration = 5;
    this.alterations = [];
    evSeq.push(this);
  }
  hasParticipant(actor) {
    return ((this.agent === actor) || (this.direct === actor) || (this.indirect === actor));
  }
  reconfigures(ex, property, val_1, val_2) {
    var alteration = {
      existent: ex,
      property: property,
      before: val_1,
      after: val_2
    };
    this.alterations.push(alteration);
  }
}

var ev = {};

class Names {
  constructor(initial, subsequent) {
    this.initial = initial;
    if (subsequent === null) {
      subsequent = initial;
    }
    this.subsequent = subsequent;
  }
}

class VerbPh {
  constructor(phrase) {
    if (phrase === null) {
      this.verb_phrase = "act";
    } else {
      this.verb_phrase = phrase;
    }
  }
}

class Narrator {
  constructor(world, names, vp) {
    this.names = names;
    this.base_vp = {};
    this.representation = {};
    for (let v in vp) {
      this.base_vp[v] = vp[v].verb_phrase;
      this.representation[v] = {};
      this.representation[v].template = "[SUB] [VP]";
      if (ev[v].hasOwnProperty("direct")) {
        this.representation[v].template += " [DO]";
      }
      if (ev[v].hasOwnProperty("temporal")) {
        this.representation[v].template += " [PREP]";
      }
      if (ev[v].hasOwnProperty("indirect")) {
        this.representation[v].template += " [IO]";
      }
      this.representation[v].subject = world.ev[v].agent.tag;
      if (world.ev[v].hasOwnProperty("direct")) {
        this.representation[v].direct = world.ev[v].direct.tag;
      }
      if (world.ev[v].hasOwnProperty("temporal")) {
        this.representation[v].temporal = world.ev[v].temporal;
      }
      if (world.ev[v].hasOwnProperty("indirect")) {
        this.representation[v].indirect = world.ev[v].indirect.tag;
      }
    }
    this.givens = new Set();
  }
  name(exTag) {
    if (this.givens.has(exTag)) {
      return this.names[exTag].subsequent;
    } else {
      this.givens.add(exTag);
      return this.names[exTag].initial;
    }
  }
  represent(evTag) {
    let result = this.representation[evTag].template;
    result = result.replace("\[SUB\]", this.name(world.ev[evTag].agent.tag));
    result = result.replace("\[VP\]", this.base_vp[evTag] + "s");
    if (world.ev[evTag].hasOwnProperty("direct")) {
      result = result.replace("\[DO\]", this.name(world.ev[evTag].direct.tag));
    }
    if (ev[evTag].hasOwnProperty("temporal")) {
      result = result.replace("\[PREP\]", temporal[world.ev[evTag].temporal]);
    }
    if (ev[evTag].hasOwnProperty("indirect")) {
      result = result.replace("\[IO\]", this.name(world.ev[evTag].indirect.tag));
    }
    result = result += ".";
    return capitalize(result);
  }
}

function addTags(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      object[key].tag = key;
    }
  }
}

class World {
  constructor(places, actors, things, events) {
    addTags(places);
    this.place = places;
    addTags(actors);
    this.actor = actors;
    addTags(things);
    this.thing = things;
    addTags(events);
    this.ev = events;
    this.evSeq = evSeq;
  }
}

function narrate(title, told_by, world, spin, names, reps) {
  var element = document.getElementById("narrative"),
    h1 = document.createElement("h1"),
    h2 = document.createElement("h2"),
    div, telling = [],
    sentence, fix,
    oldReferring, exp = 0,
    i, leftPart, narr;
  narr = new Narrator(world, names, reps);
  document.title = title;
  h1.innerHTML = title;
  element.appendChild(h1);
  h2.innerHTML = "as told by " + told_by;
  element.appendChild(h2);
  for (i = 0; i < world.evSeq.length; i++) {
    telling.push(i);
  }
  if (spin.main) {
    telling = select_main(telling, spin.main);
  }
  if (spin.order === "retrograde") {
    telling.reverse();
  } else if (spin.order === "random") {
    shuffle(telling);
  }
  div = document.createElement("div");
  element.appendChild(div);
  for (i of telling) {
    var e, alt;
    current = world.evSeq[i];
    // Each time we narrate an event, all the "after" alterations of
    // chronologically earlier events must be applied, *and* the prior
    // "before" state of all chronologially later must be applied.
    // That's becasue we could be narrating this event in any order.
    for (e of world.evSeq) {
      if (e.start < current.start) {
        for (alt of e.alterations) {
          alt.existent[alt.property] = alt.after;
        }
      } else {
        for (alt of e.alterations) {
          alt.existent[alt.property] = alt.before;
        }
      }
    }
    div = document.createElement("div");
    sentence = "";
    if (spin.expression_numbers) {
      sentence += "<b>Exp " + exp + ":</b> ";
    }
    exp = exp + 1;
    if (spin.event_numbers) {
      sentence += "<span style='color:red'><b>[Ev " + i + "]</b></span> ";
    }
    if (lastNarratedTag !== "" &&
      current.start < world.ev[lastNarratedTag].start) {
      if (spin.time_markers) {
        sentence += choice(["Before that, ", "Previously, ", "Earlier, ",
          "Beforehand, "
        ]);
        fix = false;
      } else {
        fix = true;
      }
      oldSpeaking = spin.speaking;
      oldReferring = spin.referring;
      if (spin.speaking === "after") {
        if (spin.referring === "posterior") {
          spin.referring = "simple";
        } else if (spin.referring === "simple") {
          spin.referring = "anterior";
        }
      }
      if (spin.speaking === "during") {
        spin.speaking = "after";
      }
      if (spin.speaking === "before") {
        spin.speaking = "during";
      }
      sentence += narr.represent(current.tag);
      spin.speaking = oldSpeaking;
      spin.referring = oldReferring;
    } else {
      sentence += narr.represent(current.tag);
    }
    div.innerHTML = sentence;
    element.appendChild(div);
    lastNarratedTag = current.tag;
  }
  div = document.createElement("div");
  div.innerHTML = "The end.";
  element.appendChild(div);
}

// ### PREPOSITIONS ###

var spatial = { // Maps an abstract spatial relationship to a preposition
  in: "in",
  held_by: "held by",
  on: "on",
  worn_by: "worn by"
};

var temporal = { // Maps an abstract temporal relationship to a preposition
  at: "at",
  by: "by",
  down: "down",
  for: "for",
  from: "from",
  in: "in",
  into: "into",
  on: "on",
  outside: "outside",
  through: "through",
  to: "to",
  up: "up",
  up_to: "up to",
  using: "using",
  with: "with"
};

// ### UTILITY ###

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
