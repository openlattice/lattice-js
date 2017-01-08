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

import {
  PERMISSIONS_API
} from '../constants/ApiNames';

import {
  PERMISSIONS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyArray,
  isNonEmptyObject
} from '../utils/LangUtils';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /permissions`
 *
 * Gets the ACL for the given ACL Key, only if the user is the owner of the ACL Key.
 *
 * @static
 * @memberof loom-data.PermissionsApi
 * @param {Object[]} aclKeys
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.getAcl(
 *   [
 *     {}
 *   ]
 * );
 */
export function getAcl(aclKeys :Object[]) :Promise<> {

  if (!isNonEmptyArray(aclKeys)) {
    return Promise.reject('invalid parameter: aclKeys must be a non-empty array');
  }

  // TODO: validate aclKeys

  const allValid = aclKeys.reduce((isValid, key) => {
    return isValid && isNonEmptyObject(key);
  }, true);

  if (!allValid) {
    return Promise.reject('invalid parameter: aclKeys must be an array of valid object literals');
  }

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${PERMISSIONS_PATH}`, aclKeys)
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
 * @param {Object[]} aclKeys
 * @returns {Promise}
 *
 * @example
 * PermissionsApi.updateAcl(
 *   {}
 * );
 */
export function updateAcl(aclData :Object) :Promise<> {

  if (!isNonEmptyObject(aclData)) {
    return Promise.reject('invalid parameter: aclData must be a non-empty object literal');
  }

  // TODO: validate aclData

  return getApiAxiosInstance(PERMISSIONS_API)
    .patch(`/${PERMISSIONS_PATH}`, aclData)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
