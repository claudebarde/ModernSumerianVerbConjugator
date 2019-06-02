const conjugator = require("./sumerian-conjugator");

console.log("to go =>");
console.log(
  conjugator({
    stem: "ĝen",
    aspect: "perfective",
    transitive: false,
    subject: "firstSingular",
    directObject: "",
    obliqueObject: "",
    dimensionalPrefix: [{ prefix: "", initialPersonPrefix: "" }],
    indirectObject: "",
    ventive: false,
    preformative: "i",
    proclitic: ""
  })
);

console.log("to cross =>");
console.log(
  conjugator({
    stem: "bala",
    aspect: "perfective",
    transitive: false,
    subject: "firstSingular",
    directObject: "",
    obliqueObject: "",
    dimensionalPrefix: [{ prefix: "", initialPersonPrefix: "" }],
    indirectObject: "",
    ventive: true,
    preformative: "i",
    proclitic: ""
  })
);

console.log("to give =>");
console.log(
  conjugator({
    stem: "shum",
    aspect: "imperfective",
    transitive: true,
    subject: "firstSingular",
    directObject: "thirdPluralInanimate",
    obliqueObject: "",
    dimensionalPrefix: [
      { prefix: "with", initialPersonPrefix: "thirdPluralInanimate" }
    ],
    indirectObject: "secondSingular",
    ventive: true,
    preformative: "i",
    proclitic: ""
  })
);

console.log("to pay =>");
console.log(
  conjugator({
    stem: "la",
    aspect: "imperfective",
    transitive: true,
    subject: "firstSingular",
    directObject: "thirdSingularInanimate",
    obliqueObject: "thirdSingularInanimate",
    dimensionalPrefix: [{ prefix: "", initialPersonPrefix: "" }],
    indirectObject: "secondSingular",
    ventive: true,
    preformative: "i",
    proclitic: ""
  })
);
