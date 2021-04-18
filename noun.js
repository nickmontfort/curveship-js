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
    if (this.base in irregular) {
      plural = irregular[this.base][0];
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

const irregular = { // To contain a list generated from a dictionary.
  "child" : ["children"]
};
