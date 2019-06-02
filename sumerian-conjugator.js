// imports personal prefixes and suffixes
const {
  personalSuffixes1,
  personalSuffixes2,
  personalPrefixes
} = require("./personalPrefixesAndSuffixes/personalPrefixesAndSuffixes");
// imports oblique object prefixes
const {
  obliqueObjectPrefixes
} = require("./personalPrefixesAndSuffixes/obliqueObjectPrefixes");
// imports dimensional prefixes and initial person-prefixes
const {
  dimensionalPrefixes,
  initialPersonPrefixes
} = require("./dimensionalPrefixes/dimensionalPrefixes");

const {
  indirectObjectPrefixes
} = require("./personalPrefixesAndSuffixes/indirectObjectPrefixes");

const VOWELS = ["a", "e", "i", "u"];

// checks if vowel of suffix will contract
const willSuffixVowelContract = (stem, suffix) => {
  if (VOWELS.includes(stem[stem.length - 1]) && suffix[0] === "e") return true;

  return false;
};

module.exports = ({
  stem,
  aspect,
  transitive,
  subject,
  directObject,
  obliqueObject,
  dimensionalPrefix,
  initialPersonPrefix,
  indirectObject,
  ventive,
  preformative,
  proclitic
}) => {
  // initializes empty results
  let conjugatedVerb = "";
  let rawAffixes = [];
  let affixes = [];
  let notes = [];
  // builds verb
  // TRANSITIVITY
  if (transitive !== true) {
    if (!willSuffixVowelContract(stem, personalSuffixes2[subject])) {
      // if last letter is consonant
      conjugatedVerb = stem + personalSuffixes2[subject];
      // saves affixes
      rawAffixes.push([
        "intransitive suffix subject",
        personalSuffixes2[subject]
      ]);
      affixes.push(["intransitive suffix subject", personalSuffixes2[subject]]);
    } else {
      // if last letter is vowel
      // if suffix starts with "e"
      if (personalSuffixes2[subject][0] === "e") {
        const personalSuffix = personalSuffixes2[subject].slice(1);
        conjugatedVerb = stem + personalSuffix;
        // saves affixes
        rawAffixes.push([
          "intransitive suffix subject",
          personalSuffixes2[subject]
        ]);
        affixes.push(["intransitive suffix subject", personalSuffix]);
        notes.push(
          `${personalSuffixes2[subject]} becomes ${personalSuffix} after vowel.`
        );
      }
    }
  } else {
    // if verb is transitive
    if (aspect === "perfective") {
      // adds prefixes and suffixes
      // if verb ends in a vowel
      let personalPrefix = "";
      let personalSuffix = "";
      if (willSuffixVowelContract(stem, personalSuffixes2[directObject])) {
        personalPrefix = personalPrefixes[subject];
        personalSuffix = personalSuffixes2[directObject].slice(1);
        notes.push(
          `${personalSuffixes2[directObject]} becomes ${personalSuffixes2[
            directObject
          ].slice(1)} after vowel.`
        );
      } else {
        // if verb ends in a consonant
        personalSuffix = personalSuffixes2[directObject];
      }
      conjugatedVerb = personalPrefix + stem + personalSuffix;
      // saves affixes
      rawAffixes.push(
        ["transitive subject prefix", personalPrefix],
        ["transitive direct object suffix", personalSuffixes2[directObject]]
      );
      affixes.push(
        ["transitive subject prefix", personalPrefix],
        ["transitive direct object suffix", personalSuffix]
      );
    } else if (aspect === "imperfective") {
      // adds prefixes and suffixes
      // if verb ends in a vowel
      let personalPrefix = personalPrefixes[directObject];
      let personalSuffix = "";
      if (willSuffixVowelContract(stem, personalSuffixes1[subject])) {
        personalSuffix = personalSuffixes1[subject].slice(1);
        notes.push(
          `${personalSuffixes1[subject]} becomes ${personalSuffixes1[
            subject
          ].slice(1)} after vowel.`
        );
      } else {
        personalSuffix = personalSuffixes1[subject];
      }
      let directObjectPrefix = personalPrefixes[directObject];
      // prefix "e" assimilates with previous vowel
      if (directObject === "secondSingular") {
        let prefix = "";
        if (obliqueObject.length > 0) {
          // in case of oblique object
          prefix = obliqueObjectPrefixes[obliqueObject];
          if (prefix[prefix.length - 1] === "e") {
            directObjectPrefix = "";
          } else {
            directObjectPrefix = prefix[prefix.length - 1];
          }
          notes.push(
            `Personal prefix "e" contracts with preceding vowel and lengthens it.`
          );
        } else if (dimensionalPrefix.length > 0) {
          // in case of dimensional prefix
        } else if (indirectObject.length > 0) {
          // in case of indirect object prefix
        } else if (ventive) {
          // in case of ventive prefix
        } else if (preformative.length > 0) {
          // in case of preformative suffix
          directObjectPrefix = preformative;
          notes.push(
            `Personal prefix "e" contracts with preceding vowel and lengthens it.`
          );
        } else if (proclitic.length > 0) {
          // in case of preformative suffix
        }
      }

      conjugatedVerb = directObjectPrefix + stem + personalSuffix;
      // saves affixes
      rawAffixes.push(
        ["transitive direct object prefix", personalPrefixes[directObject]],
        ["transitive subject suffix", personalSuffixes2[subject]]
      );
      affixes.push(
        ["transitive direct object prefix", personalPrefix],
        ["transitive subject suffix", personalSuffix]
      );
    }
  }

  /*
        OBLIQUE OBJECT PREFIXES
  */
  if (obliqueObject.length > 0) {
    let obliqueObjectPrefix = obliqueObjectPrefixes[obliqueObject];
    // bi assimilates with venitive to "mmi"
    if (
      obliqueObject === "thirdSingularInanimate" &&
      ventive &&
      !dimensionalPrefix[0].prefix &&
      !dimensionalPrefix[0].initialPersonPrefix &&
      !indirectObject
    ) {
      obliqueObjectPrefix = "mi";
    }
    // "bi" does not appear with dimensional prefixes and "ba"
    if (
      obliqueObject === "thirdSingularInanimate" &&
      dimensionalPrefix[0].prefix.length > 0
    ) {
      notes.push(
        `Oblique object "bi" does not appear with dimensional prefixes.`
      );
    }
    // "bi", "ri", "nni" are never found with the indirect-object prefixes
    // and the prefixes "da", "ta", "shi", "e", and "ni"
    if (
      obliqueObject === "secondSingular" ||
      obliqueObject === "thirdSingularAnimate" ||
      obliqueObject === "thirdSingularInanimate"
    ) {
      if (
        dimensionalPrefix[0].prefix &&
        dimensionalPrefixes.hasOwnProperty(dimensionalPrefix[0].prefix)
      ) {
        notes.push(
          `"bi" / "ri" / "nni" are never found with the prefixes "da", "ta", "shi", "e", and "ni".`
        );
      }

      if (indirectObject.length > 0) {
        notes.push(
          `"bi" / "ri" / "nni" are never found with the indirect-object prefixes.`
        );
      }
    }
    // "bi" does not appear with "ba"
    if (
      obliqueObject === "thirdSingularInanimate" &&
      indirectObject === "thirdSingularInanimate"
    ) {
      notes.push(
        `Oblique object "bi" does not appear with indirect object prefix "ba".`
      );
    }

    conjugatedVerb = obliqueObjectPrefix + conjugatedVerb;
    rawAffixes.push([
      "oblique object prefix",
      obliqueObjectPrefixes[obliqueObject]
    ]);
    affixes.push(["oblique object prefix", obliqueObjectPrefix]);
  }

  /*
        DIMENSIONAL PREFIXES
  */
  if (
    dimensionalPrefix.length > 0 &&
    dimensionalPrefix[0].hasOwnProperty("prefix") &&
    dimensionalPrefix[0]["prefix"].length > 0 &&
    dimensionalPrefix[0].hasOwnProperty("initialPersonPrefix") &&
    dimensionalPrefix[0]["initialPersonPrefix"].length > 0
  ) {
    dimensionalPrefix.map(({ prefix, initialPersonPrefix }) => {
      let ipprefix = initialPersonPrefixes[initialPersonPrefix];
      if (initialPersonPrefix === "secondSingular") {
        // prefix "e" assimilates with previous vowel
        if (indirectObject.length > 0) {
          // in case of indirect object prefix
        } else if (ventive) {
          // in case of ventive prefix
        } else if (preformative.length > 0) {
          // in case of preformative suffix
          ipprefix = preformative;
          notes.push(
            `Initial personal prefix "e" contracts with preceding vowel and lengthens it.`
          );
        } else if (proclitic.length > 0) {
          // in case of preformative suffix
        }
      }
      conjugatedVerb = ipprefix + dimensionalPrefixes[prefix] + conjugatedVerb;
      // saves affixes
      rawAffixes.push(
        ["dimensional prefix", dimensionalPrefixes[prefix]],
        ["initial person prefix", initialPersonPrefixes[initialPersonPrefix]]
      );
      affixes.push(
        ["dimensional prefix", dimensionalPrefixes[prefix]],
        ["initial person prefix", ipprefix]
      );
    });
  }

  /*
        INDIRECT OBJECT PREFIXES
  */
  if (indirectObject.length > 0) {
    let indirectObjectPrefix = indirectObjectPrefixes[indirectObject];
    console.log(indirectObject);
    // "ba" assimilates with ventive to "mma"
    if (indirectObject === "thirdSingularInanimate" && ventive) {
      indirectObjectPrefix = "ma";
    }

    conjugatedVerb = indirectObjectPrefix + conjugatedVerb;
    rawAffixes.push([
      "indirect object prefix",
      indirectObjectPrefixes[indirectObject]
    ]);
    affixes.push(["indirect object prefix", indirectObjectPrefix]);
  }

  /*
        VENTIVE
  */
  if (ventive) {
    let ventivePrefix = "mu";
    // if verb starts with /CV/ but not "ra", "ri" or "ni"
    if (
      !VOWELS.includes(conjugatedVerb[0]) &&
      VOWELS.includes(conjugatedVerb[1]) &&
      indirectObject !== "secondSingular" &&
      indirectObject !== "secondPlural" &&
      indirectObject !== "thirdPersonInanimate" &&
      dimensionalPrefix[0].prefix !== "in" &&
      obliqueObject !== "secondSingular"
    ) {
      ventivePrefix = "m";
      notes.push(`Ventive prefix contracts to "m" before /CV/ cluster.`);
    } else if (
      obliqueObject === "thirdSingularInanimate" &&
      !dimensionalPrefix[0].prefix &&
      !dimensionalPrefix[0].initialPersonPrefix &&
      !indirectObject
    ) {
      // "bi" assimilates with ventive to "mmi"
      ventivePrefix = "m";
    } else if (indirectObject === "thirdPersonInanimate") {
      // "ba" assimilates with ventive to "mma"
      ventivePrefix = "m";
    }
    conjugatedVerb = ventivePrefix + conjugatedVerb;
    rawAffixes.push(["ventive", "mu"]);
    affixes.push(["ventive", ventivePrefix]);
  }

  /*
        PREFORMATIVES
  */
  if (preformative.length === 0 && !ventive) {
    notes.push(
      "Sumerian verbs must include a preformative prefix or the ventive prefix."
    );
  } else if (preformative.length > 0 && !ventive) {
    // preformative but no ventive
    if (
      transitive === false &&
      !directObject &&
      !obliqueObject &&
      !dimensionalPrefix[0].prefix &&
      !dimensionalPrefix[0].initialPersonPrefix &&
      !indirectObject
    ) {
      // if there is no other prefix between the preformative and the stem
      if (preformative === "i") {
        conjugatedVerb = "i" + conjugatedVerb;
        // saves affixes
        rawAffixes.push({ preformative: "i" });
        affixes.push({ preformative: "i" });
      } else if (preformative === "a") {
        conjugatedVerb = "al" + conjugatedVerb;
        notes.push(`Preformative "a" becomes "al" just before the verb stem.`);
        // saves affixes
        rawAffixes.push({ preformative: "a" });
        affixes.push({ preformative: "al" });
      } else if (preformative === "u") {
        conjugatedVerb = "ul" + conjugatedVerb;
        notes.push(`Preformative "u" becomes "ul" just before the verb stem.`);
        // saves affixes
        rawAffixes.push({ preformative: "u" });
        affixes.push({ preformative: "ul" });
      }
    } else {
      if (preformative === "i") {
        // i is never found before CV
        if (
          !VOWELS.includes(conjugatedVerb[0]) &&
          VOWELS.includes(conjugatedVerb[1])
        ) {
          notes.push(
            `"i" is never found before a prefix that consists of a consonant and a vowel.`
          );
        } else {
          conjugatedVerb = "i" + conjugatedVerb;
        }
        // saves affixes
        rawAffixes.push({ preformative: "i" });
        affixes.push({ preformative: "i" });
      } else if (preformative === "a") {
        // a is never found before CV
        if (
          !VOWELS.includes(conjugatedVerb[0]) &&
          VOWELS.includes(conjugatedVerb[1])
        ) {
          notes.push(
            `"a" is never found before a prefix that consists of a consonant and a vowel.`
          );
        } else {
          conjugatedVerb = "a" + conjugatedVerb;
        }
        // saves affixes
        rawAffixes.push({ preformative: "a" });
        affixes.push({ preformative: "a" });
      } else if (preformative === "u") {
        if (aspect !== perfective) {
          notes.push(`"u" only appears in perfective forms.`);
        } else {
          conjugatedVerb = "u" + conjugatedVerb;
        }
        // saves affixes
        rawAffixes.push({ preformative: "u" });
        affixes.push({ preformative: "u" });
      }
    }
  } else if (preformative.length === 0 && ventive) {
    // no preformative but ventive
  } else if (preformative.length > 0 && ventive) {
    // preformative and ventive
    const ventiveForm = affixes.find(item => item[0] === "ventive");
    if (
      ventiveForm &&
      ventiveForm[1] === "mu" &&
      (preformative === "a" || preformative === "i")
    ) {
      preformative = "";
      notes.push(`Preformatives "i" and "a" do not appear before "mu".`);
    } else if (ventiveForm && ventiveForm[1] === "m") {
      // the loss of "u" lengthens the preceding vowel
      preformative = preformative + preformative;
      notes.push(
        `The loss of "u" in the ventive lengthens the preceding vowel.`
      );
    }
    conjugatedVerb = preformative + conjugatedVerb;
  }

  return { conjugatedVerb, rawAffixes, affixes, notes };
};
