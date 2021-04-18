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

// ### PRONOUNS ###
// Need to be defined here so Actor can use them by default

class PronounSet {
  constructor(thirdPersonSingular) {
    this.pronoun = [];
    this.pronoun.push([
      [],
      [],
      [],
    ]); // There is no 0th person or number
    this.pronoun.push([
      [],
      ["I", "me", "my", "mine", "myself"],
      ["we", "us", "our", "ours", "ourselves"]
    ]);
    this.pronoun.push([
      [],
      ["you", "you", "your", "yours", "yourself"],
      ["you", "you", "your", "yours", "yourselves"]
    ]);
    this.pronoun.push([
      [], thirdPersonSingular,
      ["they", "them", "their", "theirs", "themselves"]
    ]);
  }
  getSubject(person, number = 1) {
    return this.pronoun[person][number][0];
  }
  getObject(person, number = 1) {
    return this.pronoun[person][number][1];
  }
  getPossessiveAdj(person, number = 1) {
    return this.pronoun[person][number][2];
  }
  getPossessivePronoun(person, number = 1) {
    return this.pronoun[person][number][3];
  }
  getReflexive(person, number = 1) {
    return this.pronoun[person][number][4];
  }
}

var pronoun = {};
pronoun.feminine = new PronounSet(["she", "her", "her", "hers", "herself"]);
pronoun.masculine = new PronounSet(["he", "him", "his", "his", "himself"]);
pronoun.neuter = new PronounSet(["it", "it", "its", "its", "itself"]);
pronoun.unknownBinary = new PronounSet(["he or she", "him or her", "his or her", "his or hers", "himself or herself"]);
pronoun.nonBinary = new PronounSet(["they", "them", "their", "theirs", "themself"]); // If you prefer, you can make the last entry "themselves"

class ExistentGroup extends Existent {
  constructor(existentArray) {
    super(null, null);
    this.existentArray = existentArray;
    this.number = existentArray.length;
  }
  pronominalization(role, spin, ev) {
    return false;
  }
  includes(obj) {
    return this.existentArray.includes(obj);
  }
  addToGivens() {
    this.existentArray.forEach(existent => givens.add(existent));
  }
  getNounPhrase(role, spin, ev) {
    var phrase = "";
    var isGroup = (spin.group == "parts");
    if (isGroup && this.existentArray.length >= 1 && this.checkGroupings()) {
      return this.getGroupingPhrase(role, spin, ev);
    }

    if (this.existentArray.length == 2) {
      var first = this.existentArray[0].getNounPhrase(role, spin, ev),
        second = this.existentArray[1].getNounPhrase(role, spin, ev);
      if (first === "I") {
        [first, second] = [second, first];
      }
      phrase = first + " and " + second;
    } else {
      for (var i = 0; i < this.existentArray.length - 1; i++) {
        phrase += this.existentArray[i].getNounPhrase(role, spin, ev) + ", ";
      }
      phrase += "and " + this.existentArray[this.existentArray.length - 1].getNounPhrase(role, spin, ev);
    }
    return phrase;
  }
  getPossessiveAdj(spin, ev) {
    var phrase = "";
    if (this.existentArray.length == 2) {
      var first = this.existentArray[0].getPossessiveAdj(spin, ev),
        second = this.existentArray[1].getPossessiveAdj(spin, ev);
      phrase = first + " and " + second;
    }
    for (var i = 0; i < this.existentArray.length - 1; i++) {
      phrase += this.existentArray[i].getPossessiveAdj(spin, ev) + ", ";
    }
    phrase += "and " + this.existentArray[this.existentArray.length - 1].getPossessiveAdj(spin, ev);
    return phrase;
  }
  getGroupingPhrase(role, spin, ev) {
    var partPhrase = (this.existentArray.length == 1) ? "part" : "parts";
    var group = `the ${partPhrase} of ${this.existentArray[0].parent.getNounPhrase(role, spin, ev)}`;
    return group;
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
  constructor(spatialRelation, parent, gender, age = "adult", number = 1) {
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
    if (number == "singular") {
      number = 1;
    } else if (number == "plural") {
      number = 2;
    } else if (number != 1 && number != 2) {
      throw new ValueError("Given " + number + "; Number must be singular " +
        "or plural. You can also use numbers 1 and 2.");
    }
    this.number = number;
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
  constructor(agent, object, temporalRelation, extra) {
    this.agent = Array.isArray(agent) ? new ExistentGroup(agent) : agent;
    this.continuous = false;
    if (object) {
      this.object = Array.isArray(object) ? new ExistentGroup(object) : object;
    }
    if (temporalRelation) {
      this.temporal = temporalRelation;
    }
    if (extra) {
      this.extra = Array.isArray(extra) ? new ExistentGroup(extra) : extra;
    }
    this.start = clock;
    clock += 10;
    this.duration = 5;
    this.alterations = [];
    evSeq.push(this);
  }
  hasParticipant(actor) {
    return ((this.agent === actor) || (this.object === actor) || (this.extra === actor));
  }
  hasObject(object) {
    if (this.hasOwnProperty(object)) {
      return (this.object.name == object.name);
    } else {
      return false;
    }
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

class Representations {
  constructor(phrase) {
    if (phrase === null) {
      this.phrase = "act";
    } else {
      this.phrase = phrase;
    }
  }
}

class Narrator {
  constructor(names, representations) {
    this.names = names;
    this.representations = representations;
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
    let agent = world.ev[evTag].agent;
    return capitalize(this.name(agent.tag) + " acts.");
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

function narrate(title, told_by, world, spin, names, representations) {
  var element = document.getElementById("narrative"),
    h1 = document.createElement("h1"),
    h2 = document.createElement("h2"),
    div, telling = [],
    sentence, fix,
    oldReferring, exp = 0,
    i, leftPart, narr;
  narr = new Narrator(names, representations);
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
          "Beforehand, "]);
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

// ### ARTICLES ###

const singularArticles = ["a", "an", "one"];
const pluralArticles = ["several", "many"];
// "the" or "some" can be used with singular or plural NPs


// ### PREPOSITIONS ###

var spatial = {
  in: "in",
  of: "possessed by", // Not exactly spatial, but it's here for now
  on: "on",
  partOf: "a part of",
  featureOf: "a feature of"
};

var temporal = {
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
  upTo: "up to",
  using: "using",
  with: "with"
};

// ### UTILITY ###

function capitalize (string) {
  return string[0].toUpperCase() + string.slice(1);
}
