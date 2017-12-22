/*
 * @flow
 */

/**
 * @module Configuration
 * @memberof lattice
 */

import Immutable from 'immutable';

import EnvToUrlMap from '../constants/EnvToUrlMap';
import Logger from '../utils/Logger';

import {
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

declare var __PROD__ :boolean;

const LOG = new Logger('Configuration');

let configObj :Map<string, any> = Immutable.Map().withMutations((map :Map<string, any>) => {

  if (__PROD__) {
    map.set('baseUrl', EnvToUrlMap.get('PRODUCTION'));
  }
  else {
    map.set('baseUrl', EnvToUrlMap.get('LOCAL'));
  }
});

/**
 * baseUrl can be a full URL, or a simple URL identifier (substring). for example, all of the following strings will
 * result in the same base URL:
 *   - "https://api.openlattice.com"
 *   - "api.openlattice.com"
 *   - "openlattice"
 *   - "api"
 *
 * @memberof lattice.Configuration
 * @param {Object} config - an object literal containing all configuration options
 * @param {string} config.authToken - a Base64-encoded JWT auth token (optional)
 * @param {string} config.baseUrl - a full URL, or a simple URL identifier (required)
 */
function configure(config :Object) {

  if (!isNonEmptyObject(config)) {
    const errorMsg = 'invalid parameter - config must be a non-empty configuration object';
    LOG.error(errorMsg, config);
    throw new Error(errorMsg);
  }

  // authToken is optional, so null and undefined are allowed
  if (config.authToken === null || config.authToken === undefined) {
    configObj = configObj.delete('authToken');
  }
  else if (isNonEmptyString(config.authToken)) {
    configObj = configObj.set('authToken', `Bearer ${config.authToken}`);
  }
  else {
    const errorMsg = 'invalid parameter - authToken must be a non-empty string';
    LOG.error(errorMsg, config.authToken);
    throw new Error(errorMsg);
  }

  if (isNonEmptyString(config.baseUrl)) {
    if (config.baseUrl === 'production' || EnvToUrlMap.get('PRODUCTION', '').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('PRODUCTION'));
    }
    else if (config.baseUrl === 'localhost' || EnvToUrlMap.get('LOCAL', '').includes(config.baseUrl)) {
      configObj = configObj.set('baseUrl', EnvToUrlMap.get('LOCAL'));
    }
    // mild url validation to at least check the protocol and domain
    else if (config.baseUrl.startsWith('https://') && config.baseUrl.endsWith('openlattice.com')) {
      configObj = configObj.set('baseUrl', config.baseUrl);
    }
    else {
      const errorMsg = 'invalid parameter - baseUrl must be a valid URL';
      LOG.error(errorMsg, config.baseUrl);
      throw new Error(errorMsg);
    }
  }
  else {
    const errorMsg = 'invalid parameter - baseUrl must be a non-empty string';
    LOG.error(errorMsg, config.baseUrl);
    throw new Error(errorMsg);
  }
}

function getConfig() :Map<string, any> {

  return configObj;
}

export {
  configure,
  getConfig
};
