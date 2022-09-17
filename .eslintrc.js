// https://eslint.org/docs/user-guide/configuring

const error = 2
const warn = 1
const off = 0

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  // required to lint *.vue files
  // add your custom rules here
  rules: {
    // semi: 'off', // 分号
    // quotes: 'off',
    // allow async-await
    // 'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? warn : off,
    'comma-dangle': [warn, 'always-multiline'],
    'no-extra-semi': error,
    // 'one-var': 'off',
    // 'no-constant-condition ': 'off',
    // 'space-before-function-paren': 'off',
    // 'no-useless-constructor': 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? warn : off,
    // 'padded-blocks': 'off',
    // 'no-trailing-spaces': 'off',
    'no-new': warn,
    'no-duplicate-imports': error,
  },
}
