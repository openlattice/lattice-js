/*
 * @flow
 */

/**
 * AuthorizationApi ...
 *
 * @module AuthorizationApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.AuthorizationApi.check...
 *
 * @example
 * import { AuthorizationApi } from 'lattice';
 * // AuthorizationApi.check...
 */

import isUndefined from 'lodash/isUndefined';

import AccessCheck, { isValidAccessCheckArray } from '../models/AccessCheck';
import PermissionTypes from '../constants/types/PermissionTypes';
import SecurableTypes from '../constants/types/SecurableTypes';
import Logger from '../utils/Logger';
import { AUTHORIZATION_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isDefined, isEmptyArray, isNonEmptyString } from '../utils/LangUtils';

import type { PermissionType } from '../constants/types/PermissionTypes';
import type { SecurableType } from '../constants/types/SecurableTypes';

const LOG = new Logger('AuthorizationApi');

/**
 * `POST /authorizations`
 *
 * Gets the Authorizations for the given AccessChecks.
 *
 * @static
 * @memberof lattice.AuthorizationApi
 * @param {AccessCheck[]} queries
 * @returns {Promise<Authorization[]>} - a Promise that will resolve with the Authorizations as its fulfillment value
 *
 * @example
 * AuthorizationApi.checkAuthorizations(
 *   [
 *     {
 *       "aclKey": ["4b08e1f9-4a00-4169-92ea-10e377070220"],
 *       "permissions": ["READ"]
 *     }
 *   ]
 * );
 */
export function checkAuthorizations(queries :AccessCheck[]) :Promise<*> {

  let errorMsg = '';

  let accessChecks = queries;
  if (isUndefined(queries) || isEmptyArray(queries)) {
    accessChecks = [];
  }
  else if (!isValidAccessCheckArray(queries)) {
    errorMsg = 'invalid parameter: queries must be an array of valid AccessChecks';
    LOG.error(errorMsg, queries);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set() with tests

  return getApiAxiosInstance(AUTHORIZATION_API)
    .post('/', accessChecks)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /authorizations`
 *
 * Gets all authorized objects of the given SecurableType with the given PermissionType.
 *
 * @static
 * @memberof lattice.AuthorizationApi
 * @param {SecurableType} securableType
 * @param {PermissionType} permission
 * @param {string} pagingToken (optional)
 * @returns {Promise<AuthorizedObjectsSearchResult>} - a Promise that will resolve with the authorized objects and a
 * paging token as its fulfillment value
 *
 * @example
 * AuthorizationApi.getAccessibleObjects(
 *   "EntityType",
 *   "READ",
 *   "{pagingToken}"
 * );
 */
export function getAccessibleObjects(
  securableType :SecurableType,
  permission :PermissionType,
  pagingToken :string
) :Promise<*> {

  let errorMsg :string = '';

  if (!isNonEmptyString(securableType) || !SecurableTypes[securableType]) {
    errorMsg = 'invalid parameter: securableType must be a valid SecurableType';
    LOG.error(errorMsg, securableType);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(permission) || !PermissionTypes[permission]) {
    errorMsg = 'invalid parameter: permission must be a valid PermissionType';
    LOG.error(errorMsg, permission);
    return Promise.reject(errorMsg);
  }

  if (isDefined(pagingToken) && !isNonEmptyString(pagingToken)) {
    errorMsg = 'invalid parameter: when given, pagingToken must be a non-empty string';
    LOG.error(errorMsg, pagingToken);
    return Promise.reject(errorMsg);
  }

  let url = `/?objectType=${securableType}&permission=${permission}`;
  if (isDefined(pagingToken)) {
    url = `${url}&pagingToken=${pagingToken}`;
  }

  return getApiAxiosInstance(AUTHORIZATION_API)
    .get(url)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
