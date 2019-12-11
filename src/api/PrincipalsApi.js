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

import Principal, { isValidPrincipal } from '../models/Principal';
import Logger from '../utils/Logger';
import { PRINCIPALS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isNonEmptyString } from '../utils/LangUtils';


import {
  DB_PATH,
  EMAIL_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  USERS_PATH,
  CURRENT_PATH
} from '../constants/UrlConstants';

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
    .then((axiosResponse) => axiosResponse.data)
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
    .then((axiosResponse) => axiosResponse.data)
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
export function getCurrentRoles() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}/${CURRENT_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
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
    .then((axiosResponse) => axiosResponse.data)
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
 * @param {string} emailSearchQuery
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function searchAllUsersByEmail(emailSearchQuery :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(emailSearchQuery)) {
    errorMsg = 'invalid parameter: emailSearchQuery must be a non-empty string';
    LOG.error(errorMsg, emailSearchQuery);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${SEARCH_PATH}/${EMAIL_PATH}/${emailSearchQuery}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/users/search/{searchQuery}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} searchQuery
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function searchAllUsers(searchQuery :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(searchQuery)) {
    errorMsg = 'invalid parameter: searchQuery must be a non-empty string';
    LOG.error(errorMsg, searchQuery);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}/${SEARCH_PATH}/${searchQuery}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /principals`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {Principal} principal
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function getSecurablePrincipal(principal :Principal) :Promise<*> {

  let errorMsg = '';

  if (!isValidPrincipal(principal)) {
    errorMsg = 'invalid parameter: principal must be a valid Principal';
    LOG.error(errorMsg, principal);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .post('/', principal)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /principals/db`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @return {Promise}
 *
 * TODO: add unit tests
 */
export function getDbAccessCredential() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${DB_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
