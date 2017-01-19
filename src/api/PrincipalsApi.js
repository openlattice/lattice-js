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

import Logger from '../utils/Logger';

import {
  PRINCIPALS_API
} from '../constants/ApiNames';

import {
  RESET_PATH,
  ROLES_PATH,
  USERS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyArray,
  isNonEmptyString
} from '../utils/LangUtils';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /users/{userId}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} userId - user UUID
 * @return {Promise}
 */
export function getUser(userId :string) :Promise<> {

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty UUID string');
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${userId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /users`
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
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /roles/{role}`
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
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /roles`
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
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PATCH /roles/reset/{userId}`
 *
 * @static
 * @memberof loom-data.PrincipalsApi
 * @param {string} userId - user UUID
 * @param {string[]} roles - a list of roles to be reset
 * @return {Promise}
 */
export function resetUserRoles(userId :string, roles :string[]) :Promise<> {

  if (!isNonEmptyString(userId)) {
    return Promise.reject('invalid parameter: userId must be a non-empty UUID string');
  }

  if (!isNonEmptyArray(roles)) {
    return Promise.reject('invalid parameter: roles must be a non-empty array of strings');
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .patch(`/${ROLES_PATH}/${RESET_PATH}/${userId}`, roles)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
