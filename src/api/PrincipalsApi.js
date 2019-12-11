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
import Principal, { isValidPrincipal } from '../models/Principal';
import { PRINCIPALS_API } from '../constants/ApiNames';
import {
  CURRENT_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  SYNC_PATH,
  USERS_PATH,
} from '../constants/UrlConstants';
import { isNonEmptyString } from '../utils/LangUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /principals/roles`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @return {Promise<Map<AclKey, Role>>} - a Promise that will resolve with a map of roles
 *
 * @example
 * PrincipalsApi.getAllRoles();
 */
function getAllRoles() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}`)
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
 * @return {Promise<Map<String, Auth0UserBasic>>} - a Promise that will resolve with a map of users
 *
 * @example
 * PrincipalsApi.getAllUsers();
 */
function getAllUsers() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${USERS_PATH}`)
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
 * @return {Promise<Set<SecurablePrincipal>>} - a Promise that will resolve with a set of role SecurablePrincipals
 *
 * @example
 * PrincipalsApi.getCurrentRoles();
 */
function getCurrentRoles() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${ROLES_PATH}/${CURRENT_PATH}`)
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
 * @return {Promise<SecurablePrincipal>} - a Promise that will resolve with the SecurablePrincipal
 *
 * @example
 * PrincipalsApi.getSecurablePrincipal({
 *   "id": "auth0|openlattice",
 *   "type": "USER"
 * });
 */
function getSecurablePrincipal(principal :Principal) :Promise<*> {

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
 * `GET /principals/users/{userId}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} userId
 * @return {Promise}
 *
 * @example
 * PrincipalsApi.getUser("auth0|openlattice");
 */
function getUser(userId :string) :Promise<*> {

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
 * `GET /principals/users/search/{searchQuery}`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {string} searchQuery
 * @return {Promise<Map<String, Auth0UserBasic>>} - a Promise that will resolve with a map of matching users
 *
 * @example
 * PrincipalsApi.searchAllUsers("openlattice");
 */
function searchAllUsers(searchQuery :string) :Promise<*> {

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
 * `GET /principals/sync`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * PrincipalsApi.syncUser();
 */
function syncUser() :Promise<*> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${SYNC_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getAllRoles,
  getAllUsers,
  getCurrentRoles,
  getSecurablePrincipal,
  getUser,
  searchAllUsers,
  syncUser,
};
