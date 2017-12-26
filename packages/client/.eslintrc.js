'use strict'

module.exports = {
  rules: {
    'react/jsx-filename-extension': 'off',
    'object-curly-spacing': ['error', 'never'],
    'object-curly-newline': ['error', {multiline: true}],
    // временно
    'react/prop-types': 'off',

    'no-underscore-dangle': ['error', {allow: ['_id']}],

    'function-paren-newline': 'off',
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  overrides: [
    {
      files: ['configs/**/*.js'],
      rules: {
        'global-require': 'off',
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
      },
    },
  ],
}
