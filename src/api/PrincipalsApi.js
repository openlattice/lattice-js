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

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty string');
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

  if (!isNonEmptyString(role)) {
    return Promise.reject('invalid parameter: userId must be a non-empty UUID string');
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

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty string');
  }

  if (!isNonEmptyString(role)) {
    return Promise.reject('invalid parameter: role must be a non-empty string');
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

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty string');
  }

  let userRoles = roles;
  if (isUndefined(roles) || isEmptyArray(roles)) {
    userRoles = [];
  }
  else if (!isNonEmptyStringArray(roles)) {
    return Promise.reject('invalid parameter: roles must be an array of strings');
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

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty string');
  }

  if (!isNonEmptyString(role)) {
    return Promise.reject('invalid parameter: role must be a non-empty string');
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
