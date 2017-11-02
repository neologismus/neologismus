const getNGramm = require('./get-n-gramm')

module.exports = tokens => tokens.reduce((acc, word, index, orig) => {
  const curr = getNGramm(word)

  if (!curr) {
    return acc
  }

  return Object.assign(acc, { [curr]: (acc[curr] || 0) + (1 / orig.length) })
}, {})
