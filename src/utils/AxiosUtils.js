/*
 * @flow
 */

import Axios from 'axios';
import Immutable from 'immutable';

let baseUrlToAxiosInstanceMap :Map<string, Object> = Immutable.Map();

function newAxiosInstance(baseUrl :string) {

  const axiosInstance :Object = Axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const newMap = baseUrlToAxiosInstanceMap.set(baseUrl, axiosInstance);
  baseUrlToAxiosInstanceMap = newMap;
}

function getAxiosInstance(baseUrl :string) :Object {

  if (!baseUrlToAxiosInstanceMap.has(baseUrl)) {
    newAxiosInstance(baseUrl);
  }

  return baseUrlToAxiosInstanceMap.get(baseUrl);
}

export {
  getAxiosInstance,
  newAxiosInstance
};
