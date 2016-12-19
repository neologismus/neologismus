const tokenize = require('./tokenize');
const getFreq = require('./get-freq');
const getNGramm = require('./get-n-gramm');

module.exports = {
  abs: (textArr, model = textArr) => {
    const modelTokenized = tokenize(model.join(''));

    const freq = getFreq(modelTokenized);

    return textArr.map(text =>
      [...new Set(tokenize(text))].reduce((acc, word, index, orig) => {
        const curr = getNGramm(word);

        if (!curr) {
          return acc;
        }

        return acc + ((freq[curr] || 0) / Math.sqrt(orig.length));
      }, 0));
  },

  local: (textArr, model = textArr) => {
    const modelTokenized = tokenize(model.join(''));
    const tokensCount = modelTokenized.length;

    const freq = getFreq(modelTokenized);

    return textArr.map(text =>
      tokenize(text).reduce((acc, word) => {
        const curr = getNGramm(word);

        if (!curr) {
          return acc;
        }

        return acc + ((freq[curr] || 0) - ((` ${text} `.toLowerCase().split(curr).length - 1) / tokensCount));
      }, 0));
  },
};
