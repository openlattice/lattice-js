/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

import Immutable from 'immutable';

const ENVIRONMENT_URLS :Map<string, string> = Immutable.Map({
  LOCAL: 'http://localhost:8080',
  PROD: 'https://api.openlattice.com'
});

export default ENVIRONMENT_URLS;
