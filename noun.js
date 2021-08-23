// Part of Curveship-js version 0.4
//  Copyright 2020-2021 Nick Montfort
//
// licensed under the GNU General Public License v3.0. See the file LICENSE
// for complete terms.
//
// Noun class, along with English-language irregular plurals. These are for
// all but -s and -es plurals.

class Noun {
  constructor(base) {
    this.base = base;
  }
  singular() {
    return this.base;
  }
  plural() {
    if (this.hasOwnProperty("plural")) {
      return this.plural;
    }
    let plural = "";
    if (this.base in irregularNouns) {
      plural = irregularNouns[this.base][0];
    } else {
      let ending = /((ch|sh|s|z|x)|[bcdfghjklmnpqrstvwxz]y|[^o]o)$/;
      if (ending.test(this.base)) {
        plural = this.base + "es";
      } else {
        plural = this.base + "s";
      }
    }
    this.plural = plural;
    return plural;
  }
}

// ### PRONOUNS ###

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

class Names {
  constructor(initial, subsequent = null, pronouns = null) {
    this.initial = initial;
    let bareName = initial;
    let articles = new Set(["a", "an", "one", "some", "the"]);
    if (articles.has(initial.split(" ")[0])) {
      bareName = initial.substring(initial.indexOf(" "));
    }
    this.bareName = bareName;
    if (subsequent === null) {
      subsequent = "the " + bareName;
    }
    this.subsequent = subsequent;
    this.pronouns = pronouns;
    if (typeof this.possessive === "undefined") {
      this.possessive = null;
    }
    this.nameByCategory = false;
  }
  setGenericPronouns(tag) {
    let pronounSet = pronoun.neuter;
    if (tag in actor && actor[tag].gender === "male") {
      pronounSet = pronoun.masculine;
    } else if (tag in actor && actor[tag].gender === "female") {
      pronounSet = pronoun.feminine;
    }
    this.pronouns = pronounSet;
  }
}

class ProperNames extends Names {
  constructor(given, family = null, pronouns = null, common = null, title = null, possessive = null) {
    let initial = given;
    let subsequent = given;
    if (family !== null) {
      initial = (title !== null ? title + " " : "") + given + " " + family;
      subsequent = title !== null ? title + " " + family : given;
    }
    super(initial, subsequent, pronouns);
    this.title = title;
    this.given = given;
    this.family = family;
    this.common = common;
    this.possessive = possessive;
  }
}

class CategoryNames extends Names {
  constructor(name, proper = null) { // FIXME shuold be the plural of the name???
    let initial = "some " + (proper !== null ? proper + " " : "") + name + "s";
    let subsequent = "the " + (proper !== null ? proper + " " : "") + name + "s";
    super(initial, subsequent, pronoun.neuter);
    this.name = (proper !== null ? proper + " " : "") + name;
    this.proper = proper;
  }
}

class GenericNames extends Names {
  constructor(tag) {
    let name;
    if (tag in actor && actor[tag].gender === "male") {
      if (actor[tag].age == "adult") {
        name = "man";
      } else {
        name = "boy";
      }
    } else if (tag in actor && actor[tag].gender === "female") {
      if (actor[tag].age == "adult") {
        name = "woman";
      } else {
        name = "girl";
      }
    } else if (tag in thing) {
      name = "thing";
    } else if (tag in place) {
      name = "location";
    }
    super("a " + name, "the " + name);
    this.nameByCategory = true;
  }
}

const irregularNouns = { // FIXME: include enormous list generated from a dictionary.
  "child" : ["children"]
};

var names = {
  cosmos: new Names(""),
};
