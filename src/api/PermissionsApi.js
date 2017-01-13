/*
 * @flow
 */

/**
 * PermissionsApi gives access to Loom's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module PermissionsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.PermissionsApi.get...
 *
 * @example
 * import { PermissionsApi } from 'loom-data';
 * // PermissionsApi.get...
 */

import AclKeyFragment from '../models/AclKeyFragment';
import Logger from '../utils/Logger';

import AclData, {
  isValid as isValidAclData
} from '../models/AclData';

import {
  PERMISSIONS_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isValidAclKey
} from '../utils/ValidationUtils';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /permissions`
 *
 * Gets the ACL for the given ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {AclKeyFragment[]} aclKey
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.getAcl(
 *   [
 *     {}
 *   ]
 * );
 */
export function getAcl(aclKey :AclKeyFragment[]) :Promise<> {

  if (!isValidAclKey(aclKey)) {
    return Promise.reject('invalid parameter: aclKey must be a non-empty array of valid AclKeyFragments');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post('/', aclKey)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PATCH /permissions`
 *
 * Updates the Ace for a particular ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {AclData} aclData
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.updateAcl(
 *   {}
 * );
 */
export function updateAcl(aclData :AclData) :Promise<> {

  if (!isValidAclData(aclData)) {
    return Promise.reject('invalid parameter: aclData must be a valid AclData object');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch('/', aclData)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
