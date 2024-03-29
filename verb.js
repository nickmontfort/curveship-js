// Part of Curveship-js version 0.4
//  Copyright 2020-2021 Nick Montfort
//
// licensed under the GNU General Public License v3.0. See the file LICENSE
// for complete terms.
//
// Verb class, along with English-language verb forms for all but the
// most simply conjugated verbs, helper words, and all forms of "to be."
//
// const "irregularVerbs" has not only irregular verbs [strictly speaking]
// but also any regular verbs not correctly conjugated by the simple
// preterite / past participle / present participle algorithms below.
// These do not do any consonant doubling, so verbs whose consontants
// are doubled have to be included here.

var vp = {};

class Verb {
    constructor(base) { this.base = base; }
    thirdPersonSingular() {
        if (/(ch|sh|s|z|x)$/.test(this.base)) { return this.base + "es"; }
        if (/[bcdfghjklmnpqrstvwxz]y$/.test(this.base)) {return this.base.slice(0, -1) + "ies"; }
        if (/[^o]o$/.test(this.base)) { return this.base + "es"; }
        if (this.base === "have") { return "has"; }
        return this.base + "s";
    }
    regularPretPastP() {
        if (this.base.slice(-1) === "e") { return this.base + "d"; }
        if (/[bcdfghjklmnpqrstvwxz]y$/.test(this.base)) { return this.base.slice(0,-1) + "ied"; }
        return this.base + "ed";
    }
    preterite() {
        if (this.base in irregularVerbs) { return irregularVerbs[this.base][0]; }
        return this.regularPretPastP();
    }
    pastPart() {
        if (this.base in irregularVerbs) { return irregularVerbs[this.base][1]; }
        return this.regularPretPastP();
    }
    presentPart() {
        if (this.base in irregularVerbs) { return irregularVerbs[this.base][2]; }
        if (this.base.slice(-1) === "e") { return this.base.slice(0,-1) + "ing"; }
        if (this.base.slice(-2) === "ie") { return this.base.slice(0,-2) + "ying"; }
        return this.base + "ing";
    }
    conjugatedVP(person, number, tenseER, tenseRS, event) { // FIXME Include posterior!
        // Produce the entire conjugated verb phrase, main word and
        // any appropriate helpers
        let i = 0, mainWord, helperWords, helperArray = [];
        if (person > 0) { i = (24 * person) - 23; } // Covers tenseRS === "present"
        if (tenseER === "past") { i += 8; }
        if (tenseER === "future") { i += 16; }
        if (event.progressive) { i += 2; }
        if (tenseRS === "anterior") { i += 4; } // Perfect aspect
        if (number === 2) { i += 1; } // Singular by default, this shifts to plural
        if (be.includes(this.base)) { mainWord = toBe[i]; }
        else {
            mainWord = this.base;
            if (tenseER === "present" && number === 1 && person === 3) {
                mainWord = this.thirdPersonSingular();
            } else if (tenseER === "past") {
                mainWord = this.preterite();
            }
            if (event.progressive) { mainWord = this.presentPart(); }
            if (tenseRS === "anterior") {mainWord = this.pastPart(); }
        }
        helperWords = helpers[i];
        if (event.negated) { // Changes, e.g., "rains" to "does rain"
            if (!event.progressive && (tenseRS !== "anterior") && !(be.includes(this.base))) {
                mainWord = this.base;
                if (tenseER === "present") {
                    if (person === 3) {
                        if (number === 2) { helperWords = "do "; }
                        else { helperWords = "does "; }
                    } else {
                        if (number === 2) { helperWords = "does "; }
                        else { helperWords = "do "; }
                    }
                }
                if (tenseER === "past") { helperWords = "did "; }
            }
        }
        if (event.negated) {
            if (helperWords === "") { return " not " + mainWord; }
            helperArray = helperWords.split(" ");
            helperArray.splice(1, 0, "not");
            helperWords = helperArray.join(" ");
        }
        return helperWords + mainWord;
    }
}

class VerbPh {
  constructor(phrase, affirmed = true, progressive = false, intensive = false, futureStyle = "will") {
    this.verbPhrase = phrase;
    this.negated = !affirmed;
    this.progressive = progressive;
    this.intensive = intensive;
    this.futureStyle = futureStyle;
  }
}

class GenericVerbPh extends VerbPh {
  constructor(transitivity) {
    let phrase = (transitivity === "trans") ? "act on" : "act";
    super(phrase);
  }
}

// A convenience, so people can, e.g., put "is" in their templates
const be = ["be", "am", "are", "is"];

const helpers = [
    "",               //  0 Infinitive
    "",               //  1 1-S-present
    "",               //  2 1-P-present
    "am ",            //  3 1-S-present-progressive
    "are ",           //  4 1-P-present-progressive
    "have ",          //  5 1-S-present-perfect
    "have ",          //  6 1-P-present-perfect
    "have been ",     //  7 1-S-present-progressive-perfect
    "have been ",     //  8 1-P-present-progressive-perfect
    "",               //  9 1-S-past
    "",               // 10 1-P-past
    "was ",           // 11 1-S-past-progressive
    "were ",          // 12 1-P-past-progressive
    "had ",           // 13 1-S-past-perfect
    "had ",           // 14 1-P-past-perfect
    "had been ",      // 15 1-S-past-progressive-perfect
    "had been ",      // 16 1-P-past-progressive-perfect
    "will ",          // 17 1-S-future
    "will ",          // 18 1-P-future
    "will be ",       // 19 1-S-future-progressive
    "will be ",       // 20 1-P-future-progressive
    "will have ",     // 21 1-S-future-perfect
    "will have ",     // 22 1-P-future-perfect
    "had been ",      // 23 1-S-future-progressive-perfect
    "had been ",      // 24 1-P-future-progressive-perfect
    "",               // 25 2-S-present
    "",               // 26 2-P-present
    "are ",           // 27 2-S-present-progressive
    "are ",           // 28 2-P-present-progressive
    "have ",          // 29 2-S-present-perfect
    "have ",          // 30 2-P-present-perfect
    "have been ",     // 31 2-S-present-progressive-perfect
    "have been ",     // 32 2-P-present-progressive-perfect
    "",               // 33 2-S-past
    "",               // 34 2-P-past
    "were ",          // 35 2-S-past-progressive
    "were ",          // 36 2-P-past-progressive
    "had ",           // 37 2-S-past-perfect
    "had ",           // 38 2-P-past-perfect
    "had been ",      // 39 2-S-past-progressive-perfect
    "had been ",      // 40 2-P-past-progressive-perfect
    "will ",          // 41 2-S-future
    "will ",          // 42 2-P-future
    "will be ",       // 43 2-S-future-progressive
    "will be ",       // 44 2-P-future-progressive
    "will have ",     // 45 2-S-future-perfect
    "will have ",     // 46 2-P-future-perfect
    "will have been ",// 47 2-S-future-progressive-perfect
    "will have been ",// 48 2-P-future-progressive-perfect
    "",               // 49 3-S-present
    "",               // 50 3-P-present
    "is ",            // 51 3-S-present-progressive
    "are ",           // 52 3-P-present-progressive
    "has ",           // 53 3-S-present-perfect
    "have ",          // 54 3-P-present-perfect
    "has been ",      // 55 3-S-present-progressive-perfect
    "have been ",     // 56 3-P-present-progressive-perfect
    "",               // 57 3-S-past
    "",               // 58 3-P-past
    "was ",           // 59 3-S-past-progressive
    "were ",          // 60 3-P-past-progressive
    "had ",           // 61 3-S-past-perfect
    "had ",           // 62 3-P-past-perfect
    "had been ",      // 63 3-S-past-progressive-perfect
    "had been ",      // 64 3-P-past-progressive-perfect
    "will ",          // 65 3-S-future
    "will ",          // 66 3-P-future
    "will be ",       // 67 3-S-future-progressive
    "will be ",       // 68 3-P-future-progressive
    "will have ",     // 69 3-S-future-perfect
    "will have ",     // 70 3-P-future-perfect
    "will have been ",// 71 3-S-future-progressive-perfect
    "will have been "];// 72 3-P-future-progressive-perfect

const toBe = [
    "be",       //  0 Infinitive
    "am",       //  1 1-S-present
    "are",      //  2 1-P-present
    "being",    //  3 1-S-present-progressive
    "being",    //  4 1-P-present-progressive
    "been",     //  5 1-S-present-perfect
    "been",     //  6 1-P-present-perfect
    "being",    //  7 1-S-present-progressive-perfect
    "being",    //  8 1-P-present-progressive-perfect
    "was",      //  9 1-S-past
    "were",     // 10 1-P-past
    "being",    // 11 1-S-past-progressive
    "being",    // 12 1-P-past-progressive
    "been",     // 13 1-S-past-perfect
    "been",     // 14 1-P-past-perfect
    "being",    // 15 1-S-past-progressive-perfect
    "being",    // 16 1-P-past-progressive-perfect
    "be",       // 17 1-S-future
    "be",       // 18 1-P-future
    "being",    // 19 1-S-future-progressive
    "being",    // 20 1-P-future-progressive
    "been",     // 21 1-S-future-perfect
    "been",     // 22 1-P-future-perfect
    "being",    // 23 1-S-future-progressive-perfect
    "being",    // 24 1-P-future-progressive-perfect
    "are",      // 25 2-S-present
    "are",      // 26 2-P-present
    "being",    // 27 2-S-present-progressive
    "being",    // 28 2-P-present-progressive
    "been",     // 29 2-S-present-perfect
    "been",     // 30 2-P-present-perfect
    "being",    // 31 2-S-present-progressive-perfect
    "being",    // 32 2-P-present-progressive-perfect
    "were",     // 33 2-S-past
    "were",     // 34 2-P-past
    "being",    // 35 2-S-past-progressive
    "being",    // 36 2-P-past-progressive
    "been",     // 37 2-S-past-perfect
    "been",     // 38 2-P-past-perfect
    "being",    // 39 2-S-past-progressive-perfect
    "being",    // 40 2-P-past-progressive-perfect
    "be",       // 41 2-S-future
    "be",       // 42 2-P-future
    "being",    // 43 2-S-future-progressive
    "being",    // 44 2-P-future-progressive
    "been",     // 45 2-S-future-perfect
    "been",     // 46 2-P-future-perfect
    "being",    // 47 2-S-future-progressive-perfect
    "being",    // 48 2-P-future-progressive-perfect
    "is",       // 49 3-S-present
    "are",      // 50 3-P-present
    "being",    // 51 3-S-present-progressive
    "being",    // 52 3-P-present-progressive
    "been",     // 53 3-S-present-perfect
    "been",     // 54 3-P-present-perfect
    "being",    // 55 3-S-present-progressive-perfect
    "being",    // 56 3-P-present-progressive-perfect
    "was",      // 57 3-S-past
    "were",     // 58 3-P-past
    "being",    // 59 3-S-past-progressive
    "being",    // 60 3-P-past-progressive
    "been",     // 61 3-S-past-perfect
    "been",     // 62 3-P-past-perfect
    "being",    // 63 3-S-past-progressive-perfect
    "being",    // 64 3-P-past-progressive-perfect
    "be",       // 65 3-S-future
    "be",       // 66 3-P-future
    "being",    // 67 3-S-future-progressive
    "being",    // 68 3-P-future-progressive
    "been",     // 69 3-S-future-perfect
    "been",     // 70 3-P-future-perfect
    "being",    // 71 3-S-future-progressive-perfect
    "being"];    // 72 3-P-future-progressive-perfect

const irregularVerbs = {
    "abet": ["abetted", "abetted", "abetting"],
    "abhor": ["abhorred", "abhorred", "abhorring"],
    "abide": ["abode", "abode", "abiding"],
    "abut": ["abutted", "abutted", "abutting"],
    "aby": ["abyed", "abyed", "abying"],
    "acquire": ["acquired", "acquired", "acquiring"],
    "acquit": ["acquitted", "acquitted", "acquitting"],
    "ad-lib": ["ad-libbed", "ad-libbed", "ad-libbing"],
    "admit": ["admitted", "admitted", "admitting"],
    "agree": ["agreed", "agreed", "agreeing"],
    "air-drop": ["air-dropped", "air-dropped", "air-dropping"],
    "air-ship": ["air-shipped", "air-shipped", "air-shipping"],
    "allot": ["allotted", "allotted", "allotting"],
    "alter": ["altered", "altered", "altering"],
    "anagram": ["anagrammed", "anagrammed", "anagramming"],
    "annul": ["annulled", "annulled", "annulling"],
    "ante": ["anted", "anted", "anteing"],
    "appal": ["appalled", "appalled", "appalling"],
    "arise": ["arose", "arisen", "arising"],
    "aver": ["averred", "averred", "averring"],
    "awake": ["awoke", "awoken", "awaking"],
    "baby-sit": ["baby-sat", "baby-sat", "baby-sitting"],
    "backbite": ["backbit", "backbitten", "backbiting"],
    "backlog": ["backlogged", "backlogged", "backlogging"],
    "backpedal": ["backpedalled", "backpedalled", "backpedalling"],
    "backslap": ["backslapped", "backslapped", "backslapping"],
    "backslide": ["backslid", "backslidden", "backsliding"],
    "backstop": ["backstopped", "backstopped", "backstopping"],
    "bag": ["bagged", "bagged", "bagging"],
    "ban": ["banned", "banned", "banning"],
    "bar": ["barred", "barred", "barring"],
    "bat": ["batted", "batted", "batting"],
    "bayonet": ["bayonetted", "bayonetted", "bayonetting"],
    "be": ["was", "been", "being"],
    "bear": ["bore", "born", "bearing"],
    "beat": ["beat", "beat", "beating"],
    "beat2": ["beat", "beaten", "beating"],
    "become": ["became", "became", "becoming"],
    "become2": ["became", "become", "becoming"],
    "bed-hop": ["bed-hopped", "bed-hopped", "bed-hopping"],
    "bed": ["bedded", "bedded", "bedding"],
    "befall": ["befell", "befallen", "befalling"],
    "befit": ["befitted", "befitted", "befitting"],
    "befog": ["befogged", "befogged", "befogging"],
    "beg": ["begged", "begged", "begging"],
    "beget": ["begot", "begotten", "begetting"],
    "begin": ["began", "begun", "beginning"],
    "begird": ["begirt", "begirt", "begirding"],
    "behold": ["beheld", "beholden", "beholding"],
    "belie": ["belied", "belied", "belying"],
    "belly-flop": ["belly-flopped", "belly-flopped", "belly-flopping"],
    "bend": ["bent", "bent", "bending"],
    "benefit": ["benefitted", "benefitted", "benefitting"],
    "bereave": ["bereft", "bereft", "bereaving"],
    "beseech": ["besought", "besought", "beseeching"],
    "beset": ["beset", "beset", "besetting"],
    "besot": ["besotted", "besotted", "besotting"],
    "bespeak": ["bespoke", "bespoken", "bespeaking"],
    "bespot": ["bespotted", "bespotted", "bespotting"],
    "bestir": ["bestirred", "bestirred", "bestirring"],
    "bestrew": ["bestrewed", "bestrewn", "bestrewing"],
    "bestride": ["bestrode", "bestridden", "bestriding"],
    "bet": ["bet", "bet", "betting"],
    "bethink": ["bethought", "bethought", "bethinking"],
    "bib": ["bibbed", "bibbed", "bibbing"],
    "bid": ["bade", "bidden", "bidding"],
    "bid2": ["bid", "bid", "bidding"],
    "bin": ["binned", "binned", "binning"],
    "bind": ["bound", "bound", "binding"],
    "birdie": ["birdied", "birdied", "birdieing"],
    "bite": ["bit ", "bitten", "biting"],
    "bite2": ["bit", "bitten", "biting"],
    "bivouac": ["bivouacked", "bivouacked", "bivouacking"],
    "blab": ["blabbed", "blabbed", "blabbing"],
    "blackleg": ["blacklegged", "blacklegged", "blacklegging"],
    "blacktop": ["blacktopped", "blacktopped", "blacktopping"],
    "blat": ["blatted", "blatted", "blatting"],
    "bleed": ["bled", "bled", "bleeding"],
    "blob": ["blobbed", "blobbed", "blobbing"],
    "blog": ["blogged", "blogged", "blogging"],
    "blot": ["blotted", "blotted", "blotting"],
    "blow": ["blew", "blown", "blowing"],
    "blub": ["blubbed", "blubbed", "blubbing"],
    "blur": ["blurred", "blurred", "blurring"],
    "bob": ["bobbed", "bobbed", "bobbing"],
    "bobsled": ["bobsledded", "bobsledded", "bobsledding"],
    "bog": ["bogged", "bogged", "bogging"],
    "boogie": ["boogied", "boogied", "boogieing"],
    "bootleg": ["bootlegged", "bootlegged", "bootlegging"],
    "bop": ["bopped", "bopped", "bopping"],
    "bottle-feed": ["bottle-fed", "bottle-fed", "bottle-feeding"],
    "brad": ["bradded", "bradded", "bradding"],
    "brag": ["bragged", "bragged", "bragging"],
    "break": ["broke", "broken", "breaking"],
    "breastfeed": ["breastfed", "breastfed", "breastfeeding"],
    "breed": ["bred", "bred", "breeding"],
    "brim": ["brimmed", "brimmed", "brimming"],
    "bring": ["brought", "brought", "bringing"],
    "broadcast": ["broadcast", "broadcast", "broadcasting"],
    "browbeat": ["browbeat", "browbeaten", "browbeating"],
    "bud": ["budded", "budded", "budding"],
    "buffet": ["buffetted", "buffetted", "buffetting"],
    "bug": ["bugged", "bugged", "bugging"],
    "build": ["built", "built", "building"],
    "bullshit": ["bullshitted", "bullshitted", "bullshitting"],
    "bum": ["bummed", "bummed", "bumming"],
    "bur": ["burred", "burred", "burring"],
    "burn": ["burned", "burned", "burning"],
    "burst": ["burst", "burst", "bursting"],
    "bus": ["bussed", "bussed", "bussing"],
    "bust": ["bust", "bust", "busting"],
    "buy": ["bought", "bought", "buying"],
    "by-bid": ["by-bade", "by-bidden", "by-bidding"],
    "cab": ["cabbed", "cabbed", "cabbing"],
    "cabal": ["caballed", "caballed", "caballing"],
    "caddie": ["caddied", "caddied", "caddying"],
    "can": ["canned", "canned", "canning"],
    "canoe": ["canoed", "canoed", "canoeing"],
    "cap": ["capped", "capped", "capping"],
    "caravan": ["caravanned", "caravanned", "caravanning"],
    "carburet": ["carburetted", "carburetted", "carburetting"],
    "cast": ["cast", "cast", "casting"],
    "cat": ["catted", "catted", "catting"],
    "catch": ["caught", "caught", "catching"],
    "catnap": ["catnapped", "catnapped", "catnapping"],
    "chap": ["chapped", "chapped", "chapping"],
    "char": ["charred", "charred", "charring"],
    "chasse": ["chassed", "chassed", "chasseing"],
    "chat": ["chatted", "chatted", "chatting"],
    "chicken-fight": ["chicken-fought", "chicken-fought", "chicken-fighting"],
    "chin": ["chinned", "chinned", "chinning"],
    "chip": ["chipped", "chipped", "chipping"],
    "chirrup": ["chirrupped", "chirrupped", "chirrupping"],
    "chivy": ["chivvied", "chivvied", "chivvying"],
    "choose": ["chose", "chosen", "choosing"],
    "chop": ["chopped", "chopped", "chopping"],
    "chug": ["chugged", "chugged", "chugging"],
    "clam": ["clammed", "clammed", "clamming"],
    "clap": ["clapped", "clapped", "clapping"],
    "clear-cut": ["clear-cut", "clear-cut", "clear-cutting"],
    "cleave": ["clove", "cloven", "cleaving"],
    "cling": ["clung", "clung", "clinging"],
    "cling2": ["clung", "clung", "clining"],
    "clip": ["clipped", "clipped", "clipping"],
    "clog": ["clogged", "clogged", "clogging"],
    "clop": ["clopped", "clopped", "clopping"],
    "clot": ["clotted", "clotted", "clotting"],
    "clothe": ["clad", "clad", "clothing"],
    "club": ["clubbed", "clubbed", "clubbing"],
    "co-occur": ["co-occurred", "co-occurred", "co-occurring"],
    "co-star": ["co-starred", "co-starred", "co-starring"],
    "cod": ["codded", "codded", "codding"],
    "coif": ["coiffed", "coiffed", "coiffing"],
    "combat": ["combatted", "combatted", "combatting"],
    "come": ["came", "came", "coming"],
    "come2": ["came", "come", "coming"],
    "commit": ["committed", "committed", "committing"],
    "comparison-shop": ["comparison-shopped", "comparison-shopped",
        "comparison-shopping"],
    "compel": ["compelled", "compelled", "compelling"],
    "con": ["conned", "conned", "conning"],
    "conclude": ["conclude", "concluded", "concluding"],
    "conclude2": ["concluded", "concluded", "concluding"],
    "concur": ["concurred", "concurred", "concurring"],
    "confab": ["confabbed", "confabbed", "confabbing"],
    "confer": ["conferred", "conferred", "conferring"],
    "congee": ["congeed", "congeed", "congeeing"],
    "control": ["controlled", "controlled", "controlling"],
    "cop": ["copped", "copped", "copping"],
    "coquet": ["coquetted", "coquetted", "coquetting"],
    "corbel": ["corbelled", "corbelled", "corbelling"],
    "corral": ["corralled", "corralled", "corralling"],
    "cost": ["cost", "cost", "costing"],
    "counterplot": ["counterplotted", "counterplotted", "counterplotting"],
    "countersink": ["countersank", "countersunk", "countersinking"],
    "crab": ["crabbed", "crabbed", "crabbing"],
    "cram": ["crammed", "crammed", "cramming"],
    "crap": ["crapped", "crapped", "crapping"],
    "creep": ["crept", "crept", "creeping"],
    "creep2": ["crept", "crept", "creping"],
    "crenel": ["crenelled", "crenelled", "crenelling"],
    "crib": ["cribbed", "cribbed", "cribbing"],
    "crop": ["cropped", "cropped", "cropping"],
    "cross-refer": ["cross-referred", "cross-referred", "cross-referring"],
    "crossbreed": ["crossbred", "crossbred", "crossbreeding"],
    "crosscut": ["crosscut", "crosscut", "crosscutting"],
    "cub": ["cubbed", "cubbed", "cubbing"],
    "cup": ["cupped", "cupped", "cupping"],
    "custom-make": ["custom-made", "custom-made", "custom-making"],
    "cut": ["cut", "cut", "cutting"],
    "dab": ["dabbed", "dabbed", "dabbing"],
    "dam": ["dammed", "dammed", "damming"],
    "deal": ["dealt", "dealt", "dealing"],
    "debar": ["debarred", "debarred", "debarring"],
    "debug": ["debugged", "debugged", "debugging"],
    "decontrol": ["decontrolled", "decontrolled", "decontrolling"],
    "decree": ["decreed", "decreed", "decreeing"],
    "deep-dye": ["deep-dyed", "deep-dyed", "deep-dyeing"],
    "defer": ["deferred", "deferred", "deferring"],
    "defog": ["defogged", "defogged", "defogging"],
    "degas": ["degassed", "degassed", "degassing"],
    "demob": ["demobbed", "demobbed", "demobbing"],
    "demur": ["demurred", "demurred", "demurring"],
    "deter": ["deterred", "deterred", "deterring"],
    "diagram": ["diagrammed", "diagrammed", "diagramming"],
    "dial": ["dialled", "dialled", "dialling"],
    "die": ["died", "died", "dying"],
    "dig": ["dug", "dug", "digging"],
    "dim": ["dimmed", "dimmed", "dimming"],
    "din": ["dinned", "dinned", "dinning"],
    "dip": ["dipped", "dipped", "dipping"],
    "dis": ["dissed", "dissed", "dissing"],
    "disagree": ["disagreed", "disagreed", "disagreeing"],
    "disbar": ["disbarred", "disbarred", "disbarring"],
    "disbud": ["disbudded", "disbudded", "disbudding"],
    "discomfit": ["discomfitted", "discomfitted", "discomfitting"],
    "disinter": ["disinterred", "disinterred", "disinterring"],
    "dispel": ["dispelled", "dispelled", "dispelling"],
    "distil": ["distilled", "distilled", "distilling"],
    "dive": ["dived", "dived", "diving"],
    "do": ["did", "done", "doing"],
    "dog": ["dogged", "dogged", "dogging"],
    "don": ["donned", "donned", "donning"],
    "dot": ["dotted", "dotted", "dotting"],
    "drag": ["dragged", "dragged", "dragging"],
    "draw": ["drew", "drawn", "drawing"],
    "dream": ["dreamed", "dreamed", "dreaming"],
    "dream2": ["dreamt", "dreamt", "dreaming"],
    "drink": ["drank", "drunk", "drinking"],
    "drip": ["dripped", "dripped", "dripping"],
    "drive": ["drove", "driven", "driving"],
    "drop": ["dropped", "dropped", "dropping"],
    "drub": ["drubbed", "drubbed", "drubbing"],
    "drug": ["drugged", "drugged", "drugging"],
    "drum": ["drummed", "drummed", "drumming"],
    "dry-rot": ["dry-rotted", "dry-rotted", "dry-rotting"],
    "dub": ["dubbed", "dubbed", "dubbing"],
    "duel": ["duelled", "duelled", "duelling"],
    "dun": ["dunned", "dunned", "dunning"],
    "dwell": ["dwelt", "dwelt", "dwelling"],
    "dye": ["dyed", "dyed", "dyeing"],
    "eat": ["ate", "eaten", "eating"],
    "eavesdrop": ["eavesdropped", "eavesdropped", "eavesdropping"],
    "egotrip": ["egotripped", "egotripped", "egotripping"],
    "embed": ["embedded", "embedded", "embedding"],
    "emcee": ["emceed", "emceed", "emceeing"],
    "emit": ["emitted", "emitted", "emitting"],
    "englut": ["englutted", "englutted", "englutting"],
    "enrol": ["enrolled", "enrolled", "enrolling"],
    "enthral": ["enthralled", "enthralled", "enthralling"],
    "entrap": ["entrapped", "entrapped", "entrapping"],
    "enwrap": ["enwrapped", "enwrapped", "enwrapping"],
    "equip": ["equipped", "equipped", "equipping"],
    "excel": ["excelled", "excelled", "excelling"],
    "expel": ["expelled", "expelled", "expelling"],
    "extol": ["extolled", "extolled", "extolling"],
    "eye": ["eyed", "eyed", "eyeing"],
    "facsimile": ["facsimiled", "facsimiled", "facsimileing"],
    "fag": ["fagged", "fagged", "fagging"],
    "fall": ["fell", "fallen", "falling"],
    "fan": ["fanned", "fanned", "fanning"],
    "fat": ["fatted", "fatted", "fatting"],
    "featherbed": ["featherbedded", "featherbedded", "featherbedding"],
    "fee": ["feed", "feed", "feeing"], // WRONG?
    "feed": ["fed", "fed", "feeding"],
    "feel": ["felt", "felt", "feeling"],
    "fib": ["fibbed", "fibbed", "fibbing"],
    "fight": ["fought", "fought", "fighting"],
    "filigree": ["filigreed", "filigreed", "filigreeing"],
    "film-make": ["film-made", "film-made", "film-making"],
    "fin": ["finned", "finned", "finning"],
    "find": ["found", "found", "finding"],
    "fit": ["fit", "fit", "fitting"],
    "fit2": ["fitted", "fitted", "fitting"],
    "flag": ["flagged", "flagged", "flagging"],
    "flambe": ["flambeed", "flambeed", "flambeing"],
    "flap": ["flapped", "flapped", "flapping"],
    "flash-freeze": ["flash-froze", "flash-frozen", "flash-freezing"],
    "flat-hat": ["flat-hatted", "flat-hatted", "flat-hatting"],
    "flee": ["fled", "fled", "fleeing"],
    "flim-flam": ["flim-flammed", "flim-flammed", "flim-flamming"],
    "fling": ["flung", "flung", "flinging"],
    "flip-flop": ["flip-flopped", "flip-flopped", "flip-flopping"],
    "flip": ["flipped", "flipped", "flipping"],
    "flit": ["flitted", "flitted", "flitting"],
    "flog": ["flogged", "flogged", "flogging"],
    "floodlight": ["floodlit", "floodlit", "floodlighting"],
    "flop": ["flopped", "flopped", "flopping"],
    "flub": ["flubbed", "flubbed", "flubbing"],
    "fly": ["flew", "flown", "flying"],
    "fob": ["fobbed", "fobbed", "fobbing"],
    "focus": ["focussed", "focussed", "focussing"],
    "fog": ["fogged", "fogged", "fogging"],
    "footslog": ["footslogged", "footslogged", "footslogging"],
    "forbear": ["forbore", "forborne", "forbearing"],
    "forbid": ["forbade", "forbidden", "forbidding"],
    "force-feed": ["force-fed", "force-fed", "force-feeding"],
    "forecast": ["forecast", "forecast", "forecasting"],
    "forego": ["forewent", "foregone", "foregoing"],
    "foreknow": ["foreknew", "foreknown", "foreknowing"],
    "foresee": ["foresaw", "foreseen", "foreseeing"],
    "foreshow": ["foreshowed", "foreshown", "foreshowing"],
    "foreswear": ["foreswore", "foreswore", "foreswearing"],
    "foretell": ["foretold", "foretold", "foretelling"],
    "forget": ["forgot", "forgotten", "forgetting"],
    "forgive": ["forgave", "forgiven", "forgiving"],
    "forgo": ["forwent", "forgone", "forgoing"],
    "format": ["formatted", "formatted", "formatting"],
    "forsake": ["forsook", "forsaken", "forsaking"],
    "forswear": ["forswore", "forsworn", "forswearing"],
    "foxtrot": ["foxtrotted", "foxtrotted", "foxtrotting"],
    "frap": ["frapped", "frapped", "frapping"],
    "free": ["freed", "freed", "freeing"],
    "freeze": ["froze", "frozen", "freezing"],
    "fret": ["fretted", "fretted", "fretting"],
    "fricassee": ["fricasseed", "fricasseed", "fricasseeing"],
    "frog": ["frogged", "frogged", "frogging"],
    "frolic": ["frolicked", "frolicked", "frolicking"],
    "fuel": ["fuelled", "fuelled", "fuelling"],
    "fulfil": ["fulfilled", "fulfilled", "fulfilling"],
    "gad": ["gadded", "gadded", "gadding"],
    "gag": ["gagged", "gagged", "gagging"],
    "gainsay": ["gainsaid", "gainsaid", "gainsaying"],
    "gap": ["gapped", "gapped", "gapping"],
    "garnishee": ["garnisheed", "garnisheed", "garnisheeing"], // WRONG?
    "gas": ["gassed", "gassed", "gassing"],
    "gee": ["geed", "geed", "geeing"], // WRONG?
    "gel": ["gelled", "gelled", "gelling"],
    "geld": ["gelded", "gelt", "gelding"],
    "get": ["got", "gotten", "getting"],
    "ghostwrite": ["ghostwrote", "ghostwritten", "ghostwriting"],
    "gift-wrap": ["gift-wrapped", "gift-wrapped", "gift-wrapping"],
    "gin": ["ginned", "gan", "ginning"],
    "gip": ["gipped", "gipped", "gipping"],
    "give": ["gave", "given", "giving"],
    "globe-trot": ["globe-trotted", "globe-trotted", "globe-trotting"],
    "glom": ["glommed", "glommed", "glomming"],
    "glug": ["glugged", "glugged", "glugging"],
    "glut": ["glutted", "glutted", "glutting"],
    "go": ["went", "gone", "going"],
    "gossip": ["gossipped", "gossipped", "gossipping"],
    "grab": ["grabbed", "grabbed", "grabbing"],
    "grave": ["graved", "graven", "graving"],
    "grin": ["grinned", "grinned", "grinning"],
    "grind": ["ground", "ground", "grinding"],
    "grip": ["gripped", "gripped", "gripping"],
    "grit": ["gritted", "gritted", "gritting"],
    "grow": ["grew", "grown", "growing"],
    "grub": ["grubbed", "grubbed", "grubbing"],
    "guarantee": ["guaranteed", "guaranteed", "guaranteeing"],
    "gum": ["gummed", "gummed", "gumming"],
    "gun": ["gunned", "gunned", "gunning"],
    "gut": ["gutted", "gutted", "gutting"],
    "gyp": ["gypped", "gypped", "gypping"],
    "ham": ["hammed", "hammed", "hamming"],
    "hamstring": ["hamstrung", "hamstrung", "hamstringing"],
    "hand-build": ["hand-built", "hand-built", "hand-building"],
    "hand-dye": ["hand-dyed", "hand-dyed", "hand-dyeing"],
    "handicap": ["handicapped", "handicapped", "handicapping"],
    "handwrite": ["handwrote", "handwritten", "handwriting"],
    "hang": ["hung", "hung", "hanging"],
    "hap": ["happed", "happed", "happing"],
    "happy-slap": ["happy-slapped", "happy-slapped", "happy-slapping"],
    "hat": ["hatted", "hatted", "hatting"],
    "have": ["had", "had", "having"],
    "hear": ["heard", "heard", "hear"],
    "hear2": ["heard", "heard", "hearing"],
    "hedgehop": ["hedgehopped", "hedgehopped", "hedgehopping"],
    "hem": ["hemmed", "hemmed", "hemming"],
    "hero-worship": ["hero-worshipped", "hero-worshipped", "hero-worshipping"],
    "hew": ["hewed", "hewn", "hewing"],
    "hiccup": ["hiccupped", "hiccupped", "hiccupping"],
    "hide": ["hid", "hidden", "hiding"],
    "hie": ["hied", "hied", "hieing"],
    "hit": ["hit", "hit", "hit"],
    "hit2": ["hit", "hit", "hitting"],
    "hob": ["hobbed", "hobbed", "hobbing"],
    "hobnob": ["hobnobbed", "hobnobbed", "hobnobbing"],
    "hoe": ["hoed", "hoed", "hoeing"],
    "hog-tie": ["hog-tied", "hog-tied", "hog-tying"],
    "hog": ["hogged", "hogged", "hogging"],
    "hold": ["held", "held", "holding"],
    "honey": ["honied", "honied", "honeying"],
    "hop-skip": ["hop-skipped", "hop-skipped", "hop-skipping"],
    "hop": ["hopped", "hopped", "hopping"],
    "horseshoe": ["horseshoed", "horseshoed", "horseshoeing"],
    "horsewhip": ["horsewhipped", "horsewhipped", "horsewhipping"],
    "hot-dog": ["hot-dogged", "hot-dogged", "hot-dogging"],
    "housebreak": ["housebroke", "housebroken", "housebreaking"],
    "housekeep": ["housekept", "housekept", "housekeeping"],
    "hue": ["hued", "hued", "hueing"],
    "hug": ["hugged", "hugged", "hugging"],
    "hum": ["hum", "hummed", "humming"],
    "hum2": ["hummed", "hummed", "humming"],
    "humbug": ["humbugged", "humbugged", "humbugging"],
    "hurt": ["hurt", "hurt", "hurting"],
    "imbed": ["imbedded", "imbedded", "imbedding"],
    "impel": ["impelled", "impelled", "impelling"],
    "imperil": ["imperilled", "imperilled", "imperilling"],
    "impulse-buy": ["impulse-bought", "impulse-bought", "impulse-buying"],
    "incur": ["incurred", "incurred", "incurring"],
    "indwell": ["indwelt", "indwelt", "indwelling"],
    "infer": ["inferred", "inferred", "inferring"],
    "initial": ["initialled", "initialled", "initialling"],
    "inlay": ["inlaid", "inlaid", "inlaying"],
    "input": ["inputted", "inputted", "inputting"],
    "inset": ["inset", "inset", "insetting"],
    "inspan": ["inspanned", "inspanned", "inspanning"],
    "instal": ["installed", "installed", "installing"],
    "instil": ["instilled", "instilled", "instilling"],
    "inter": ["interred", "interred", "interring"],
    "interbreed": ["interbred", "interbred", "interbreeding"],
    "intermit": ["intermitted", "intermitted", "intermitting"],
    "interweave": ["interwove", "interwoven", "interweaving"],
    "inweave": ["inwove", "inwoven", "inweaving"],
    "jab": ["jabbed", "jabbed", "jabbing"],
    "jag": ["jagged", "jagged", "jagging"],
    "jam": ["jammed", "jammed", "jamming"],
    "japan": ["japanned", "japanned", "japanning"],
    "jar": ["jarred", "jarred", "jarring"],
    "jet": ["jetted", "jetted", "jetting"],
    "jib": ["jibbed", "jibbed", "jibbing"],
    "jig": ["jigged", "jigged", "jigging"],
    "jitterbug": ["jitterbugged", "jitterbugged", "jitterbugging"],
    "job": ["jobbed", "jobbed", "jobbing"],
    "jog": ["jogged", "jogged", "jogging"],
    "jot": ["jotted", "jotted", "jotting"],
    "joyride": ["joyrode", "joyridden", "joyriding"],
    "jug": ["jugged", "jugged", "jugging"],
    "jut": ["jutted", "jutted", "jutting"],
    "keep": ["kept", "kept", "keeping"],
    "kid": ["kidded", "kidded", "kidding"],
    "kidnap": ["kidnapped", "kidnapped", "kidnapping"],
    "kip": ["kipped", "kipped", "kipping"],
    "kit": ["kitted", "kitted", "kitting"],
    "knap": ["knapped", "knapped", "knapping"],
    "kneecap": ["kneecapped", "kneecapped", "kneecapping"],
    "kneel": ["knelt", "knelt", "kneeling"],
    "knit": ["knit", "knit", "knitting"],
    "knit2": ["knitted", "knitted", "knitting"],
    "knot": ["knotted", "knotted", "knotting"],
    "know": ["knew", "known", "knowing"],
    "lade": ["laded", "laden", "lading"],
    "lag": ["lagged", "lagged", "lagging"],
    "lam": ["lammed", "lammed", "lamming"],
    "lap": ["lapped", "lapped", "lapping"],
    "lay": ["laid", "laid", "lay"],
    "lay2": ["laid", "laid", "laying"],
    "lead": ["led", "led", "lead"],
    "lead2": ["led", "led", "leading"],
    "leap": ["leaped", "leaped", "leap"],
    "leap2": ["leapt", "leapt", "leaping"],
    "leapfrog": ["leapfrogged", "leapfrogged", "leapfrogging"],
    "learn": ["learned", "learned", "learn"],
    "learn2": ["learnt", "learnt", "learning"],
    "leave": ["left", "left", "leaving"],
    "lend": ["lent", "lent", "lending"],
    "let": ["let", "let", "let"],
    "let2": ["let", "let", "letting"],
    "lie": ["lay", "lain", "lying"],
    "lie2": ["lied", "lain", "lying"],
    "light": ["lit", "lighted", "lighting"],
    "light2": ["lit", "lit", "lighting"],
    "lip-read": ["lip-read", "lip-read", "lip-reading"],
    "lob": ["lobbed", "lobbed", "lobbing"],
    "log-in": ["logged-in", "logged-in", "logging-in"],
    "log": ["logged", "logged", "logging"],
    "lollop": ["lollopped", "lollopped", "lollopping"],
    "lop": ["lopped", "lopped", "lopping"],
    "lose": ["lost", "lost", "losing"],
    "lug": ["lugged", "lugged", "lugging"],
    "make": ["made", "made", "making"],
    "man": ["manned", "manned", "manning"],
    "manumit": ["manumitted", "manumitted", "manumitting"],
    "map": ["mapped", "mapped", "mapping"],
    "mar": ["marred", "marred", "marring"],
    "mat": ["matted", "matted", "matting"],
    "matt-up": ["matt-upped", "matt-upped", "matt-upping"],
    "mean": ["meant", "meant", "meaning"],
    "meet": ["met", "met", "meeting"],
    "melt": ["melted", "molten", "melting"],
    "mimic": ["mimicked", "mimicked", "mimicking"],
    "miscast": ["miscast", "miscast", "miscasting"],
    "misdeal": ["misdealt", "misdealt", "misdealing"],
    "misdo": ["misdid", "misdone", "misdoing"],
    "misgive": ["misgave", "misgiven", "misgiving"],
    "mislay": ["mislaid", "mislaid", "mislaying"],
    "mislead": ["misled", "misled", "misleading"],
    "misread": ["misread", "misread", "misreading"],
    "misspeak": ["misspoke", "misspoken", "misspeaking"],
    "misspell": ["misspelled", "misspelled", "misspelling"],
    "misspend": ["misspent", "misspent", "misspending"],
    "mistake": ["mistook", "mistaken", "mistake"],
    "mistake2": ["mistook", "mistaken", "mistaking"],
    "misunderstand": ["misunderstood", "misunderstood", "misunderstanding"],
    "mob": ["mobbed", "mobbed", "mobbing"],
    "model": ["modelled", "modelled", "modelling"],
    "mop": ["mopped", "mopped", "mopping"],
    "move": ["moved", "moved", "moving"],
    "mow": ["mowed", "mowed", "mowing"],
    "mow2": ["mowed", "mown", "mowing"],
    "mud": ["mudded", "mudded", "mudding"],
    "mug": ["mugged", "mugged", "mugging"],
    "nab": ["nabbed", "nabbed", "nabbing"],
    "nag": ["nagged", "nagged", "nagging"],
    "nap": ["napped", "napped", "napping"],
    "net": ["netted", "netted", "netting"],
    "nip": ["nipped", "nipped", "nipping"],
    "nod": ["nodded", "nodded", "nodding"],
    "nonplus": ["nonplussed", "nonplussed", "nonplussing"],
    "nut": ["nutted", "nutted", "nutting"],
    "occur": ["occurred", "occurred", "occurring"],
    "offset": ["offset", "offset", "offsetting"],
    "omit": ["omitted", "omitted", "omitting"],
    "one-step": ["one-stepped", "one-stepped", "one-stepping"],
    "open": ["opened", "opened", "opening"],
    "outbid": ["outbid", "outbid", "outbidding"],
    "outcrop": ["outcropped", "outcropped", "outcropping"],
    "outdo": ["outdid", "outdone", "outdoing"],
    "outfight": ["outfought", "outfought", "outfighting"],
    "outfit": ["outfitted", "outfitted", "outfitting"],
    "outgo": ["outwent", "outgone", "outgoing"],
    "outgrow": ["outgrew", "outgrown", "outgrowing"],
    "output": ["outputted", "outputted", "outputting"],
    "outride": ["outrode", "outridden", "outriding"],
    "outrun": ["outran", "outran", "outrunning"],
    "outsell": ["outsold", "outsold", "outselling"],
    "outshine": ["outshone", "outshone", "outshining"],
    "outspan": ["outspanned", "outspanned", "outspanning"],
    "outstrip": ["outstripped", "outstripped", "outstripping"],
    "outvie": ["outvied", "outvieed", "outvieing"],
    "outwear": ["outwore", "outworn", "outwearing"],
    "outwit": ["outwitted", "outwitted", "outwitting"],
    "overbear": ["overbore", "overborne", "overbearing"],
    "overbid": ["overbid", "overbid", "overbidding"],
    "overcast": ["overcast", "overcast", "overcasting"],
    "overcome": ["overcame", "overcame", "overcoming"],
    "overcome2": ["overcame", "overcome", "overcoming"],
    "overcrop": ["overcropped", "overcropped", "overcropping"],
    "overdo": ["overdid", "overdone", "overdoing"],
    "overdraw": ["overdrew", "overdrawn", "overdrawing"],
    "overdrive": ["overdrove", "overdriven", "overdriving"],
    "overfly": ["overflew", "overflown", "overflying"],
    "overgrow": ["overgrew", "overgrown", "overgrowing"],
    "overhang": ["overhung", "overhung", "overhanging"],
    "overhear": ["overheard", "overheard", "overhearing"],
    "overlap": ["overlapped", "overlapped", "overlapping"],
    "overlay": ["overlaid", "overlaid", "overlaying"],
    "overlie": ["overlay", "overlain", "overlying"],
    "overpay": ["overpaid", "overpaid", "overpaying"],
    "override": ["overrode", "overridden", "overriding"],
    "overrun": ["overran", "overran", "overrunning"],
    "oversee": ["oversaw", "overseen", "overseeing"],
    "oversew": ["oversewed", "oversewn", "oversewing"],
    "overshoot": ["overshot", "overshot", "overshooting"],
    "oversleep": ["overslept", "overslept", "oversleeping"],
    "overspend": ["overspent", "overspent", "overspending"],
    "overstep": ["overstepped", "overstepped", "overstepping"],
    "overtake": ["overtook", "overtaken", "overtaking"],
    "overthrow": ["overthrew", "overthrown", "overthrowing"],
    "overtop": ["overtopped", "overtopped", "overtopping"],
    "overwrite": ["overwrote", "overwritten", "overwriting"],
    "pad": ["padded", "padded", "padding"],
    "pan": ["panned", "panned", "panning"],
    "panic": ["panicked", "panicked", "panicking"],
    "par": ["parred", "parred", "parring"],
    "partake": ["partook", "partaken", "partaking"],
    "pat": ["patted", "patted", "patting"],
    "patrol": ["patrolled", "patrolled", "patrolling"],
    "pay": ["paid", "paid", "paying"],
    "pee-pee": ["pee-peed", "pee-peed", "pee-peeing"],
    "pee": ["peed", "peed", "peeing"],
    "peg": ["pegged", "pegged", "pegging"],
    "pen": ["penned", "penned", "penning"],
    "permit": ["permitted", "permitted", "permitting"],
    "pet": ["petted", "petted", "petting"],
    "pettifog": ["pettifogged", "pettifogged", "pettifogging"],
    "photostat": ["photostatted", "photostatted", "photostatting"],
    "picnic": ["picnicked", "picnicked", "picnicking"],
    "piece-dye": ["piece-dyed", "piece-dyed", "piece-dyeing"],
    "pig": ["pigged", "pigged", "pigging"],
    "pin": ["pinned", "pinned", "pinning"],
    "pip": ["pipped", "pipped", "pipping"],
    "pistol-whip": ["pistol-whipped", "pistol-whipped", "pistol-whipping"],
    "pit": ["pitted", "pitted", "pitting"],
    "plan": ["planned", "planned", "planning"],
    "plead": ["pleaded", "pleaded", "pleading"],
    "plead2": ["pled", "pled", "pleading"],
    "plod": ["plodded", "plodded", "plodding"],
    "plop": ["plopped", "plopped", "plopping"],
    "plot": ["plotted", "plotted", "plotting"],
    "plug": ["plugged", "plugged", "plugging"],
    "plummet": ["plummetted", "plummetted", "plummetting"],
    "pod": ["podded", "podded", "podding"],
    "pop": ["popped", "popped", "popping"],
    "pot": ["potted", "potted", "potting"],
    "prefer": ["preferred", "preferred", "preferring"],
    "prepay": ["prepaid", "prepaid", "prepaying"],
    "prim": ["primmed", "primmed", "primming"],
    "prizefight": ["prizefought", "prizefought", "prizefighting"],
    "prod": ["prodded", "prodded", "prodding"],
    "program": ["programmed", "programmed", "programming"],
    "prop": ["propped", "propped", "propping"],
    "propel": ["propelled", "propelled", "propelling"],
    "prove": ["proved", "proved", "proving"],
    "prove2": ["proved", "proven", "proving"],
    "pun": ["punned", "punned", "punning"],
    "pup": ["pupped", "pupped", "pupping"],
    "puree": ["pureed", "pureed", "pureeing"],
    "put": ["put", "put", "putting"],
    "queue": ["queued", "queued", "queueing"],
    "quick-freeze": ["quick-froze", "quick-frozen", "quick-freezing"],
    "quickstep": ["quickstepped", "quickstepped", "quickstepping"],
    "quip": ["quipped", "quipped", "quipping"],
    "quit": ["quit", "quit", "quitting"],
    "quiz": ["quizzed", "quizzed", "quizzing"],
    "rabbit": ["rabbitted", "rabbitted", "rabbitting"],
    "radiate": ["radiated", "radiated", "radiating"],
    "rag": ["ragged", "ragged", "ragging"],
    "ram": ["rammed", "rammed", "ramming"],
    "rap": ["rapped", "rapped", "rapping"],
    "rat": ["ratted", "ratted", "ratting"],
    "re-equip": ["re-equipped", "re-equipped", "re-equipping"],
    "read": ["read", "read", "reading"],
    "readmit": ["readmitted", "readmitted", "readmitting"],
    "reallot": ["reallotted", "reallotted", "reallotting"],
    "reave": ["reft", "reft", "reaving"],
    "rebel": ["rebelled", "rebelled", "rebelling"],
    "rebind": ["rebound", "rebound", "rebinding"],
    "rebuild": ["rebuilt", "rebuilt", "rebuilding"],
    "rebut": ["rebutted", "rebutted", "rebutting"],
    "recap": ["recapped", "recapped", "recapping"],
    "recast": ["recast", "recast", "recasting"],
    "recommit": ["recommitted", "recommitted", "recommitting"],
    "recur": ["recurred", "recurred", "recurring"],
    "red-eye": ["red-eyed", "red-eyed", "red-eyeing"],
    "redo": ["redid", "redone", "redoing"],
    "reeve": ["rove", "rove", "reeving"],
    "refer": ["referred", "referred", "referring"],
    "referee": ["refereed", "refereed", "refereeing"],
    "refit": ["refitted", "refitted", "refitting"],
    "regret": ["regretted", "regretted", "regretting"],
    "rejig": ["rejigged", "rejigged", "rejigging"],
    "relay": ["relaid", "relaid", "relaying"],
    "remake": ["remade", "remade", "remaking"],
    "remit": ["remitted", "remitted", "remitting"],
    "rend": ["rent", "rent", "rending"],
    "render-set": ["render-set", "render-set", "render-setting"],
    "repay": ["repaid", "repaid", "repaying"],
    "repel": ["repelled", "repelled", "repelling"],
    "repot": ["repotted", "repotted", "repotting"],
    "reread": ["reread", "reread", "rereading"],
    "rerun": ["reran", "reran", "rerunning"],
    "resell": ["resold", "resold", "reselling"],
    "reset": ["reset", "reset", "resetting"],
    "resew": ["resewed", "resewn", "resewing"],
    "reship": ["reshipped", "reshipped", "reshipping"],
    "reshoot": ["reshot", "reshot", "reshooting"],
    "resubmit": ["resubmitted", "resubmitted", "resubmitting"],
    "ret": ["retted", "retted", "retting"],
    "retake": ["retook", "retaken", "retaking"],
    "retell": ["retold", "retold", "retelling"],
    "rethink": ["rethought", "rethought", "rethinking"],
    "retie": ["retied", "retied", "retying"],
    "retransmit": ["retransmitted", "retransmitted", "retransmitting"],
    "retrofit": ["retrofitted", "retrofitted", "retrofitting"],
    "rev": ["revved", "revved", "revving"],
    "revet": ["revetted", "revetted", "revetting"],
    "rewrite": ["rewrote", "rewritten", "rewriting"],
    "rib": ["ribbed", "ribbed", "ribbing"],
    "rid": ["rid", "rid", "ridding"],
    "rid2": ["ridded", "ridded", "ridding"],
    "ride": ["rode", "ridden", "riding"],
    "rig": ["rigged", "rigged", "rigging"],
    "rim": ["rimmed", "rimmed", "rimming"],
    "ring": ["rang", "rung", "ringing"],
    "rip": ["ripped", "ripped", "ripping"],
    "rise": ["rose", "risen", "rising"],
    "rive": ["rived", "riven", "riving"],
    "rob": ["robbed", "robbed", "robbing"],
    "rot": ["rotted", "rotted", "rotting"],
    "rough-hew": ["rough-hewed", "rough-hewn", "rough-hewing"],
    "roughcast": ["roughcast", "roughcast", "roughcasting"],
    "rub": ["rubbed", "rubbed", "rubbing"],
    "run": ["ran", "run", "running"],
    "run2": ["ran", "ran", "running"],
    "rut": ["rutted", "rutted", "rutting"],
    "sag": ["sagged", "sagged", "sagging"],
    "sandbag": ["sandbagged", "sandbagged", "sandbagging"],
    "sap": ["sapped", "sapped", "sapping"],
    "saute": ["sauteed", "sauteed", "sauteing"],
    "saw": ["sawed", "sawed", "sawing"],
    "say": ["said", "said", "saying"],
    "scab": ["scabbed", "scabbed", "scabbing"],
    "scam": ["scammed", "scammed", "scamming"],
    "scan": ["scanned", "scanned", "scanning"],
    "scar": ["scarred", "scarred", "scarring"],
    "scat": ["scatted", "scatted", "scatting"],
    "schlep": ["schlepped", "schlepped", "schlepping"],
    "scrag": ["scragged", "scragged", "scragging"],
    "scram": ["scrammed", "scrammed", "scramming"],
    "scrap": ["scrapped", "scrapped", "scrapping"],
    "scrub": ["scrubbed", "scrubbed", "scrubbing"],
    "scud": ["scudded", "scudded", "scudding"],
    "scum": ["scummed", "scummed", "scumming"],
    "see": ["saw", "seen", "seeing"],
    "seek": ["sought", "sought", "seeking"],
    "sell": ["sold", "sold", "selling"],
    "send": ["sent", "sent", "sending"],
    "set": ["set", "set", "setting"],
    "sew": ["sewed", "sewed", "sewing"],
    "sew2": ["sewed", "sewn", "sewing"],
    "shag": ["shagged", "shagged", "shagging"],
    "shake": ["shook", "shaken", "shaking"],
    "sham": ["shammed", "shammed", "shamming"],
    "sharpshoot": ["sharpshot", "sharpshot", "sharpshooting"],
    "shave": ["shaved", "shaved", "shaving"],
    "shave2": ["shaved", "shaven", "shaving"],
    "she-bop": ["she-bopped", "she-bopped", "she-bopping"],
    "shear": ["sheared", "shorn", "shearing"],
    "shear2": ["shore", "shorn", "shearing"],
    "shed": ["shed", "shed", "shedding"],
    "shellac": ["shellacked", "shellacked", "shellacking"],
    "shew": ["shewed", "shewn", "shewing"],
    "shin": ["shinned", "shinned", "shinning"],
    "shine": ["shone", "shone", "shining"],
    "ship": ["shipped", "shipped", "shipping"],
    "shit": ["shat", "shat", "shitting"],
    "shoe": ["shod", "shod", "shoeing"],
    "shoe2": ["shoed", "shoed", "shoeing"],
    "shoetree": ["shoetreed", "shoetreed", "shoetreeing"], // WRONG?
    "shoot": ["shot", "shot", "shooting"],
    "shop": ["shopped", "shopped", "shopping"],
    "show": ["showed", "showed", "showing"],
    "show2": ["showed", "shown", "showing"],
    "shred": ["shredded", "shredded", "shredding"],
    "shrink": ["shrank", "shrunk", "shrinking"],
    "shrinkwrap": ["shrinkwrapped", "shrinkwrapped", "shrinkwrapping"],
    "shrive": ["shrove", "shriven", "shriving"],
    "shrug": ["shrugged", "shrugged", "shrugging"],
    "shun": ["shunned", "shunned", "shunning"],
    "shut": ["shut", "shut", "shutting"],
    "sic": ["sicced", "sicced", "siccing"],
    "side-slip": ["side-slipped", "side-slipped", "side-slipping"],
    "sidestep": ["sidestepped", "sidestepped", "sidestepping"],
    "sight-read": ["sight-read", "sight-read", "sight-reading"],
    "sight-sing": ["sight-sang", "sight-sung", "sight-singing"],
    "sightsee": ["sightsaw", "sightseen", "sightseeing"],
    "signal": ["signalled", "signalled", "signalling"],
    "sin": ["sinned", "sinned", "sinning"],
    "sing": ["sang", "sung", "singing"],
    "singe": ["singed", "singed", "singeing"],
    "sink": ["sank", "sunk", "sinking"],
    "sip": ["sipped", "sipped", "sipping"],
    "sit": ["sat", "sat", "sitting"],
    "skid": ["skidded", "skidded", "skidding"],
    "skim": ["skimmed", "skimmed", "skimming"],
    "skin": ["skinned", "skinned", "skinning"],
    "skinny-dip": ["skinny-dipped", "skinny-dipped", "skinny-dipping"],
    "skip": ["skipped", "skipped", "skipping"],
    "skydive": ["skydove", "skydove", "skydiving"],
    "slag": ["slagged", "slagged", "slagging"],
    "slam": ["slammed", "slammed", "slamming"],
    "slap": ["slapped", "slapped", "slapping"],
    "slay": ["slew", "slain", "slaying"],
    "sled": ["sledded", "sledded", "sledding"],
    "sleep": ["slept", "slept", "sleeping"],
    "slide": ["slid", "slid", "sliding"],
    "slim": ["slimmed", "slimmed", "slimming"],
    "sling": ["slung", "slung", "slinging"],
    "slink": ["slunk", "slunk", "slinking"],
    "slip": ["slipped", "slipped", "slipping"],
    "slit": ["slit", "slit", "slitting"],
    "slog": ["slogged", "slogged", "slogging"],
    "slop": ["slopped", "slopped", "slopping"],
    "slot": ["slotted", "slotted", "slotting"],
    "slug": ["slugged", "slugged", "slugging"],
    "slum": ["slummed", "slummed", "slumming"],
    "slur": ["slurred", "slurred", "slurring"],
    "smite": ["smit", "smitten", "smiting"],
    "smite2": ["smote", "smitten", "smiting"],
    "smut": ["smutted", "smutted", "smutting"],
    "snag": ["snagged", "snagged", "snagging"],
    "snap": ["snapped", "snapped", "snapping"],
    "snip": ["snipped", "snipped", "snipping"],
    "snog": ["snogged", "snogged", "snogging"],
    "snorkel": ["snorkelled", "snorkelled", "snorkelling"],
    "snowshoe": ["snowshoed", "snowshoed", "snowshoeing"],
    "snub": ["snubbed", "snubbed", "snubbing"],
    "sob": ["sobbed", "sobbed", "sobbing"],
    "sod": ["sodded", "sodded", "sodding"],
    "sop": ["sopped", "sopped", "sopping"],
    "sow": ["sowed", "sowed", "sowing"],
    "sow2": ["sowed", "sown", "sowing"],
    "spam": ["spammed", "spammed", "spamming"],
    "span": ["spanned", "spanned", "spanning"],
    "spar": ["sparred", "sparred", "sparring"],
    "spat": ["spatted", "spatted", "spatting"],
    "speak": ["spoke", "spoken", "speaking"],
    "speech-read": ["speech-read", "speech-read", "speech-reading"],
    "speed": ["sped", "sped", "speeding"],
    "spellbind": ["spellbound", "spellbound", "spellbinding"],
    "spend": ["spent", "spent", "spending"],
    "spill": ["spilled", "spilled", "spilling"],
    "spin": ["spun", "spun", "spining"],
    "spin2": ["spun", "spun", "spinning"],
    "spit": ["spat", "spat", "spitting"],
    "spit2": ["spit", "spit", "spitting"],
    "splat": ["splatted", "splatted", "splatting"],
    "split": ["split", "split", "splitting"],
    "spoil": ["spoilt", "spoilt", "spoiling"],
    "spot": ["spotted", "spotted", "spotting"],
    "spotlight": ["spotlit", "spotlit", "spotlighting"],
    "spread": ["spread", "spread", "spreading"],
    "spree": ["spreed", "spreed", "spreeing"], // WRONG?
    "spring": ["sprang", "sprung", "springing"],
    "spud": ["spudded", "spudded", "spudding"],
    "spur": ["spurred", "spurred", "spurring"],
    "squat": ["squatted", "squatted", "squatting"],
    "squeegee": ["squeegeed", "squeegeed", "squeegeeing"],
    "stab": ["stabbed", "stabbed", "stabbing"],
    "stag": ["stagged", "stagged", "stagging"],
    "stand": ["stood", "stood", "standing"],
    "star": ["starred", "starred", "starring"],
    "stare": ["stare", "stared", "staring"],
    "stare2": ["stared", "stared", "staring"],
    "stave": ["stove", "stove", "staving"],
    "steal": ["stole", "stolen", "stealing"],
    "stem": ["stemmed", "stemmed", "stemming"],
    "step": ["stepped", "stepped", "stepping"],
    "stet": ["stetted", "stetted", "stetting"],
    "stick": ["stuck", "stuck", "sticking"],
    "sting": ["stung", "stung", "stinging"],
    "stink": ["stank", "stunk", "stinking"],
    "stir": ["stirred", "stirred", "stirring"],
    "stock-take": ["stock-took", "stock-taken", "stock-taking"],
    "stop": ["stopped", "stopped", "stopping"],
    "strap": ["strapped", "strapped", "strapping"],
    "strew": ["strewed", "strewn", "strewing"],
    "stride": ["strod", "stridden", "striding"],
    "stride2": ["strode", "stridden", "striding"],
    "strike": ["struck", "struck", "striking"],
    "string": ["strung", "strung", "string"],
    "string2": ["strung", "strung", "stringing"],
    "strip": ["stripped", "stripped", "stripping"],
    "strive": ["strove", "striven", "striving"],
    "strop": ["stropped", "stropped", "stropping"],
    "strum": ["strummed", "strummed", "strumming"],
    "strut": ["strutted", "strutted", "strutting"],
    "stub": ["stubbed", "stubbed", "stubbing"],
    "stud": ["studded", "studded", "studding"],
    "stun": ["stunned", "stunned", "stunning"],
    "stymie": ["stymied", "stymied", "stymying"],
    "sub": ["subbed", "subbed", "subbing"],
    "sublet": ["sublet", "sublet", "subletting"],
    "submit": ["submitted", "submitted", "submitting"],
    "sum": ["summed", "summed", "summing"],
    "summit": ["summitted", "summitted", "summitting"],
    "sun": ["sunned", "sunned", "sunning"],
    "suntan": ["suntanned", "suntanned", "suntanning"],
    "sup": ["supped", "supped", "supping"],
    "swab": ["swabbed", "swabbed", "swabbing"],
    "swag": ["swagged", "swagged", "swagging"],
    "swan": ["swanned", "swanned", "swanning"],
    "swap": ["swapped", "swapped", "swapping"],
    "swat": ["swatted", "swatted", "swatting"],
    "swear": ["swore", "sworn", "swearing"],
    "sweep": ["swept", "swept", "sweeping"],
    "swell": ["swelled", "swelled", "swelling"],
    "swell2": ["swelled", "swollen", "swelling"],
    "swig": ["swigged", "swigged", "swigging"],
    "swim": ["swam", "swum", "swimming"],
    "swing": ["swung", "swung", "swinging"],
    "swing2": ["swung", "swung", "swinning"],
    "switch-hit": ["switch-hit", "switch-hit", "switch-hitting"],
    "swot": ["swotted", "swotted", "swotting"],
    "tag": ["tagged", "tagged", "tagging"],
    "tailor-make": ["tailor-made", "tailor-made", "tailor-making"],
    "take": ["took", "taken", "taking"],
    "tan": ["tanned", "tanned", "tanning"],
    "tap": ["tapped", "tapped", "tapping"],
    "tar": ["tarred", "tarred", "tarring"],
    "tarmac": ["tarmacked", "tarmacked", "tarmacing"],
    "tat": ["tatted", "tatted", "tatting"],
    "teabag": ["teabagged", "teabagged", "teabagging"],
    "teach": ["taught", "taught", "teaching"],
    "tear": ["tore", "torn", "tearing"],
    "tee": ["teed", "teed", "teeing"],
    "telecast": ["telecast", "telecast", "telecasting"],
    "tell": ["told", "told", "telling"],
    "thermostat": ["thermostatted", "thermostatted", "thermostatting"],
    "thin": ["thinned", "thinned", "thinning"],
    "think": ["thought", "thought", "thinking"],
    "thrive": ["thrived", "thrived", "thriving"],
    "throb": ["throbbed", "throbbed", "throbbing"],
    "throw": ["threw", "thrown", "throw"],
    "throw2": ["threw", "thrown", "throwing"],
    "thrum": ["thrummed", "thrummed", "thrumming"],
    "thrust": ["thrust", "thrust", "thrust"],
    "thrust2": ["thrust", "thrust", "thrusting"],
    "thud": ["thudded", "thudded", "thudding"],
    "tie-dye": ["tie-dyed", "tie-dyed", "tie-dyeing"],
    "tie": ["tied", "tied", "tying"],
    "tin": ["tinned", "tinned", "tinning"],
    "tinge": ["tinged", "tinged", "tingeing"],
    "tip": ["tipped", "tipped", "tipping"],
    "tippytoe": ["tippytoeed", "tippytoeed", "tippytoeing"],
    "tiptoe": ["tiptoeed", "tiptoeed", "tiptoeing"],
    "tittup": ["tittupped", "tittupped", "tittupping"],
    "toe": ["toed", "toed", "toeing"],
    "tog": ["togged", "togged", "togging"],
    "tongue-tie": ["tongue-tied", "tongue-tied", "tongue-tying"],
    "top": ["topped", "topped", "topping"],
    "tot": ["totted", "totted", "totting"],
    "traffic": ["trafficked", "trafficked", "trafficking"],
    "tram": ["trammed", "trammed", "tramming"],
    "trammel": ["trammelled", "trammelled", "trammelling"],
    "transfer": ["transferred", "transferred", "transferring"],
    "transmit": ["transmitted", "transmitted", "transmitting"],
    "trap": ["trapped", "trapped", "trapping"],
    "travel": ["travelled", "travelled", "travelling"],
    "tread": ["trod", "trodden", "treading"],
    "tree": ["treed", "treed", "treeing"],
    "trek": ["trekked", "trekked", "trekking"],
    "trepan": ["trepanned", "trepanned", "trepanning"],
    "trim": ["trimmed", "trimmed", "trimming"],
    "trip": ["tripped", "tripped", "tripping"],
    "trot": ["trotted", "trotted", "trotting"],
    "trouble-shoot": ["trouble-shot", "trouble-shot", "trouble-shooting"],
    "tug": ["tugged", "tugged", "tugging"],
    "tut-tut": ["tut-tutted", "tut-tutted", "tut-tutting"],
    "tut": ["tutted", "tutted", "tutting"],
    "twig": ["twigged", "twigged", "twigging"],
    "twin": ["twinned", "twinned", "twinning"],
    "twit": ["twitted", "twitted", "twitting"],
    "two-step": ["two-stepped", "two-stepped", "two-stepping"],
    "typecast": ["typecast", "typecast", "typecasting"],
    "typeset": ["typeset", "typeset", "typesetting"],
    "typewrite": ["typewrote", "typewritten", "typewriting"],
    "unbar": ["unbarred", "unbarred", "unbarring"],
    "unbend": ["unbent", "unbent", "unbending"],
    "unbind": ["unbound", "unbound", "unbinding"],
    "unclip": ["unclipped", "unclipped", "unclipping"],
    "unclothe": ["unclad", "unclad", "unclothing"],
    "underbid": ["underbid", "underbid", "underbidding"],
    "undercut": ["undercut", "undercut", "undercutting"],
    "undergird": ["undergirt", "undergirt", "undergirding"],
    "undergo": ["underwent", "undergone", "undergoing"],
    "underlay": ["underlaid", "underlaid", "underlaying"],
    "underlie": ["underlay", "underlain", "underlying"],
    "underpay": ["underpaid", "underpaid", "underpaying"],
    "underpin": ["underpinned", "underpinned", "underpinning"],
    "undersell": ["undersold", "undersold", "underselling"],
    "undershoot": ["undershot", "undershot", "undershooting"],
    "understand": ["understood", "understood", "understanding"],
    "undertake": ["undertook", "undertaken", "undertaking"],
    "underwrite": ["underwrote", "underwritten", "underwriting"],
    "undo": ["undid", "undone", "undoing"],
    "unfit": ["unfitted", "unfitted", "unfitting"],
    "unfreeze": ["unfroze", "unfrozen", "unfreezing"],
    "unknot": ["unknotted", "unknotted", "unknotting"],
    "unlearn": ["unlearnt", "unlearnt", "unlearning"],
    "unmake": ["unmade", "unmade", "unmaking"],
    "unman": ["unmanned", "unmanned", "unmanning"],
    "unpin": ["unpinned", "unpinned", "unpinning"],
    "unplug": ["unplugged", "unplugged", "unplugging"],
    "unsay": ["unsaid", "unsaid", "unsaying"],
    "unstring": ["unstrung", "unstrung", "unstringing"],
    "unteach": ["untaught", "untaught", "unteaching"],
    "untie": ["untied", "untied", "untying"],
    "unwind": ["unwound", "unwound", "unwinding"],
    "unwrap": ["unwrapped", "unwrapped", "unwrapping"],
    "unzip": ["unzipped", "unzipped", "unzipping"],
    "up": ["upped", "upped", "upping"],
    "upheave": ["uphove", "uphove", "upheaving"],
    "uphold": ["upheld", "upheld", "upholding"],
    "uprise": ["uprose", "uprisen", "uprising"],
    "upset": ["upset", "upset", "upseting"],
    "upset2": ["upset", "upset", "upsetting"],
    "vet": ["vetted", "vetted", "vetting"],
    "victual": ["victualled", "victualled", "victualling"],
    "vie": ["vied", "vied", "vying"],
    "vitriol": ["vitriolled", "vitriolled", "vitriolling"],
    "wad": ["wadded", "wadded", "wadding"],
    "wag": ["wagged", "wagged", "wagging"],
    "wake": ["woke", "woken", "waking"],
    "wan": ["wanned", "wanned", "wanning"],
    "war": ["warred", "warred", "warring"],
    "wave": ["waved", "waved", "waving"],
    "waylay": ["waylaid", "waylain", "waylaying"],
    "wear": ["wore", "worn", "wearing"],
    "weave": ["weaved", "weaved", "weaving"],
    "weave2": ["wove", "woven", "weaving"],
    "web": ["webbed", "webbed", "webbing"],
    "wed": ["wed", "wed", "wedding"],
    "wee-wee": ["wee-weed", "wee-weed", "wee-weeing"],
    "wee": ["weed", "weed", "weeing"],
    "weep": ["wept", "wept", "weeping"],
    "wet": ["wet", "wet", "wetting"],
    "wham": ["whammed", "whammed", "whamming"],
    "whet": ["whetted", "whetted", "whetting"],
    "whip": ["whipped", "whipped", "whipping"],
    "whipsaw": ["whipsawed", "whipsawn", "whipsawing"],
    "whir": ["whirred", "whirred", "whirring"],
    "whiz": ["whizzed", "whizzed", "whizzing"],
    "whop": ["whopped", "whopped", "whopping"],
    "win": ["won", "won", "winning"],
    "wind": ["wound", "wound", "winding"],
    "window-shop": ["window-shopped", "window-shopped", "window-shopping"],
    "wiretap": ["wiretapped", "wiretapped", "wiretapping"],
    "withdraw": ["withdrew", "withdrawn", "withdrawing"],
    "withhold": ["withheld", "withheld", "withholding"],
    "withstand": ["withstood", "withstood", "withstanding"],
    "worship": ["worshipped", "worshipped", "worshipping"],
    "wrap": ["wrapped", "wrapped", "wrapping"],
    "wring": ["wrung", "wrung", "wringing"],
    "write": ["wrote", "written", "writing"],
    "yap": ["yapped", "yapped", "yapping"],
    "yarn-dye": ["yarn-dyed", "yarn-dyed", "yarn-dyeing"],
    "yen": ["yenned", "yenned", "yenning"],
    "yip": ["yipped", "yipped", "yipping"],
    "yum": ["yummed", "yummed", "yumming"],
    "zap": ["zapped", "zapped", "zapping"],
    "zigzag": ["zigzagged", "zigzagged", "zigzagging"],
    "zip": ["zipped", "zipped", "zipping"]};
