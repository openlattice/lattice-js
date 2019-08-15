/*
 * @flow
 */

/**
 * RequestsApi ...
 *
 * TODO: add description
 *
 * @module RequestsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.RequestsApi.get...
 *
 * @example
 * import { RequestsApi } from 'lattice';
 * // RequestsApi.get...
 */

import has from 'lodash/has';
import { List, Set } from 'immutable';

import RequestStateTypes from '../constants/types/RequestStateTypes';
import Request, { isValidRequestArray } from '../models/Request';
import RequestStatus from '../models/RequestStatus';
import Logger from '../utils/Logger';
import { REQUESTS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isValidUuidArray } from '../utils/ValidationUtils';

import {
  isDefined,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

import type { RequestStateType } from '../constants/types/RequestStateTypes';

const LOG = new Logger('RequestsApi');

/**
 * `GET /requests`
 * `GET /requests/{state}`
 * `POST /requests`
 * `POST /requests/{state}`
 *
 * TODO: add description
 * TODO: add tests
 *
 * @static
 * @memberof lattice.RequestsApi
 * @param {RequestStateType} state (optional)
 * @param {UUID[][]} aclKeys (optional)
 * @returns {Promise<RequestStatus[]>}
 *
 * @example
 *
 * RequestsApi.getAllStatuses();
 *
 * RequestsApi.getAllStatusesForState(
 *   {
 *     "state": "SUBMITTED"
 *   }
 * );
 *
 * RequestsApi.getAllRequestStatuses(
 *   {
 *     "aclKeys": [
 *       ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"],
 *       ["8f79e123-3411-4099-a41f-88e5d22d0e8d"]
 *     ]
 *   }
 * );
 *
 * RequestsApi.getAllRequestStatuses(
 *   {
 *     "state": "SUBMITTED",
 *     "aclKeys": [
 *       ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"],
 *       ["8f79e123-3411-4099-a41f-88e5d22d0e8d"]
 *     ]
 *   }
 * );
 */
type StateAclKeysObject = {
  state :RequestStateType,
  aclKeys :UUID[][]
};
export function getAllRequestStatuses(options :StateAclKeysObject) :Promise<*> {

  let errorMsg :string = '';

  // https://flowtype.org/docs/objects.html#sealed-object-types
  const axiosConfig = {};
  axiosConfig.url = '/';
  axiosConfig.method = 'get';

  if (isDefined(options) && !isNonEmptyObject(options)) {
    errorMsg = 'invalid parameter: when given, options must be a non-empty object literal';
    LOG.error(errorMsg, options.state);
    return Promise.reject(errorMsg);
  }

  if (isNonEmptyObject(options) && has(options, 'state')) {

    if (!isNonEmptyString(options.state) || !RequestStateTypes[options.state]) {
      errorMsg = 'invalid parameter: when given, state must be a valid RequestStateType';
      LOG.error(errorMsg, options.state);
      return Promise.reject(errorMsg);
    }

    axiosConfig.url = `/${options.state}`;
  }

  if (isNonEmptyObject(options) && has(options, 'aclKeys')) {

    if (!isNonEmptyArray(options.aclKeys)) {
      errorMsg = 'invalid parameter: when given, aclKeys must be a non-empty array of UUID arrays';
      LOG.error(errorMsg, options.aclKeys);
      return Promise.reject(errorMsg);
    }

    const aclKeysSet :Set<List<UUID>> = Set().withMutations((set :Set<List<UUID>>) => {
      for (let index = 0; index < options.aclKeys.length; index += 1) {
        const aclKey = options.aclKeys[index];
        if (!isValidUuidArray(aclKey)) {
          errorMsg = `invalid parameter: when given, aclKeys[${index}] must be a non-empty array of UUIDs`;
          LOG.error(errorMsg, aclKey);
          break;
        }
        set.add(List(aclKey));
      }
    });

    axiosConfig.method = 'post';
    axiosConfig.data = aclKeysSet.toJS();
  }

  if (errorMsg) {
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(REQUESTS_API)
    .request(axiosConfig)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /requests`
 *
 * TODO: add description
 *
 * @static
 * @memberof lattice.RequestsApi
 * @param {Request[]} requests
 * @returns {Promise}
 *
 * @example
 * RequestsApi.submitRequests(
 *   [
 *     {
 *       "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *       "permissions": ["READ"],
 *       reason: "a good reason"
 *     },
 *   ]
 * );
 */
export function submitRequests(requests :Request[]) :Promise<*> {

  let errorMsg :string = '';

  if (!isValidRequestArray(requests)) {
    errorMsg = 'invalid parameter: requests must be a non-empty array of valid Requests';
    LOG.error(errorMsg, requests);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set() with unit tests

  return getApiAxiosInstance(REQUESTS_API)
    .put('/', requests)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /requests`
 *
 * TODO: add description
 *
 * @static
 * @memberof lattice.RequestsApi
 * @param {Status[]} statuses
 * @returns {Promise}
 *
 * @example
 * RequestsApi.updateRequestStatuses(
 *   [
 *     {
 *       "request": {
 *         "aclKey": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *         "permissions": ["READ"],
 *         reason: "a good reason"
 *       },
 *       "state": "SUBMITTED"
 *       "principal": {
 *         "type": "USER",
 *         "id": "principalId"
 *       }
 *     }
 *   ]
 * );
 */
export function updateRequestStatuses(statuses :RequestStatus[]) :Promise<*> {

  // let errorMsg :string = '';
  //
  // if (!isValidRequestStatusArray(statuses)) {
  //   errorMsg = 'invalid parameter: statuses must be a non-empty array of valid Requests';
  //   LOG.error(errorMsg, statuses);
  //   return Promise.reject(errorMsg);
  // }

  // TODO: Immutable.Set() with unit tests

  return getApiAxiosInstance(REQUESTS_API)
    .patch('/', statuses)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
