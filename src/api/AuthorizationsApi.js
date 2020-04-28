/*
 * @flow
 */

/**
 * AuthorizationsApi ...
 *
 * @module AuthorizationsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.AuthorizationsApi.check...
 *
 * @example
 * import { AuthorizationsApi } from 'lattice';
 * // AuthorizationsApi.check...
 */

import Logger from '../utils/Logger';
import { AUTHORIZATIONS_API } from '../constants/ApiNames';
import { AccessCheck, isValidAccessCheck } from '../models/AccessCheck';
import { isNonEmptyArray } from '../utils/LangUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('AuthorizationsApi');

/**
 * `POST /authorizations`
 *
 * Gets the Authorizations for the given AccessChecks.
 *
 * @static
 * @memberof lattice.AuthorizationsApi
 * @param {AccessCheck[]} queries
 * @returns {Promise<Authorization[]>} - a Promise that resolves with the Authorizations
 *
 * @example
 * AuthorizationsApi.getAuthorizations(
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

  return getApiAxiosInstance(AUTHORIZATIONS_API)
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
