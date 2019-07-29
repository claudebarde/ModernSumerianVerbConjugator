# Sumerian Verb Conjugator

Sumerian Verb Conjugator is an online-based conjugator for verbs in Sumerian. Verbs in Sumerian can be quite complex to conjugate and this conjugator makes the task as easy as clicking on buttons! You don't need to remember vowels agreement or various prefixes, the conjugator remembers for you.

## Installation

Use the package manager [npm](https://www.nmpsjs.com) to install the conjugator.

```bash
npm install sumerian-conjugator
```

## Usage

```javascript
import conjugator from "sumerian-conjugator";

// the stem, the aspect, the transitivity and the subject are mandatory
// set the unused arguments to undefined
const verb = conjugator({
  verbID, // the verb ID from the default verbs file
  stem,
  aspect,
  transitive,
  subject,
  directObject,
  obliqueObject,
  dimensionalPrefix,
  indirectObject,
  ventive,
  middleMarker,
  preformative,
  proclitic,
  reduplicated,
  defaultVerbs
});
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author

- **Claude Barde**

## Acknowledgments

The grammatical rules followed by the Sumerian conjugator are mostly based on _A Descriptive Grammar of Sumerian_ by Abraham Hendrik Jagersma.

## License

[MIT](https://choosealicense.com/licenses/mit/)
