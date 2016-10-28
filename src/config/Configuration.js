/*
 * @flow
 */

/**
 * @module Configuration
 * @memberof loom-data
 */

import Immutable from 'immutable';

import {
  isEmpty
} from 'lodash';

import EnvToUrlMap from '../constants/EnvToUrlMap';
import Logger from '../utils/Logger';

import {
  isNonEmptyString
} from '../utils/LangUtils';

declare var __PROD__ :boolean;

const LOG = new Logger('Configuration');

let configObj :Map<string, any> = Immutable.Map().withMutations((map :Map<string, any>) => {

  if (__PROD__) {
    map.set('baseUrl', EnvToUrlMap.get('PROD'));
  }
  else {
    map.set('baseUrl', EnvToUrlMap.get('LOCAL'));
  }
});

type ConfigurationObject = {
  authToken :string,
  baseUrl :string
};

/**
 * @memberof loom-data.Configuration
 * @param {Object} config
 * @param {String} config.authToken - a Base64-encoded JWT auth token
 * @param {String} config.baseUrl - (optional) a full URL, or a simple URL identifier, defaults to http://api.loom.digital
 *
 * @example
 * // baseUrl can be a full URL, or a simple URL identifier (substring)
 * {
 *   baseUrl: "http://api.loom.digital" || "api.loom.digital" || "loom.digital" || "api"
 * }
 */
function configure(config :ConfigurationObject) {

  if (isEmpty(config)) {
    const errorMsg = 'invalid parameter - config must be a non-empty object';
    LOG.error(errorMsg, config);
    throw new Error(errorMsg);
  }

  if (isNonEmptyString(config.authToken)) {
    configObj = configObj.set('authToken', config.authToken);
  }
  else {
    const errorMsg = 'invalid parameter - authToken must be a non-empty string';
    LOG.error(errorMsg, config.authToken);
    throw new Error(errorMsg);
  }

  if (isNonEmptyString(config.baseUrl)) {
    if (EnvToUrlMap.get('PROD').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('PROD'));
    }
    else if (EnvToUrlMap.get('STG').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('STG'));
    }
    else if (EnvToUrlMap.get('DEV').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('DEV'));
    }
    else if (EnvToUrlMap.get('LOCAL').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('LOCAL'));
    }
  }
}

function getConfig() :Map<string, any> {

  return configObj;
}

export {
  configure,
  getConfig
};
