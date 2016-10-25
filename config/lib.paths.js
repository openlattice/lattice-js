/*
 * @flow
 */

/* eslint-disable import/extensions */

import path from 'path';

import LIB_CONFIG from './lib.config.js';

const ROOT :string = path.resolve(__dirname, '..');

const BUILD :string = path.resolve(ROOT, 'build');
const NODE :string = path.resolve(ROOT, 'node_modules');
const SOURCE :string = path.resolve(ROOT, 'src');
const TEST :string = path.resolve(ROOT, 'test');

const ENTRY = path.resolve(SOURCE, LIB_CONFIG.ENTRY_FILE_NAME);

export default {
  BUILD,
  ENTRY,
  NODE,
  SOURCE,
  TEST
};
