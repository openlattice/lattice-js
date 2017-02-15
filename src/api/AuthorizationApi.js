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

import Logger from '../utils/Logger';

import AccessCheck from '../models/AccessCheck';

import {
  AUTHORIZATION_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray
} from '../utils/LangUtils';

import {
  isValidAccessCheckArray
} from '../utils/ValidationUtils';

const LOG = new Logger('AuthorizationApi');

/**
 * `POST /authorizations`
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

  let accessChecks = queries;
  if (isUndefined(queries) || isEmptyArray(queries)) {
    accessChecks = [];
  }
  else if (!isValidAccessCheckArray(queries)) {
    return Promise.reject('invalid parameter: queries must be an array of valid AccessChecks');
  }

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
