module.exports = (word, len = 5) => {
  const res = word.substr(0, len).toLowerCase();

  return res.length < len ? null : res;
};
