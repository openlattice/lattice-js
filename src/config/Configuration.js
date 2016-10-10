/*
 * @flow
 */

import Immutable from 'immutable';

import Logger from '../utils/Logger';

import {
  isNonEmptyString
} from '../utils/LangUtils';

declare var __DEV__ :boolean;
declare var __PROD__ :boolean;

const LOG = new Logger('Configuration');

export const BACKEND_URLS :Map<string, string> = Immutable.Map({
  DEV: 'http://localhost:8080',
  STG: 'http://test.loom.digital',
  PROD: 'http://api.loom.digital'
});

let baseUrl :string = BACKEND_URLS.get('DEV');
if (__PROD__) {
  baseUrl = BACKEND_URLS.get('PROD');
}

export function getBaseUrl() :string {

  return baseUrl;
}

type ConfigurationObject = {
  baseUrl :string
};

export function configure(config :ConfigurationObject) {

  if (isNonEmptyString(config.baseUrl)) {

    if (BACKEND_URLS.get('PROD').includes(config.baseUrl)) {
      baseUrl = BACKEND_URLS.get('PROD');
    }
    else if (BACKEND_URLS.get('STG').includes(config.baseUrl)) {
      baseUrl = BACKEND_URLS.get('STG');
    }
    else if (BACKEND_URLS.get('DEV').includes(config.baseUrl)) {
      baseUrl = BACKEND_URLS.get('DEV');
    }
  }
  else {
    LOG.warn('invalid configuration option: "baseUrl" must be a non-empty string');
  }
}
