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

const irregularNouns = { // To contain a list generated from a dictionary.
  "child" : ["children"]
};

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
// These are of course "feminine" pronouns rather than "female" ones and so on.
// The terms use correspond to "underlying" genders of Existents; in other
// words, in English, the pronoun.female pronouns are used with females.
pronoun.female = new PronounSet(["she", "her", "her", "hers", "herself"]);
pronoun.male = new PronounSet(["he", "him", "his", "his", "himself"]);
pronoun.neuter = new PronounSet(["it", "it", "its", "its", "itself"]);
pronoun.unknownBinary = new PronounSet(["he or she", "him or her", "his or her", "his or hers", "himself or herself"]);
pronoun.nonBinary = new PronounSet(["they", "them", "their", "theirs", "themself"]); // If you prefer, you can make the last entry "themselves"
