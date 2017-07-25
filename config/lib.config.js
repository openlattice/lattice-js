/*
 * @flow
 */

import PACKAGE from '../package.json';

const BANNER = `
${PACKAGE.name} - v${PACKAGE.version}
${PACKAGE.description}
${PACKAGE.homepage}

Copyright (c) 2014-2016, OpenLattice, Inc. All rights reserved.
`;

const ENTRY_FILE_NAME = 'index.js';
const LIB_FILE_NAME = 'lattice';
const LIB_NAMESPACE = 'Lattice';

export default {
  BANNER,
  ENTRY_FILE_NAME,
  LIB_FILE_NAME,
  LIB_NAMESPACE
};
