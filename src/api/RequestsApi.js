/*
 * @flow
 */

/**
 * RequestsApi ...
 *
 * TODO: add description
 *
 * @module RequestsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.RequestsApi.get...
 *
 * @example
 * import { RequestsApi } from 'loom-data';
 * // RequestsApi.get...
 */

import Immutable from 'immutable';

import RequestStateTypes from '../constants/types/RequestStateTypes';
import Logger from '../utils/Logger';

import Request from '../models/Request';
import RequestStatus from '../models/RequestStatus';

import {
  REQUESTS_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isDefined,
  isNonEmptyArray,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidRequestArray,
  isValidRequestStatusArray,
  isValidUuidArray
} from '../utils/ValidationUtils';

import type {
  RequestState
} from '../constants/types/RequestStateTypes';

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
 * @memberof loom-data.RequestsApi
 * @param {RequestState} state (optional)
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
  state :RequestState,
  aclKeys :UUID[][]
};
export function getAllRequestStatuses(options :StateAclKeysObject) :Promise<> {

  // state :RequestState, aclKeys :UUID[][]
  let errorMsg :string;

  // https://flowtype.org/docs/objects.html#sealed-object-types
  const axiosConfig = {};
  axiosConfig.url = '/';
  axiosConfig.method = 'get';

  const {
    state,
    aclKeys
  } : {
    state :RequestState,
    aclKeys :UUID[][]
  } = options;

  if (isDefined(state)) {

    if (!isNonEmptyString(state) || !RequestStateTypes[state]) {
      errorMsg = 'invalid parameter: state must be a valid RequestState';
      LOG.error(errorMsg, state);
      return Promise.reject(errorMsg);
    }

    axiosConfig.url = `/${state}`;
  }

  if (isDefined(aclKeys)) {

    if (!isNonEmptyArray(aclKeys)) {
      errorMsg = 'invalid parameter: aclKeys must be a non-empty array of UUID arrays';
      LOG.error(errorMsg, aclKeys);
      return Promise.reject(errorMsg);
    }

    const aclKeysSet :Set<List<UUID>> = Immutable.Set().withMutations((set :Set<List<UUID>>) => {
      for (let index = 0; index < aclKeys.length; index += 1) {
        const aclKey = aclKeys[index];
        if (!isValidUuidArray(aclKey)) {
          errorMsg = `invalid parameter: aclKeys[${index}] must be a non-empty array of UUIDs`;
          LOG.error(errorMsg, aclKey);
          break;
        }
        set.add(Immutable.List(aclKey));
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /requests`
 *
 * TODO: add description
 * TODO: add tests
 *
 * @static
 * @memberof loom-data.RequestsApi
 * @param {Request[]} requests
 * @returns {Promise}
 */
export function submitRequest(requests :Request[]) :Promise<> {

  let errorMsg :string;

  if (!isValidRequestArray(requests)) {
    errorMsg = 'invalid parameter: requests must be a non-empty array of valid Requests';
    LOG.error(errorMsg, requests);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set()

  return getApiAxiosInstance(REQUESTS_API)
    .put('/', requests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /requests`
 *
 * TODO: add description
 * TODO: add tests
 *
 * @static
 * @memberof loom-data.RequestsApi
 * @param {Status[]} statuses
 * @returns {Promise}
 */
export function updateRequestStatuses(statuses :RequestStatus[]) :Promise<> {

  let errorMsg :string;

  if (!isValidRequestStatusArray(statuses)) {
    errorMsg = 'invalid parameter: statuses must be a non-empty array of valid Requests';
    LOG.error(errorMsg, statuses);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set()

  return getApiAxiosInstance(REQUESTS_API)
    .patch('/', statuses)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
