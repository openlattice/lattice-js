/*
 * @flow
 */

import PACKAGE from '../package.json';

import {
  ifProd
} from './env.js';

/*
 *
 * constants
 *
 */

const BANNER = `
${PACKAGE.name} - v${PACKAGE.version}
${PACKAGE.description}
${PACKAGE.homepage}

Copyright (c) 2014-2016, Kryptnostic, Inc. All rights reserved.
`;

const ENTRY_FILE_NAME = 'index.js';
const LIB_FILE_NAME = 'loom-api';
const LIB_NAMESPACE = 'Loom';

/*
 *
 * REST API endpoints
 *
 */

const BASE_URL = ifProd(
  'http://test.loom.digital',
  'http://localhost:8080'
);

const DATASTORE_URL = ifProd(
  `${BASE_URL}/datastore`,
  BASE_URL
);

const API_ENDPOINTS = {
  DATA: `${DATASTORE_URL}/ontology/data`,
  EDM: `${DATASTORE_URL}/ontology`
};

export default {
  API_ENDPOINTS,
  BANNER,
  ENTRY_FILE_NAME,
  LIB_FILE_NAME,
  LIB_NAMESPACE
};
