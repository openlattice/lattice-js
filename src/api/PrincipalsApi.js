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
import { PRINCIPALS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isNonEmptyString } from '../utils/LangUtils';

import {
  EMAIL_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  USERS_PATH
} from '../constants/ApiPaths';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /principals/users/{userId}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} userId
 * @return {Promise}
 */
export function getUser(userId :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(userId)) {
    errorMsg = 'invalid parameter: userId must be a non-empty string';
    LOG.error(errorMsg, userId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${userId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/roles`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @return {Promise}
 */
export function getAllRoles() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}`)
    .then(axiosResponse => axiosResponse.data)
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
export function getAllUsers() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}`)
    .then(axiosResponse => axiosResponse.data)
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
export function searchAllUsersByEmail(searchQuery :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(searchQuery)) {
    errorMsg = 'invalid parameter: searchQuery must be a non-empty string';
    LOG.error(errorMsg, searchQuery);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${searchQuery}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * EVERYTHING BELOW IS DEPRECATED!!! ONLY DELETE AFTER REMOVING REFERENCES FROM GALLERY!!!
 *
 */

export function addRoleToUser(userId :string, role :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(userId)) {
    errorMsg = 'invalid parameter: userId must be a non-empty string';
    LOG.error(errorMsg, userId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(role)) {
    errorMsg = 'invalid parameter: role must be a non-empty string';
    LOG.error(errorMsg, role);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .put(`/${USERS_PATH}/${userId}/${ROLES_PATH}/${role}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export function removeRoleFromUser(userId :string, role :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(userId)) {
    errorMsg = 'invalid parameter: userId must be a non-empty string';
    LOG.error(errorMsg, userId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(role)) {
    errorMsg = 'invalid parameter: role must be a non-empty string';
    LOG.error(errorMsg, role);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .delete(`/${USERS_PATH}/${userId}/${ROLES_PATH}/${role}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
