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
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /permissions`
 *
 * Gets the ACL for the given ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {UUID[]} aclKey
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.getAcl(
 *   [
 *     { type: 'EntityType', id: 'ec6865e6-e60e-424b-a071-6a9c1603d735' }
 *   ]
 * );
 */
export function getAcl(aclKey :UUID[]) :Promise<> {

  if (!isValidUuidArray(aclKey)) {
    return Promise.reject('invalid parameter: aclKey must be a non-empty array of valid UUIDs');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post('/', aclKey)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @memberof loom-data.PermissionsApi
 * @param {AclData} aclData
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.updateAcl(
 *   {
 *     action: 'ADD',
 *     acl: {
 *       aclKey: [
 *         'ec6865e6-e60e-424b-a071-6a9c1603d735'
 *       ],
 *       aces: [
 *         {
 *           principal: {
 *             type: 'USER',
 *             id: 'principalId'
 *           },
 *           permissions: [
 *             'READ'
 *           ]
 *         }
 *       ]
 *     }
 *   }
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
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
