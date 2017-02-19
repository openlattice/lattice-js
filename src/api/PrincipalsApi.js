/*
 * @flow
 */

/**
 * PrincipalsApi gives access to Loom's REST API for getting user data.
 *
 * @module PrincipalsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.PrincipalsApi.get...
 *
 * @example
 * import { PrincipalsApi } from 'loom-data';
 * // PrincipalsApi.get...
 */

import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';

import {
  PRINCIPALS_API
} from '../constants/ApiNames';

import {
  ROLES_PATH,
  USERS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /principals/users/{userId}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
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
 * @memberof loom-data.PrincipalsApi
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
 * `GET /principals/roles/{role}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @return {Promise}
 */
export function getAllUsersForRole(role :string) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyString(role)) {
    errorMsg = 'invalid parameter: role must be a non-empty string';
    LOG.error(errorMsg, role);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}/${role}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/roles`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @return {Promise}
 */
export function getAllUsersForAllRoles() :Promise<> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /principals/users/{userId}/roles/{role}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} userId
 * @param {string} role
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function addRoleToUser(userId :string, role :string) :Promise<> {

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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /principals/users/{userId}/roles`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} userId
 * @param {string[]} roles
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function setUserRoles(userId :string, roles :string[]) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyString(userId)) {
    errorMsg = 'invalid parameter: userId must be a non-empty string';
    LOG.error(errorMsg, userId);
    return Promise.reject(errorMsg);
  }

  let userRoles = roles;
  if (isUndefined(roles) || isEmptyArray(roles)) {
    userRoles = [];
  }
  else if (!isNonEmptyStringArray(roles)) {
    errorMsg = 'invalid parameter: roles must be an array of strings';
    LOG.error(errorMsg, roles);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .put(`/${USERS_PATH}/${userId}/${ROLES_PATH}`, userRoles)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /principals/users/{userId}/roles/{role}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} userId
 * @param {string} role
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function removeRoleFromUser(userId :string, role :string) :Promise<> {

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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/users/search/{searchQuery}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} searchQuery
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function searchAllUsers(searchQuery :string) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyString(searchQuery)) {
    errorMsg = 'invalid parameter: searchQuery must be a non-empty string';
    LOG.error(errorMsg, searchQuery);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/search/${searchQuery}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
