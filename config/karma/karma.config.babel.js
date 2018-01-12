/* eslint-disable import/extensions */

import getBaseKarmaConfig from './karma.config.base.js';
import { isTest } from '../env.js';

const FILE_MATCHERS = {

  // match all test files: *.test.js
  ALL_TESTS: './test/**/*.?(iso)test.js',

  // match all test files included in the webpack testing context that will run in a single bundle
  TEST_SUITE: './test/TestSuite.js'
};

export default function karmaConfig(theKarmaConfigObject) {

  const baseKarmaConfig = getBaseKarmaConfig(theKarmaConfigObject);

  // TODO: this is always true since package.json sets "BUILD": "test" for every test script
  if (isTest) {

    baseKarmaConfig.files.push(
      { pattern: FILE_MATCHERS.TEST_SUITE, included: true, watched: false }
    );

    baseKarmaConfig.preprocessors[FILE_MATCHERS.TEST_SUITE] = ['webpack'];
  }
  else {

    baseKarmaConfig.files.push(
      { pattern: FILE_MATCHERS.ALL_TESTS, included: true, watched: false }
    );

    baseKarmaConfig.preprocessors[FILE_MATCHERS.ALL_TESTS] = ['webpack'];
  }

  theKarmaConfigObject.set(baseKarmaConfig);
}
