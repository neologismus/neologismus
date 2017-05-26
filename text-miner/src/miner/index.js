const stats = require('simple-statistics');


const {
  local: getLocalTextGrade,
} = require('./get-text-grade');


const getRelevantPars = (pars, text = pars) => {
  const MIN_SENTENCE_LEN = 4;

  const textCleared = text.filter(val => !!val && val.split(' ').length > MIN_SENTENCE_LEN);

  const grades = getLocalTextGrade(textCleared);

  const [, maxCluster] = stats.ckmeans(Object.values(grades.filter(val => val > 0)), 2);

  const bestTextIds = Object
    .entries(grades)
    .filter(([, grade]) => maxCluster.indexOf(grade) !== -1)
    .map(([textId]) => textId);

  return bestTextIds.map(textId => textCleared[textId]);
};

const getSimilarPars = (pars) => {
  const MIN_GRADE_RATIO = 0.4;

  const grades = getLocalTextGrade(pars);

  const maxGrade = Math.max(...grades);

  const bestTextIds = Object
    .entries(grades)
    .filter(([, grade]) => grade / maxGrade > MIN_GRADE_RATIO)
    .map(([textId]) => textId);

  return bestTextIds.map(textId => pars[textId]);
};


module.exports = ({ text }) => getSimilarPars(getRelevantPars(text));
