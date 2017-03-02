/*
 * @flow
 */

/**
 * AuthorizationApi ...
 *
 * @module AuthorizationApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.AuthorizationApi.check...
 *
 * @example
 * import { AuthorizationApi } from 'loom-data';
 * // AuthorizationApi.check...
 */

import isUndefined from 'lodash/isUndefined';

import PermissionTypes from '../constants/types/PermissionTypes';
import SecurableTypes from '../constants/types/SecurableTypes';
import Logger from '../utils/Logger';

import AccessCheck from '../models/AccessCheck';

import {
  AUTHORIZATION_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isDefined,
  isEmptyArray,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidAccessCheckArray
} from '../utils/ValidationUtils';

import type {
  Permission
} from '../constants/types/PermissionTypes';

import type {
  SecurableType
} from '../constants/types/SecurableTypes';

const LOG = new Logger('AuthorizationApi');

/**
 * `POST /authorizations`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.AuthorizationApi
 * @param {AccessCheck[]} queries
 * @returns {Promise}
 *
 * @example
 * AuthorizationApi.checkAuthorizations(
 *   {
 *     aclKey: ['4b08e1f9-4a00-4169-92ea-10e377070220'],
 *     permissions: ['READ']
 *   }
 * );
 */
export function checkAuthorizations(queries :AccessCheck[]) :Promise<> {

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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /authorizations`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.AuthorizationApi
 * @param {SecurableType} securableType
 * @param {Permission} permission
 * @param {string} pagingToken (optional)
 * @returns {Promise<AuthorizedObjectsSearchResult>}
 *
 * @example
 * AuthorizationApi.getAccessibleObjects(
 *   "EntityType",
 *   "READ",
 *   "{pagingToken}"
 * );
 */
export function getAccessibleObjects(
    securableType :SecurableType, permission :Permission, pagingToken :string) :Promise<> {

  let errorMsg :string;

  if (!isNonEmptyString(securableType) || !SecurableTypes[securableType]) {
    errorMsg = 'invalid parameter: securableType must be a valid SecurableType';
    LOG.error(errorMsg, securableType);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(permission) || !PermissionTypes[permission]) {
    errorMsg = 'invalid parameter: permission must be a valid Permission';
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
