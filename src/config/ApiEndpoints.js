/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

import Config from './Configuration';
import EnvToUrlMap from '../constants/EnvToUrlMap';

import {
  DATA_API,
  EDM_API
} from '../constants/ApiNames';

const DATA_PATH :string = 'data';
const ONTOLOGY_PATH :string = 'ontology';

function getDataStoreUrl() :string {

  const baseUrl :string = Config.getConfig().get('baseUrl');

  if (EnvToUrlMap.get('LOCAL').includes(baseUrl)) {
    return baseUrl;
  }

  return `${baseUrl}/datastore`;
}

function getApiBaseUrl(api :string) :string {

  switch (api) {
    case DATA_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}/${DATA_PATH}`;
    case EDM_API:
      return `${getDataStoreUrl()}/${ONTOLOGY_PATH}`;
    default:
      return Config.getConfig().get('baseUrl');
  }
}

export {
  getApiBaseUrl
};
