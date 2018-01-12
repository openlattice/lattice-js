const PACKAGE = require('../../package.json');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/index.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/flow-typed/'
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __ENV_DEV__: true,
    __ENV_PROD__: false,
    __ENV_TEST__: true,
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..'
};
