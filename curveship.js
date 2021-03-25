// Curveship-js version 0.3
//  Copyright 2020-2021 Nick Montfort
//
// Licensed under the GNU General Public License v3.0. See the file LICENSE
// for complete terms.
//
// Curveship-js is an implementation of the core ideas of Curveship in ES6.
// It enables narrative variation, the main point of the original (2011) system.
//
// A note for those familiar with the original Python project, now called
// Curveship-py: This Curveship-js is not intended to ever have a parser or an
// *interactive* world simulation. It is just for telling the same underlying
// story/plot/content in different narrative discourses/expressions/styles.
//
// Version 0.3 is the GitHub-hosted "Micro Curveship" still in development;
// it lacks some narrative variation in Curveship-py, for instance focalization
// and many changes in order, such as  for flashback and flashforward. Any
// progress will be toward Curveship-js 0.6, which will have all the narrative
// variation capabilities of Curveship-py 0.6.
//
// Web pages need to source this file, verb.js, and the story file to function.
//
// Some documentation is at https://nickm.com/curveship/#js

var clock = 0;

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

class Existent {
  constructor(article, name) {
    if (new.target === Existent) {
      throw new TypeError("Can't directly instantiate Existent");
    }
    if (article) {
      this.article = article;
    }
    this.name = name;
  }
  includes(obj) {
    return obj === this;
  }
  addToGivens() {
    givens.add(this);
  }
  pronominalization(role, spin, ev) {
    var person = 3;
    if (spin.i === this) person = 1;
    if (spin.you === this) person = 2;
    if (ev.agent.includes(this)) {
      if (role === "object") return ["reflexive", person];
    }
    if (person != 3) return [role, person];
    if (this.owner) return false;
    if (givens.has(this) && typeof lastNarratedEvent !== "undefined" && lastNarratedEvent.hasParticipant(this)) {
      return [role, 3];
    }
    return false;
  }
  getNounPhrase(role, spin, ev) {
    var pronominalize = this.pronominalization(role, spin, ev);
    if (pronominalize) {
      switch (pronominalize[0]) {
        case "subject": {
          return this.pronoun.getSubject(pronominalize[1], this.number);
        }
        case "object": {
          return this.pronoun.getObject(pronominalize[1], this.number);
        }
        case "reflexive": {
          return this.pronoun.getReflexive(pronominalize[1], this.number);
        }
      }
    }
    if (this.owner) {
      // FIXME? "Jim's girlfriend sits on his bed" would likely be realized as "Jim's girlfriend sits on Jim's laptop"
      if (typeof lastNarratedEvent !== "undefined" && lastNarratedEvent.hasObject(this)) {
        return this.owner.getPossessivePronoun(spin, ev);
      }
      return this.owner.getPossessiveAdj(spin, ev) + " " + this.name;
    }
    if (!this.article) {
      return this.name;
    }
    if (givens.has(this) && ["a", "an", "one", "several", "some"].includes(this.article)) {
      return "the " + this.name;
    }
    return this.article + " " + this.name;
  }
  getSubject(spin, ev) {
    return this.getNounPhrase("subject", spin, ev);
  }
  getObject(spin, ev) {
    return this.getNounPhrase("object", spin, ev);
  }
  getPossessiveAdj(spin, ev) {
    if (spin.i === this) {
      return this.pronoun.getPossessiveAdj(1, this.number, ev);
    }
    if (spin.you === this) {
      return this.pronoun.getPossessiveAdj(2, this.number, ev);
    }
    if (givens.has(this)) {
      if (ev.agent == this ||
        (typeof lastNarratedEvent !== "undefined" && lastNarratedEvent.hasParticipant(this))) {
        return this.pronoun.getPossessiveAdj(3, this.number, ev);
      }
    }
    switch (this.number) {
      case 1: {
        return this.getSubject(spin, ev) + "’s";
      }
      case 2: {
        return this.getSubject(spin, ev) + "’";
      }
    }
  }

  getPossessivePronoun(spin, ev) {
    if (spin.i === this) {
      return this.pronoun.getPossessivePronoun(1, this.number, ev);
    }
    if (spin.you === this) {
      return this.pronoun.getPossessivePronoun(2, this.number, ev);
    }
    if (givens.has(this)) {
      if (ev.agent == this ||
        (typeof lastNarratedEvent.hasParticipant(this))) {
        return this.pronoun.getPossessivePronoun(3, this.number, ev);
      }
    }
  }

  configuredAs(spatialRelation, parent) {
    this.spatial = spatialRelation;
    this.parent = parent;
  }
  setNumberBasedOnArticle() {
    if (this.article === "") {
      this.number = 1;
    } else if (singularArticles.includes(this.article)) {
      this.number = 1;
    } else if (pluralArticles.includes(this.article)) {
      this.number = 2;
    } else { // The article is "the" or something more unusual. Can't use
      // it to determine whether this is singular or plural.
      if (name[-1] === "s") { // This is a guess; Plurals need not end
        this.number = 2; // in -s. Number should be set manually for
      } // other plurals.
      else {
        this.number = 1;
      }
    }
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
    this.existentArray.forEach(item => givens.add(item));
  }
  getNounPhrase(role, spin, ev) {
    var phrase = "",
      allParts = false,
      partOf;

    // FIXME need to go through and check all existents in the group,
    // if there's a group. If the existents are all parts of the same
    // existent, *and* the spin specifies grouping parts, a short
    // phrase such as "the parts of the engine" or "the parts of shoe"
    // will be realized instead of a list of existents.

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
}

class Actor extends Existent {
  constructor(article, name, spatialRelation, parent, pronounSet = pronoun.neuter, number = 1) {
    super(article, name);
    this.spatial = spatialRelation;
    this.parent = parent;
    this.pronoun = pronounSet;
    this.number = number;
  }
}

var actor = {
  cosmos: new Actor(null, "it")
};

class Place extends Existent {
  constructor(article, name) {
    super(article, name);
    this.visiblePlaces = {};
    this.configuredAs(spatial.of, actor.cosmos);
    this.pronoun = pronoun.neuter;
    this.setNumberBasedOnArticle();
  }
  addView(place, text, visibility = 1) { // "visibility" does nothing now.
    // It is used in Curveship.py, which has a complex model of what things
    // can be seen from what places. There, 1 means things are fully visible.
    this.visiblePlaces[place] = {
      text: text,
      visibility: visibility
    };
  }
}

var place = {};

class Thing extends Existent {
  constructor(article, name, spatialRelation, parent, prominence = 0.5) {
    // "prominence" does nothing now. It is used in Curveship.py, which has a
    // complex model of what things can be seen from what places. There, .5
    // means a thing is of average prominence.
    super(article, name);
    this.spatial = spatialRelation;
    this.parent = parent;
    this.prominence = prominence;
    this.pronoun = pronoun.neuter;
    this.setNumberBasedOnArticle();
  }
}

var thing = {};

class Event {
  constructor(agent, actionString, object, temporalRelation, extra, manner) {
    this.agent = Array.isArray(agent) ? new ExistentGroup(agent) : agent;
    this.negated = false;
    if (actionString.slice(0, 4) === "not ") {
      this.negated = true;
      actionString = actionString.slice(4);
    }
    this.continuous = false;
    if (actionString.slice(-5) === " +ing") {
      this.continuous = true;
      actionString = actionString.slice(0, -5);
    }
    this.action = actionString;
    if (object) {
      this.object = Array.isArray(object) ? new ExistentGroup(object) : object;
    }
    if (temporalRelation) {
      this.temporal = temporalRelation;
    }
    if (extra) {
      this.extra = Array.isArray(extra) ? new ExistentGroup(extra) : extra;
    }
    this.manner = manner;
    this.setTemplate();
    this.start = clock;
    clock += 10;
    this.duration = 5;
    this.sense = null;
    this.alterations = [];
    eventSeq.push(this);
  }
  setTemplate(custom = null) {
    var actionArray;
    if (custom != null) {
      this.template = custom;
    } else {
      this.template = "";
      this.template += "[agent/s]";
      if (this.manner) {
        this.template += " " + this.manner;
      }
      actionArray = this.action.split(" ");
      this.template += " [" + actionArray[0] + "/v]";
      if (actionArray.length > 1) {
        this.template += " " + actionArray.slice(1).join(" ");
      }
      if (this.object) {
        if (typeof this.object === "string") {
          this.template += " " + this.object;
        } else {
          this.template += " [object/o]";
        }
      }
      if (this.temporal) {
        this.template += " " + this.temporal;
      }
      if (this.extra) {
        this.template += " [extra/o]";
      }
    }
  }
  setSense(modality) {
    this.sense = modality;
  }
  currentTemplatesIn(actorOrThing, spatialRelation, parent) {
    actorOrThing.spatial = spatialRelation;
    actorOrThing.parent = parent;
  }
  placeVerbPhrase(currentTemplate, spin, agent) {
    var person = 3,
      number, slotExp = /\[([a-z]+)\/v\]/,
      base = slotExp.exec(currentTemplate)[1],
      verb = new Verb(base),
      tenseER, phrase, pronominalized;
    if (spin.i === agent) {
      person = 1;
    }
    if (spin.you === agent) {
      person = 2;
    }
    switch (spin.speaking) {
      case 'after': {
        tenseER = 'past';
        break;
      }
      case 'during': {
        tenseER = 'present';
        break;
      }
      case 'before': {
        tenseER = 'future';
        break;
      }
    }
    pronominalized = agent.pronominalization('agent', spin, {
      'agent': agent
    });
    if (agent.pronoun == pronoun.nonBinary && pronominalized && pronominalized[1] === 3) {
      number = 2;
    } else {
      number = agent.number;
    }
    phrase = verb.conjugatedVP(person, number, tenseER, spin.referring, this);
    currentTemplate = currentTemplate.replace(slotExp, phrase);
    return currentTemplate;
  }
  fixOrthography(sentence) {
    if (!"'\"'’”.!?".includes(sentence.slice(-1))) {
      sentence += ".";
    }
    if ("\"'’”".includes(sentence.slice(-1))) {
      if (!".!?".includes(sentence.slice(-2, -1))) {
        sentence = sentence.slice(0, -1) + "." + sentence.slice(-1);
      }
    }
    return sentence.slice(0, 1).toUpperCase() + sentence.slice(1);
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
  changeState(ex, spatial_1, parent_1, spatial_2, parent_2) {
    // Does nothing now. Will later be used for minimal world simulation, so
    // that focalization can be implemented.
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
  realize(spin, fix = true) {
    var currentTemplate = this.template,
      subjectExp, objectExp,
      possessiveExp, subjectNP, objectNP, possessivePhrase = "",
      oldSpeaking;
    // Realize the verb phrase ...
    currentTemplate = this.placeVerbPhrase(currentTemplate, spin, this.agent);
    // Realize the noun phrases ...
    for (var existent of ["agent", "object", "extra"]) {
      if (this[existent]) {
        if (this[existent] instanceof Event) {
          oldSpeaking = spin.speaking;
          spin.speaking = "after";
          subjectNP = objectNP = "that " + this[existent].realize(spin, false);
          spin.speaking = oldSpeaking;
        } else if (typeof this[existent] === "string") {
          subjectNP = objectNP = this[existent];
        } else {
          subjectNP = this[existent].getSubject(spin, this);
          objectNP = this[existent].getObject(spin, this);
          possessivePhrase = this[existent].getPossessiveAdj(spin, this);
          this[existent].addToGivens();
        }
      }
      subjectExp = new RegExp("\\[" + existent + "\\/s\\]", "g");
      objectExp = new RegExp("\\[" + existent + "\\/o\\]", "g");
      possessiveExp = new RegExp("\\[" + existent + "\\'s\\]", "g");
      currentTemplate = currentTemplate.replace(subjectExp, subjectNP);
      currentTemplate = currentTemplate.replace(objectExp, objectNP);
      currentTemplate = currentTemplate.replace(possessiveExp, possessivePhrase);
    }
    if (fix) {
      currentTemplate = this.fixOrthography(currentTemplate);
    }
    return currentTemplate;
  }
}

var eventSeq = [],
  lastNarratedEvent;

class World {
  constructor(places, actors, items, eventSequence) {
    this.place = places;
    this.actor = actors;
    this.item = items;
    this.event = eventSequence;
  }
}

function narrate(metadata, spin, world) {
  var element = document.getElementById("narrative"),
    div,
    h1 = document.createElement("h1"),
    h2 = document.createElement("h2"),
    h3 = document.createElement("h3"),
    instructions = document.createElement("div"),
    examples = document.createElement("ul"),
    hr = document.createElement("hr"),
    telling = [],
    sentence, fix,
    oldReferring, exp = 0,
    i, leftPart;
  for (i = 0; i < world.event.length; i++) {
    telling.push(i);
  }
  spin = getParameters(world.actor, world.item);
  h1.innerHTML = metadata.title;
  element.appendChild(h1);
  h2.innerHTML = metadata.author;
  if (metadata.hasOwnProperty("date")) {
    h2.innerHTML = metadata.author + ", " + metadata.date;
  }
  element.appendChild(h2);
  h3.innerHTML = "Generated by Curveship-js";
  element.appendChild(h3);
  instructions.innerHTML = metadata.instructions;
  element.appendChild(instructions);
  for (var args of metadata.examples) {
    leftPart = window.location.href.split('?')[0];
    examples.innerHTML += '<li><a href="' + leftPart + '?' + args + '">?' + args + '</li>';
  }
  element.appendChild(examples);
  element.appendChild(hr);
  if (spin.main) {
    telling = select_main(telling, spin.main);
  }
  if (spin.order === "retrograde") {
    telling.reverse();
  } else if (spin.order === "random") {
    shuffle(telling);
  }
  descriptions = [];
  if (spin.hasOwnProperty("describe")) {
    spin.describe.forEach(item => {
      div = document.createElement("div");
      // FIXME probably still cheating, but less so
      sentence = new Event(item, "be " + item.spatial, item.parent).realize(spin);
      div.innerHTML = sentence;
      element.appendChild(div);
    });
  }
  div = document.createElement("div");
  element.appendChild(div);
  for (i of telling) {
    var e, alt;
    event = world.event[i];
    // Each time we narrate an event, all the "after" alterations of
    // chronologically earlier events must be applied, *and* the prior
    // "before" state of all chronologially later must be applied.
    // That's becasue we could be narrating this event in any order.
    for (e of world.event) {
      if (e.start < event.start) {
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
    if (typeof lastNarratedEvent !== "undefined" && event.start < lastNarratedEvent.start) {
      if (spin.time_markers) {
        sentence += choice(["Before that, ", "Previously, ", "Earlier, ", "Beforehand, "]);
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
      sentence += event.realize(spin, fix);
      if (!fix) {
        sentence += event.realize(spin).slice(-1);
      }
      spin.speaking = oldSpeaking;
      spin.referring = oldReferring;
    } else {
      sentence += event.realize(spin);
    }
    div.innerHTML = sentence;
    element.appendChild(div);
    lastNarratedEvent = event;
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
  featureOf: "a feature of",
  far: "far from", // These would be used when the *only* relevant thing
  near: "near to" // is mentioning an actor is far from/near to a place
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

var number = { // Not currently used.
  singular: "one",
  plural: "several",
  unknown: "one or more"
};

var givens = new Set();

// ### UTILITY ###

function getParameters(actor, thing) {
  var params = window.location.search,
    spin = {},
    pair;
  if (params.substring(0, 1) === "?") {
    params = params.slice(1);
    params = params.split(",");
    for (var p of params) {
      pair = p.split("=");
      if (pair[0] === "i" || pair[0] === "you") {
        spin[pair[0]] = actor[pair[1]];
      } if (pair[0] === "describe") {
        // FIXME describes only things
        spin[pair[0]] = pair[1].split(";").map(name => thing[name]);
      }else if (pair[0] === "time_markers") {
        spin.time_markers = true;
      } else if (pair[0] === "event_numbers") {
        spin.event_numbers = true;
      } else if (pair[0] === "expression_numbers") {
        spin.expression_numbers = true;
      } else {
        spin[pair[0]] = pair[1];
      }
    }
  }
  if (!spin.speaking) {
    spin.speaking = "during";
  }
  if (!spin.referring) {
    spin.referring = "simple";
  }
  return spin;
}
