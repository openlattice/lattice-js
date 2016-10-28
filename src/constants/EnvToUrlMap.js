/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

import Immutable from 'immutable';

const ENVIRONMENT_URLS :Map<string, string> = Immutable.Map({
  LOCAL: 'http://localhost:8080',
  DEV: 'http://dev.loom.digital',
  STG: 'http://staging.loom.digital',
  PROD: 'http://api.loom.digital'
});

export default ENVIRONMENT_URLS;
