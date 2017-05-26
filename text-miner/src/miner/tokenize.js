const XRegExp = require('xregexp');

const WORD = '\\pL0-9\\-';

module.exports = text => text
  .toLowerCase()
  .replace(new XRegExp(`[^${WORD}\\s]`, 'ig'), ' ')
  .replace(/\s+/g, ' ')
  .split(' ')
  .filter(Boolean);
