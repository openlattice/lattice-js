/*
 * @flow
 */

import Axios from 'axios';
import Immutable from 'immutable';

import EnvToUrlMap from '../constants/EnvToUrlMap';

import {
  getConfig
} from '../config/Configuration';

import {
  DATA_API,
  EDM_API,
  ORGANIZATIONS_API,
  PERMISSIONS_API,
  USERS_API
} from '../constants/ApiNames';

import {
  ADMIN_PATH,
  DATA_PATH,
  DATASTORE_PATH,
  ONTOLOGY_PATH,
  ORGANIZATIONS_PATH,
  PERMISSIONS_PATH
} from '../constants/ApiPaths';

let baseUrlToAxiosInstanceMap :Map<string, Object> = Immutable.Map();

function getApiBaseUrl(api :string) :string {

  let baseUrl :string = getConfig().get('baseUrl');

  // currently, only localhost does not have /datastore in the path
  if (!EnvToUrlMap.get('LOCAL').includes(baseUrl)) {
    baseUrl = `${baseUrl}/${DATASTORE_PATH}`;
  }

  switch (api) {
    case DATA_API:
      return `${baseUrl}/${ONTOLOGY_PATH}/${DATA_PATH}`;
    case EDM_API:
      return `${baseUrl}/${ONTOLOGY_PATH}`;
    case ORGANIZATIONS_API:
      return `${baseUrl}/${ONTOLOGY_PATH}/${ORGANIZATIONS_PATH}`;
    case PERMISSIONS_API:
      return `${baseUrl}/${ONTOLOGY_PATH}/${PERMISSIONS_PATH}`;
    case USERS_API:
      return `${baseUrl}/${ONTOLOGY_PATH}/${ADMIN_PATH}`;
    default:
      return baseUrl;
  }
}

function newAxiosInstance(baseUrl :string) {

  const axiosInstance :Object = Axios.create({
    baseURL: baseUrl,
    headers: {
      common: {
        Authorization: getConfig().get('authToken'),
        'Content-Type': 'application/json'
      }
    }
  });

  const newMap = baseUrlToAxiosInstanceMap.set(baseUrl, axiosInstance);
  baseUrlToAxiosInstanceMap = newMap;
}

function getApiAxiosInstance(api :string) :Object {

  const baseUrl = getApiBaseUrl(api);

  if (!baseUrlToAxiosInstanceMap.has(baseUrl)) {
    newAxiosInstance(baseUrl);
  }

  const axiosInstance = baseUrlToAxiosInstanceMap.get(baseUrl);
  const axiosInstanceAuthToken = axiosInstance.defaults.headers.common.Authorization;
  if (axiosInstanceAuthToken !== getConfig().get('authToken')) {
    newAxiosInstance(baseUrl);
  }

  return baseUrlToAxiosInstanceMap.get(baseUrl);
}

export {
  getApiBaseUrl,
  getApiAxiosInstance
};
