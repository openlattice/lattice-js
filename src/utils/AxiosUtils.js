/*
 * @flow
 */

import axios from 'axios';
import Immutable from 'immutable';

import type { Axios } from 'axios';

import { getConfig } from '../config/Configuration';
import { isNonEmptyString } from '../utils/LangUtils';

import {
  ANALYSIS_API,
  APP_API,
  AUTHORIZATION_API,
  DATA_API,
  DATA_SOURCES_API,
  EDM_API,
  LINKING_API,
  ORGANIZATIONS_API,
  PERMISSIONS_API,
  PRINCIPALS_API,
  REQUESTS_API,
  SEARCH_API,
  SYNC_API
} from '../constants/ApiNames';

import {
  ANALYSIS_PATH,
  APP_PATH,
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
  SEARCH_PATH,
  SYNC_PATH
} from '../constants/ApiPaths';

let baseUrlToAxiosInstanceMap :Map<string, Axios> = Immutable.Map();

function getApiBaseUrl(api :string) :string {

  const baseUrl :string = getConfig().get('baseUrl', '');

  switch (api) {
    case ANALYSIS_API:
      return `${baseUrl}/${DATASTORE_PATH}/${ANALYSIS_PATH}`;
    case APP_API:
      return `${baseUrl}/${DATASTORE_PATH}/${APP_PATH}`;
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
    case SYNC_API:
      return `${baseUrl}/${DATASTORE_PATH}/${SYNC_PATH}`;
    default:
      throw new Error(`unknown API: no case implemented to handle the given API: ${api}`);
  }
}

function newAxiosInstance(baseUrl :string) :void {

  const axiosConfigObj :Object = {
    baseURL: baseUrl,
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  };

  const authToken :string = getConfig().get('authToken', '');
  if (isNonEmptyString(authToken)) {
    axiosConfigObj.headers.common.Authorization = `Bearer ${authToken}`;
  }

  const axiosInstance :Axios = axios.create(axiosConfigObj);
  const newMap = baseUrlToAxiosInstanceMap.set(baseUrl, axiosInstance);
  baseUrlToAxiosInstanceMap = newMap;
}

function getApiAxiosInstance(api :string) :Axios {

  const baseUrl = getApiBaseUrl(api);

  if (!baseUrlToAxiosInstanceMap.has(baseUrl)) {
    newAxiosInstance(baseUrl);
  }

  // type casting to "any" to avoid Flow errors for now
  const axiosInstance :any = baseUrlToAxiosInstanceMap.get(baseUrl);
  const axiosInstanceAuthToken :string = axiosInstance.defaults.headers.common.Authorization;
  const configAuthToken :string = getConfig().get('authToken', '');
  if (axiosInstanceAuthToken !== `Bearer ${configAuthToken}`) {
    newAxiosInstance(baseUrl);
  }

  // type casting to "any" to avoid Flow errors for now
  return (baseUrlToAxiosInstanceMap.get(baseUrl) :any);
}

export {
  getApiBaseUrl,
  getApiAxiosInstance
};
