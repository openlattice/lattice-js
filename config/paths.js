/*
 * @flow
 */

import path from 'path';

const ROOT :string = path.resolve(__dirname, '..');

const ABSOLUTE_PATHS = {
  ROOT,
  BUILD: path.resolve(ROOT, 'build'),
  NODE_MODULES: path.resolve(ROOT, 'node_modules'),
  SOURCE: path.resolve(ROOT, 'src'),
  TEST: path.resolve(ROOT, 'test')
};

const RELATIVE_PATHS = {
  BUILD: 'build'
};

const ENTRY = path.resolve(ABSOLUTE_PATHS.SOURCE, 'index.js');

export {
  ENTRY,
  ABSOLUTE_PATHS as ABS,
  RELATIVE_PATHS as REL
};
