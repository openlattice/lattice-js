/*
 * @flow
 */

import Immutable from 'immutable';

import getApiBaseUrl from './getApiBaseUrl';
import newAxiosInstance from './newAxiosInstance';
import { getConfig } from '../../config/Configuration';
import { isNonEmptyString } from '../LangUtils';

let baseUrlToAxiosInstanceMap :Map<string, Axios> = Immutable.Map();

export default function getApiAxiosInstance(api :string) :Axios {

  let axiosInstance;
  const baseUrl = getApiBaseUrl(api);
  if (!baseUrlToAxiosInstanceMap.has(baseUrl)) {
    axiosInstance = newAxiosInstance(baseUrl);
    baseUrlToAxiosInstanceMap = baseUrlToAxiosInstanceMap.set(baseUrl, axiosInstance);
  }

  axiosInstance = baseUrlToAxiosInstanceMap.get(baseUrl);
  const axiosInstanceAuthHeader :string = axiosInstance.defaults.headers.common.Authorization;
  const configAuthToken :string = getConfig().get('authToken', '');

  // the Axios instance Authorization header must equal "Bearer {auth_token}", where "auth_token" must equal the
  // configured auth token. if that's not the case, we need a new Axios instance because the configured auth token
  // has changed.
  if (
    axiosInstanceAuthHeader !== `Bearer ${configAuthToken}`
    && (isNonEmptyString(configAuthToken) || isNonEmptyString(axiosInstanceAuthHeader))
  ) {
    axiosInstance = newAxiosInstance(baseUrl);
    baseUrlToAxiosInstanceMap = baseUrlToAxiosInstanceMap.set(baseUrl, axiosInstance);
  }

  // type casting to "any" to avoid Flow errors for now
  return (baseUrlToAxiosInstanceMap.get(baseUrl) :any);
}
