/*
 * @flow
 */

/**
 * PrincipalsApi gives access to OpenLattice's REST API for getting user data.
 *
 * @module PrincipalsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.PrincipalsApi.get...
 *
 * @example
 * import { PrincipalsApi } from 'lattice';
 * // PrincipalsApi.get...
 */

import Logger from '../utils/Logger';

import {
  PRINCIPALS_API
} from '../constants/ApiNames';

import {
  EMAIL_PATH,
  SEARCH_PATH,
  USERS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString
} from '../utils/LangUtils';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /principals/users/{userId}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} userId
 * @return {Promise}
 */
export function getUser(userId :string) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyString(userId)) {
    errorMsg = 'invalid parameter: userId must be a non-empty string';
    LOG.error(errorMsg, userId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${userId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/users`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @return {Promise}
 */
export function getAllUsers() :Promise<> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/users/search/email/{searchQuery}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} searchQuery
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function searchAllUsersByEmail(searchQuery :string) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyString(searchQuery)) {
    errorMsg = 'invalid parameter: searchQuery must be a non-empty string';
    LOG.error(errorMsg, searchQuery);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${searchQuery}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
