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

import Logger from '../utils/Logger';
import { AUTHORIZATION_API } from '../constants/ApiNames';
import { AccessCheck, isValidAccessCheck } from '../models/AccessCheck';
import { isNonEmptyArray } from '../utils/LangUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('AuthorizationApi');

/**
 * `POST /authorizations`
 *
 * Gets the Authorizations for the given AccessChecks.
 *
 * @static
 * @memberof lattice.AuthorizationApi
 * @param {AccessCheck[]} queries
 * @returns {Promise<Authorization[]>} - a Promise that resolves with the Authorizations
 *
 * @example
 * AuthorizationApi.getAuthorizations(
 *   [
 *     {
 *       "aclKey": ["4b08e1f9-4a00-4169-92ea-10e377070220"],
 *       "permissions": ["READ"]
 *     }
 *   ]
 * );
 */
function getAuthorizations(checks :AccessCheck[]) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyArray(checks)) {
    errorMsg = 'invalid parameter: "checks" must be a non-empty array';
    LOG.error(errorMsg, checks);
    return Promise.reject(errorMsg);
  }

  if (!checks.every(isValidAccessCheck)) {
    errorMsg = 'invalid parameter: "checks" must be an array of valid AccessCheck objects';
    LOG.error(errorMsg, checks);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(AUTHORIZATION_API)
    .post('/', checks)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getAuthorizations,
};
