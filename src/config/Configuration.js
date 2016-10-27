/*
 * @flow
 */

import Immutable from 'immutable';

import EnvToUrlMap from '../constants/EnvToUrlMap';

import {
  isNonEmptyString
} from '../utils/LangUtils';

declare var __PROD__ :boolean;

type ConfigurationObject = {
  baseUrl :string
};

let configObj :Map<string, any> = Immutable.Map().withMutations((map :Map<string, any>) => {

  if (__PROD__) {
    map.set('baseUrl', EnvToUrlMap.get('PROD'));
  }
  else {
    map.set('baseUrl', EnvToUrlMap.get('LOCAL'));
  }
});

function configure(config :ConfigurationObject) {

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
