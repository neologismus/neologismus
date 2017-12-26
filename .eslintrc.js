'use strict'

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    semi: ['error', 'never'],
    'no-console': 0,
    'global-require': 0,
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'no-template-curly-in-string': 0,
    'no-void': 0,
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'no-cond-assign': ['error', 'except-parens'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'import/no-dynamic-require': 0,
    'import/extensions': 0,
    'jsx-a11y/href-no-hash': 0,
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
}
