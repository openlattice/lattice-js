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
import {
  CREDENTIAL_PATH,
  CURRENT_PATH,
  DB_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  SYNC_PATH,
  USERS_PATH,
} from '../constants/UrlConstants';
import { Principal, isValidPrincipal } from '../models/Principal';
import { isNonEmptyArray, isNonEmptyObject, isNonEmptyString } from '../utils/LangUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('PrincipalsApi');

/**
 * `GET /principals/roles`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @returns {Promise<Map<AclKey, Role>>} - a Promise that will resolve with a map of roles
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
 * @returns {Promise<Map<String, Auth0UserBasic>>} - a Promise that will resolve with a map of users
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
 * `GET /principals/db`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @returns {Promise<Object>} - a Promise that will resolve with an object containing the username and credential
 *
 * @example
 * PrincipalsApi.getAtlasCredentials();
 */
function getAtlasCredentials() {

  return getApiAxiosInstance(PRINCIPALS_API)
    .get(`/${DB_PATH}`)
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
 * @returns {Promise<Set<SecurablePrincipal>>} - a Promise that will resolve with a set of role SecurablePrincipals
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
 * @returns {Promise<SecurablePrincipal>} - a Promise that will resolve with the SecurablePrincipal
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
 * @returns {Promise}
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
 * `POST /principals/users`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {Array<string>} userIds
 * @returns {Promise}
 *
 * @example
 * PrincipalsApi.getUsers(["auth0|openlattice", "google-oauth2|abc123"]);
 */
function getUsers(userIds :string[]) :Promise<Object> {

  let errorMsg = '';

  if (!isNonEmptyArray(userIds)) {
    errorMsg = 'invalid parameter: "userIds" must be a non-empty array';
    LOG.error(errorMsg, userIds);
    return Promise.reject(errorMsg);
  }

  if (!userIds.every(isNonEmptyString)) {
    errorMsg = 'invalid parameter: "userIds" must be an array of strings';
    LOG.error(errorMsg, userIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .post(`/${USERS_PATH}`, userIds)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
* `POST /principals/db/credential`
*
* @static
* @memberof lattice.PrincipalsApi
* @returns {Promise} - a Promise that resolves without a value
*
* @example
* PrincipalsApi.regenerateCredential();
*/
function regenerateCredential() :Promise<void> {

  return getApiAxiosInstance(PRINCIPALS_API)
    .post(`/${DB_PATH}/${CREDENTIAL_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /principals/users/search`
 *
 * @static
 * @memberof lattice.PrincipalsApi
 * @param {Object} fields
 * @returns {Promise<Map<String, User>>} - a Promise that will resolve with a map of matching users
 *
 * @example
 * PrincipalsApi.searchUsers({ email: "*@openlattice.com" });
 */
function searchUsers(fields :{ email ?:string, name ?:string }) :Promise<Object> {

  let errorMsg = '';

  if (!isNonEmptyObject(fields)) {
    errorMsg = 'invalid parameter: "fields" must be a non-empty object';
    LOG.error(errorMsg, fields);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PRINCIPALS_API)
    .post(`/${USERS_PATH}/${SEARCH_PATH}`, fields)
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
 * @returns {Promise} - a Promise that resolves without a value
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
  getAtlasCredentials,
  getCurrentRoles,
  getSecurablePrincipal,
  getUser,
  getUsers,
  regenerateCredential,
  searchUsers,
  syncUser,
};
