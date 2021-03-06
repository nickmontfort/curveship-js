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

class Category { // TODO Categories should be existents!
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

class Names {
  constructor(initial, subsequent = null, pronouns = null) {
    this.initial = initial;
    if (subsequent === null) {
      subsequent = initial;
    }
    this.subsequent = subsequent;
    this.pronouns = pronouns;
    this.nameByCategory = false;
  }
}

class NameByCategory extends Names { // TODO always do this if no more specific name is provided
  constructor() {
    super();
    this.nameByCategory = true;
  }
}

class ProperNames extends Names {
  constructor(given, family, pronouns, common = null, title = null) {
    let initial = (title !== null ? title + " " : "") + given + " " + family;
    let subsequent = title !== null ? title + " " + family : given;
    super(initial, subsequent, pronouns);
    this.title = title;
    this.given = given;
    this.family = family;
    this.common = common;
  }
}

class CategoryNames extends Names {
  constructor(name, proper = null) {
    let initial = "some " + (proper !== null ? proper + " " : "") + name + "s";
    let subsequent = "the " + (proper !== null ? proper + " " : "") + name + "s";
    super(initial, subsequent, pronoun.neuter);
    this.name = (proper !== null ? proper + " " : "") + name;
    this.proper = proper;
  }
}

class VerbPh {
  constructor(phrase = null) {
    if (phrase === null) {
      this.verb_phrase = "act";
    } else {
      this.verb_phrase = phrase;
    }
  }
}

class Narrator {
  constructor(world, names, vps) {
    this.names = names;
    if (this.names.existent === undefined) {
      this.names.existent = new CategoryNames("entity");
    }
    this.representation = {};
    for (let vp in vps) {
      if (world.ev.hasOwnProperty(vp)) {
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
    this.givens = new Set();
  }
  pronominalization(ex, role) {
    let exTag = ex.tag;
    var person = 3;
    if (this.i === exTag) person = 1; // TODO connect these to a spin
    if (this.you === exTag) person = 2;
    /** TODO restore reflexive
     * if (ev.agent.includes(this)) {
     *   if (role === "object") return ["reflexive", person];
     * }
     */
    if (person !== 3) return [role, person];
    // if (this.owner) return false; TODO with possessives
    if (this.givens.has(exTag) && typeof this.lastNarratedEvent !== "undefined" && this.lastNarratedEvent.hasParticipant(ex)) {
      return [role, 3];
    }
    return false;
  }
  name(e, role, exTag = null) { // TODO sloppy to have exTag, I think?
    // why not just use e.tag?
    if (e instanceof Event) {
      return "that" + this.represent(e);
    }
    if (e instanceof ExistentGroup) {
      return this.group(e, role);
    }
    exTag = exTag == null ? e.tag : exTag;
    if (this.names[exTag].nameByCategory) {
      let categoryName = this.names[e.getCategory().tag];
      this.names[exTag] = new Names("a " + categoryName.name, "the " + categoryName.name);
    }
    if (this.names[exTag].pronouns !== null || e.hasOwnProperty("gender")) {
      let pronouns = this.names[exTag].pronouns !== null ? this.names[exTag].pronouns : pronoun[e.gender];
      let pronominalize = this.pronominalization(e, role);
      if (this.names[exTag].initial === "") {
        // Existents that have been given blank initial names are always
        // pronominalized. To have existents referred to by "default"
        // common names based on the type of existent they are, simply
        // don't include a name for them at all in narrator.js.
        pronominalize = true;
      }
      if (pronominalize) {
        switch (pronominalize[0]) {
          case "subject": {
            return pronouns.getSubject(pronominalize[1], e.number);
          }
          case "object": {
            return pronouns.getObject(pronominalize[1], e.number);
          }
          case "reflexive": {
            return pronouns.getReflexive(pronominalize[1], e.number);
          }
        }
      }
    }
    /** TODO make possessive pronouns work if (e.owner) {
      if (typeof this.lastNarratedEvent !== "undefined" && this.lastNarratedEvent.hasObject(this)) {
         return this.names[e.owner.tag].pronouns.getPossessivePronoun(spin, ev);
      }
      return this.names[e.owner.tag].pronouns.getPossessivePronoun(spin, ev);
    } */
    if (this.givens.has(exTag)) {
      return this.names[exTag].subsequent;
    } else {
      this.givens.add(exTag);
      return this.names[exTag].initial;
    }
  }

  traverseRelationTree(relations) {
    var exCategories = [];
    for (var relation of relations) {
      var basicClass = relation;
      var superClasses = [];
      while (basicClass !== null) { // TODO you can chose to stop at some level of the tree using this predicate
        superClasses.push(basicClass);
        basicClass = basicClass.parent;
      }
      superClasses.reverse();
      exCategories.push(superClasses);
    }
    let minLength = Math.min(...exCategories.map(item => item.length));
    var superClass = null;
    for (var i = 0; i < minLength; i++) {
      var classAtI = exCategories[0][i];
      if (exCategories.every(item => item[i] === classAtI)) {
        superClass = classAtI;
      } else {
        break;
      }
    }
    return superClass;
  }

  findSimilarities(ex) { // FIXME TODO sort this out!!
    var exCategories = [];
    var categories = [];
    var existents = [];
    for (var existent of existent.existentArray) {
      categories.push(ex.getCategory());
      existents.push(existent);
    }
    var aggregate = this.ascendRelationTree(existents);
    // are they parts of something? find the most specific thing
    var meta = this.ascendRelationTree(category);
    // are they in a common category? find the most specific one

    if (aggregate != actor.cosmos) return (ex.length() == 1) ? "the part of " + this.name(superPart) : " the parts of " + this.name(aggregate);
    if (meta !== null) return this.name(meta, "category", ex.tag);

    var initCategory = ex.existentArray[0].getCategory(); //check for property relations
    var initProperties = initCategory.getProperties();
    for (var property of initProperties.keys()) {
      var shareAllProperties = ex.existentArray.every(item => item.getCategory().getProperties().has(property));
      if (shareAllProperties) {
        return "the objects with " + property;
      }
    }

    return null;
  }

  group(ex, role) {
    //    var groupBySimilarity = true;
    var groupBySimilarity = false; // FIXME this shouldn't be hard-coded
    if (groupBySimilarity) {
      var similarities = this.findSimilarities(ex);
      if (similarities != null) {
        return similarities;
      }
    }
    if (ex.length() == 2) {
      return this.name(ex.get(0), role) + " and " + this.name(ex.get(1), role);
    }
    let result = "";
    for (var i = 0; i < ex.length() - 1; i++) {
      result += this.name(ex.get(i), role) + ", ";
    }
    return result + " and " + this.name(ex.get(ex.length() - 1), role);
  }

  represent(ev) {
    var result = this.representation[ev.tag].template;
    var number = world.ev[ev.tag].agent instanceof ExistentGroup ? 2 : 1;
    var verbString = this.representation[ev.tag].verb.conjugatedVP(3, number, "present", "", ev); // FIXME different persons, tenseER, tenseRS
    var vp = verbString + (this.representation[ev.tag].rest ? ' ' + this.representation[ev.tag].rest : '');
    result = result.replace("\[SUB\]", this.name(world.ev[ev.tag].agent, "subject"));
    result = result.replace("\[V\]", vp);
    if (world.ev[ev.tag].hasOwnProperty("direct")) {
      result = result.replace("\[DO\]", this.name(world.ev[ev.tag].direct, "object"));
    }
    if (world.ev[ev.tag].hasOwnProperty("temporal")) {
      result = result.replace("\[PREP\]", temporal[world.ev[ev.tag].temporal]);
    }
    if (world.ev[ev.tag].hasOwnProperty("indirect")) {
      result = result.replace("\[IO\]", this.name(world.ev[ev.tag].indirect, "object"));
    }
    result = result += ".";
    this.lastNarratedEvent = world.ev[ev.tag];
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
      sentence += narr.represent(current);
      spin.speaking = oldSpeaking;
      spin.referring = oldReferring;
    } else {
      sentence += narr.represent(current);
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
