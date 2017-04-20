/*
 * @flow
 */

import Axios from 'axios';
import Immutable from 'immutable';

import {
  getConfig
} from '../config/Configuration';

import {
  ANALYSIS_API,
  AUTHORIZATION_API,
  DATA_API,
  DATA_SOURCES_API,
  EDM_API,
  LINKING_API,
  ORGANIZATIONS_API,
  PERMISSIONS_API,
  PRINCIPALS_API,
  REQUESTS_API,
  SEARCH_API
} from '../constants/ApiNames';

import {
  ANALYSIS_PATH,
  AUTHORIZATIONS_PATH,
  DATA_PATH,
  DATASTORE_PATH,
  DATA_SOURCES_PATH,
  EDM_PATH,
  LINKING_PATH,
  ORGANIZATIONS_PATH,
  PERMISSIONS_PATH,
  PRINCIPALS_PATH,
  REQUESTS_PATH,
  SEARCH_PATH
} from '../constants/ApiPaths';

let baseUrlToAxiosInstanceMap :Map<string, Object> = Immutable.Map();

function getApiBaseUrl(api :string) :string {

  const baseUrl :string = getConfig().get('baseUrl');

  switch (api) {
    case ANALYSIS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${ANALYSIS_PATH}`;
    case AUTHORIZATION_API:
      return `${baseUrl}/${DATASTORE_PATH}/${AUTHORIZATIONS_PATH}`;
    case DATA_API:
      return `${baseUrl}/${DATASTORE_PATH}/${DATA_PATH}`;
    case DATA_SOURCES_API:
      return `${baseUrl}/${DATASTORE_PATH}/${DATA_SOURCES_PATH}`;
    case EDM_API:
      return `${baseUrl}/${DATASTORE_PATH}/${EDM_PATH}`;
    case LINKING_API:
      return `${baseUrl}/${DATASTORE_PATH}/${LINKING_PATH}`;
    case ORGANIZATIONS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${ORGANIZATIONS_PATH}`;
    case PERMISSIONS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${PERMISSIONS_PATH}`;
    case PRINCIPALS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${PRINCIPALS_PATH}`;
    case REQUESTS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${REQUESTS_PATH}`;
    case SEARCH_API:
      return `${baseUrl}/${DATASTORE_PATH}/${SEARCH_PATH}`;
    default:
      throw new Error(`unknown API: no case implemented to handle the given API: ${api}`);
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
