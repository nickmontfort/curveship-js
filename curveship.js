// Curveship-js version 0.4 //  Copyright 2020-2021 Nick Montfort
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

/**
 * Specifies a new main sequence of expressions to enable
 * ellipsis, reordering, and repetition in the telling.
 * Examples of sequences:  1-4;7;9-12   18;2-16   2;4;6;8
 */
function select_main(telling, order) {
  var order_list = order.split(";");
  var indices = [];
  var new_telling = [];
  for (let i of order_list) {
    if (i.includes("-")) {
      let ends = i.split("-");
      for (let j = parseInt(ends[0]); j <= parseInt(ends[1]); j++) {
        indices.push(j);
      }
    } else {
      indices.push(i);
    }
  }
  for (let i of indices) {
    new_telling.push(telling[i]);
  }
  return new_telling;
}

class Existent {
  constructor() {
    if (new.target === Existent) {
      throw new TypeError("Can't directly instantiate Existent");
    }
    this.category = category.entity;
    this.partOf = null;
    this.owner = null;
  }

  setCategory(obj) {
    this.category = obj;
  }

  getCategory() {
    return this.category;
  }

  includes(obj) {
    return obj === this;
  }
}

class ExistentGroup extends Existent {
  constructor(existentArray) {
    super(null, null);
    this.existentArray = existentArray;
    this.number = existentArray.length;
  }
  length() {
    return this.existentArray.length;
  }
  get(ind) {
    return this.existentArray[ind];
  }
  includes(obj) {
    return this.existentArray.includes(obj);
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

class Category { // Should probably extend Existent
  constructor(children = [], parent = category.entity) {
    this.parent = parent;
    this.properties = new Set();
    for (let existent of children) {
      existent.setCategory(this);
    }
  }
  addProperties(properties) {
    for (let property of properties) {
      this.properties.add(property);
    }
  }
  removeProperties(properties) {
    for (let sproperty of properties) {
      this.properties.delete(property, false);
    }
  }
  getProperties() {
    if (this.parent != null) return new Set([...this.properties, ...this.parent.getProperties()]);
    return this.properties;
  }
  name() {
    return this.name;
  }
}

var category = {
  entity: new Category([], null)
};

class Place extends Existent {
  constructor() {
    super();
    this.location = thing.cosmos;
  }
}

var place = {};

class Actor extends Existent {
  constructor(location, gender, age = "adult") {
    super();
    this.location = location;
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

var actor = {};

class Thing extends Existent {
  constructor(location = null) {
    super();
    this.location = location;
  }
  setParts(parts) {
    for (var existent of parts) {
      existent.location = this.location;
      existent.partOf = this;
    }
  }
  setOwner(actor) {
    this.owner = actor;
  }
}

var thing = {
  cosmos: new Thing(),
};

var evSeq = [];
var lastNarratedTag = "";

class Event {
  constructor(agent, direct, temporalRelation, indirect) {
    this.agent = Array.isArray(agent) ? new ExistentGroup(agent) : agent;
    this.agent = (typeof this.agent === "object") ? this.agent : thing.cosmos;
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

class VerbPh {
  constructor(phrase) {
    this.verb_phrase = phrase;
  }
}

class Narrator {
  constructor(world, names, vps) {
    this.names = names;
    if (this.names.existent === undefined) {
      this.names.existent = new CategoryNames("entity");
    }
    this.buildRepresentations(world, vps);
    this.givens = new Set();
  }
  buildRepresentations(world, vps) {
    this.representation = {};
    for (let ev in world.ev) {
      if (!(ev in vps)) {
        vps[ev] = new GenericVerbPh(world.ev[ev].hasOwnProperty("direct") ? "trans" : "intrans"); }
    }
    for (let vp in vps) {
      this.representation[vp] = {};
      let verb = vps[vp].verb_phrase, rest = "";
      if (verb.includes(' ')) {
        verb = vps[vp].verb_phrase.substr(0, vps[vp].verb_phrase.indexOf(' '));
        rest = vps[vp].verb_phrase.substr(vps[vp].verb_phrase.indexOf(' '));
      }
      this.representation[vp].verb = new Verb(verb);
      this.representation[vp].template = "[SUB] [V]";
      if (rest.length > 0) {
        this.representation[vp].template += " " + rest;
      }
      if (world.ev[vp].hasOwnProperty("direct")) {
        this.representation[vp].template += " [DO]";
      }
      if (world.ev[vp].hasOwnProperty("temporal")) {
        this.representation[vp].template += " [PREP]";
      }
      if (world.ev[vp].hasOwnProperty("indirect")) {
        this.representation[vp].template += " [IO]";
      }
      this.representation[vp].subject = world.ev[vp].agent.tag;
      if (world.ev[vp].hasOwnProperty("direct")) {
        this.representation[vp].direct = world.ev[vp].direct.tag;
      }
      if (world.ev[vp].hasOwnProperty("temporal")) {
        this.representation[vp].temporal = world.ev[vp].temporal;
      }
      if (world.ev[vp].hasOwnProperty("indirect")) {
        this.representation[vp].indirect = world.ev[vp].indirect.tag;
      }
    }
  }
  whatPronoun(ex, spin, role) {
    let pronounToUse = false;
    // If this returned value is false, it means not to pronominalize.
    // Otherwise an array is returned, the first element the role,
    // the second the person.
    let exTag = ex.tag;
    let person = 3;
    if (spin.i === exTag) person = 1;
    if (spin.you === exTag) person = 2;
    /** TODO restore reflexive
     * if (ev.agent.includes(this)) {
     *   if (role === "object") return ["reflexive", person];
     * }
     */
    if (person !== 3) {
      pronounToUse = [role, person];
    } else
    // if (this.owner) return false; TODO with possessives
    if (this.names[ex.tag].initial === "") {
      // Existents that have been given blank initial names are always
      // pronominalized. To have existents referred to by generic
      // common names based on the type of existent they are, simply
      // don't include a Names for them at all in narrator.js.
      pronounToUse = [role, 3];
    } else if (this.givens.has(exTag) && (typeof this.lastNarratedEvent !== "undefined" && this.lastNarratedEvent.hasParticipant(ex))) {
      // In this case the Existent has already been mentioned in the
      // discourse, and indeed in the previous representation of an
      // Event.
      pronounToUse = [role, 3];
    }
    return pronounToUse;
  }
  name(e, spin, role) {
    let usePronoun = false;
    if (e === thing.cosmos || e.tag === spin.i || e.tag === e.you) {
      usePronoun = true;  // FIXME makes no sense, has to be an array w/ 2 elements
    }
    if (e instanceof Event) {
      return "that " + this.represent(e, spin, false); // TODO "that" is language-specific, move out of curveship.js
    }
    if (e instanceof ExistentGroup) {
      return this.nameGroup(e, spin, role);
    }
    if (!(e.tag in this.names)) {
      this.names[e.tag] = new GenericNames(e.tag);
    }
    if (this.names[e.tag].pronouns === null) {
      this.names[e.tag].setGenericPronouns(e.tag);
    }
    if (this.names[e.tag].nameByCategory) {
      let cat = this.names[e.getCategory().tag];
      if (typeof cat === "undefined") {
        this.names[e.getCategory().tag] = new GenericNames();
      }
    }
    usePronoun = this.whatPronoun(e, spin, role);
    if (usePronoun) {
      switch (usePronoun[0]) { // FIXME no no! usePronoun isn't supposed to be the pronoun
        case "subject": {
          return this.names[e.tag].pronouns.getSubject(usePronoun[1], e.number);
        }
        case "object": {
          return this.names[e.tag].pronouns.getObject(usePronoun[1], e.number);
        }
        case "reflexive": {
          return this.names[e.tag].pronouns.getReflexive(usePronoun[1], e.number);
        }
      }
    }
    if (e.owner || e.partOf) {
      let possessive = "";
      let parent = e.owner ? e.owner : e.partOf;
      if (!(parent.tag in this.names)) {
        this.names[parent.tag] = new GenericNames(parent.tag);
      }
      if (this.names[parent.tag].pronouns === null) {
        this.names[parent.tag].setGenericPronouns(parent.tag);
      }
      if (typeof this.lastNarratedEvent !== "undefined" && this.lastNarratedEvent.hasParticipant(parent)) {
         let person = 3;
         if (parent.tag === spin.i) {
           person = 1;
         }
         if (parent.tag === spin.you) {
           person = 2;
         }
         possessive = this.names[parent.tag].pronouns.getPossessivePronoun(person);
      } else if (this.names[parent.tag].possessive !== null) {
        possessive = this.names[parent.tag].possessive;
      } else {
        possessive = this.names[parent.tag].initial + "’s";
      }
      this.givens.add(parent.tag);
      return possessive + " " + this.names[e.tag].bareName;
    }
    if (this.givens.has(e.tag)) {
      return this.names[e.tag].subsequent;
    } else {
      this.givens.add(e.tag);
      return this.names[e.tag].initial;
    }
  }
  ascendTree(existents, method) {
    var aboveArray = [];
    for (var existent of existents) {
      let current = existent;
      let above = [];
      if (method === "by part") {
        while (current !== null) {
          current = current.partOf;
          above.push(current);
        }
      }
      else if (method === "by category") {
        let cat = current.getCategory();
        while (cat !== category.entity) {
          cat = cat.parent;
          above.push(cat);
        }
      }
      above.reverse();
      aboveArray.push(above);
    }
    let minLength = Math.min(...aboveArray.map(item => item.length));
    var join = null;
    for (var i = 0; i < minLength; i++) {
      let current = aboveArray[0][i];
      if (aboveArray.every(item => iNametem[i] === current)) {
        join = current;
      } else {
        break;
      }
    }
    return join;
  }
  whatAreWePartsOf(ex) {
    var existents = [];
    for (let existent of ex.existentArray) {
      existents.push(existent);
    }
    var something = this.ascendTree(existents, "by part");
    // are they parts of something? find the most specific thing
    if (something === null || something === thing.cosmos) return "";
    return (ex.length() == 1) ? "the part of " + this.name(something, spin) : " the parts of " + this.name(something, spin);
  }
  whatCategoryAreWeIn(ex) {
    var categories = [];
    var existents = [];
    for (let existent of ex.existentArray) {
      categories.push(ex.getCategory());
      existents.push(existent);
    }
    var meta = this.ascendTree(existents, "by category");
    // are they in a common category? find the most specific one
    if (meta === category.entity) return "";
    return this.name(meta, spin, "category");
  }
  doWeShareProperties(ex) {
    var cat = ex.existentArray[0].getCategory();
    // check for property relations
    var props = cat.getProperties();
    for (let property of props.keys()) {
      let allShareAProperty = ex.existentArray.every(item => item.getCategory().getProperties().has(property));
      if (allShareAProperty) {
        return "the " + property + " things";
      }
    }
    return "";
  }
  nameGroup(ex, spin, role) {
    if (spin.groupings.has("parts")) {
      var partOf = this.whatAreWePartsOf(ex);
      if (partOf !== "") {
        return partOf;
      }
    }
    if (spin.groupings.has("category")) {
      var inCategory = this.whatCategoryAreWeIn(ex);
      if (inCategory !== "") {
        return inCategory;
      }
    }
    if (spin.groupings.has("properties")) {
      var sharedProperty = this.doWeShareProperties(ex);
      if (sharedProperty !== "") {
        return sharedProperty;
      }
    }
    if (ex.length() == 2) {
      return this.name(ex.get(0), spin, role) + " and " + this.name(ex.get(1), spin, role);
    }
    let result = "";
    for (var i = 0; i < ex.length() - 1; i++) {
      result += this.name(ex.get(i), spin, role) + ", ";
    }
    return result + " and " + this.name(ex.get(ex.length() - 1), spin, role);
  }
  represent(ev, spin, fixOrthography = true) {
    let result = this.representation[ev.tag].template;
    let number = world.ev[ev.tag].agent instanceof ExistentGroup ? 2 : 1;
    let person = 3;
    person = (ev.agent.tag === spin.i) ? 1 : person;
    person = (ev.agent.tag === spin.you) ? 2 : person;
    let verbString = this.representation[ev.tag].verb.conjugatedVP(person, number, "present", "", ev); // FIXME different persons, tenseER, tenseRS
    let vp = verbString + (this.representation[ev.tag].rest ? ' ' + this.representation[ev.tag].rest : '');
    result = result.replace("\[SUB\]", this.name(world.ev[ev.tag].agent, spin, "subject"));
    result = result.replace("\[V\]", vp);
    if (world.ev[ev.tag].hasOwnProperty("direct")) {
      result = result.replace("\[DO\]", this.name(world.ev[ev.tag].direct, spin, "object"));
    }
    if (world.ev[ev.tag].hasOwnProperty("temporal")) {
      result = result.replace("\[PREP\]", temporal[world.ev[ev.tag].temporal]);
    }
    if (world.ev[ev.tag].hasOwnProperty("indirect")) {
      result = result.replace("\[IO\]", this.name(world.ev[ev.tag].indirect, spin, "object"));
    }
    this.lastNarratedEvent = world.ev[ev.tag];
    result = fixOrthography ? capitalize(result) + "." : result;
    return result;
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
  constructor(places, actors, categories, things, events) {
    addTags(places);
    this.place = places;
    addTags(actors);
    this.actor = actors;
    addTags(categories);
    this.categories = categories;
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
  let groupingSet = spin.hasOwnProperty("groupings") ? new  Set(spin.groupings.split(" ")) : spin.groupings = new Set();
  spin.groupings = groupingSet;
  div = document.createElement("div");
  element.appendChild(div);
  for (let i of telling) {
    let e, alt;
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
      sentence += narr.represent(current, spin);
      spin.speaking = oldSpeaking;
      spin.referring = oldReferring;
    } else {
      sentence += narr.represent(current, spin);
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
  with: "with",
};

// ### UTILITY ###

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
