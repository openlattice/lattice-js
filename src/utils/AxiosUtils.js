/*
 * @flow
 */

import Axios from 'axios';
import Immutable from 'immutable';

import {
  getConfig
} from '../config/Configuration';

let baseUrlToAxiosInstanceMap :Map<string, Object> = Immutable.Map();

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

function getAxiosInstance(baseUrl :string) :Object {

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
  getAxiosInstance,
  newAxiosInstance
};
