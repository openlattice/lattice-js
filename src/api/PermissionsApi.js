/*
 * @flow
 */

/**
 * PermissionsApi gives access to OpenLattice's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module PermissionsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.PermissionsApi.get...
 *
 * @example
 * import { PermissionsApi } from 'lattice';
 * // PermissionsApi.get...
 */

import Logger from '../utils/Logger';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { BULK_PATH, EXPLAIN_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { AclData, isValidAclData } from '../models/AclData';
import { isNonEmptyArray } from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { AclObject } from '../models/Acl';
import type { UUID } from '../types';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /permissions`
 *
 * Gets the ACL for the given ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {UUID[]} aclKey
 * @returns {Promise<AclObject>}
 *
 * @example
 * PermissionsApi.getAcl(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
function getAcl(aclKey :UUID[]) :Promise<AclObject> {

  let errorMsg = '';

  if (!isNonEmptyArray(aclKey)) {
    errorMsg = 'invalid parameter: "aclKey" must be a non-empty array';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  if (!aclKey.every(isValidUUID)) {
    errorMsg = 'invalid parameter: "aclKey" must be an array of valid UUIDs';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post('/', aclKey)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /permissions/bulk`
 *
 * Gets the set of ACLs for the given ACL Keys, only if the user is the owner of all ACL Keys.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {UUID[][]} aclKeys
 * @returns {Promise<AclObject[]>}
 *
 * @example
 * PermissionsApi.getAcls([
 *   ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *   ["64f24067-7551-471d-9346-a649b54146f0", "3b330d38-e9ba-467b-8eb3-2f4498d6f72e"],
 * );
 */
function getAcls(aclKeys :UUID[][]) :Promise<AclObject[]> {

  let errorMsg = '';

  if (!isNonEmptyArray(aclKeys)) {
    errorMsg = 'invalid parameter: "aclKeys" must be a non-empty array';
    LOG.error(errorMsg, aclKeys);
    return Promise.reject(errorMsg);
  }

  const isValid = aclKeys.every((aclKey) => aclKey.every(isValidUUID));
  if (!isValid) {
    errorMsg = 'invalid parameter: "aclKeys" is not valid UUID[][]';
    LOG.error(errorMsg, aclKeys);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${BULK_PATH}`, aclKeys)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /permissions/explain`
 *
 * Retrieves the acl for a particular aclKey, with an explanation of where the permissions come from.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {UUID[]} aclKey
 * @returns {Promise<Object>}
 *
 * @example
 * PermissionsApi.getAclExplanation(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
function getAclExplanation(aclKey :UUID[]) :Promise<Object> {

  let errorMsg = '';

  if (!isNonEmptyArray(aclKey)) {
    errorMsg = 'invalid parameter: "aclKey" must be a non-empty array';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  if (!aclKey.every(isValidUUID)) {
    errorMsg = 'invalid parameter: "aclKey" must be an array of valid UUIDs';
    LOG.error(errorMsg, aclKey);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${EXPLAIN_PATH}`, aclKey)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /permissions`
 *
 * Updates the Ace for a particular ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {AclData} aclData
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * PermissionsApi.updateAcls(
 *   {
 *     "action": "ADD",
 *     "acl": {
 *       "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *       "aces": [
 *         {
 *           "principal": {
 *             "type": "USER",
 *             "id": "userId"
 *           },
 *           "permissions": ["READ"]
 *         }
 *       ]
 *     }
 *   }
 * );
 */
function updateAcl(aclData :AclData) :Promise<void> {

  let errorMsg = '';

  if (!isValidAclData(aclData)) {
    errorMsg = 'invalid parameter: aclData must be a valid AclData object';
    LOG.error(errorMsg, aclData);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch('/', aclData)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /permissions/update`
 *
 * Updates the Ace for a set of ACL Keys, only if the user is the owner of the ACL Keys.
 *
 * @static
 * @memberof lattice.PermissionsApi
 * @param {AclData[]} aclData
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * PermissionsApi.updateAcls(
 *   [{
 *     "action": "ADD",
 *     "acl": {
 *       "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *       "aces": [
 *         {
 *           "principal": {
 *             "type": "USER",
 *             "id": "userId"
 *           },
 *           "permissions": ["READ"]
 *         }
 *       ]
 *     }
 *   }]
 * );
 */
function updateAcls(aclData :AclData[]) :Promise<void> {

  let errorMsg = '';

  if (!isNonEmptyArray(aclData)) {
    errorMsg = 'invalid parameter: aclData must be a non-empty array';
    LOG.error(errorMsg, aclData);
    return Promise.reject(errorMsg);
  }

  if (!aclData.every(isValidAclData)) {
    errorMsg = 'invalid parameter: aclData must be an array of valid AclData objects';
    LOG.error(errorMsg, aclData);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch(`/${UPDATE_PATH}`, aclData)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getAcl,
  getAclExplanation,
  getAcls,
  updateAcl,
  updateAcls,
};
