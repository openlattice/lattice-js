/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

import Immutable from 'immutable';

const ENVIRONMENT_URLS :Immutable.Map<string, string> = Immutable.Map({
  LOCAL: 'http://localhost:8080',
  PROD: 'https://api.loom.digital'
});

export default ENVIRONMENT_URLS;
