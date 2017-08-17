/*
 * @flow
 */

/**
 * SyncApi ...
 *
 * @module SyncApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.SyncApi.getCurrentSync...
 *
 * @example
 * import { SyncApi } from 'lattice';
 * // SyncApi.getCurrentSync...
 */

import Logger from '../utils/Logger';

import {
  SYNC_API
} from '../constants/ApiNames';

import {
  SET_PATH,
  CURRENT_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

const LOG = new Logger('SyncApi');

/**
 * `GET /sync/{entitySetId}/current`
 *
 * Returns the current sync id for a given entity set
 *
 * @static
 * @memberof lattice.
 * @param {UUID} entitySetId
 * @returns {Promise<UUID>} - a Promise that resolves with the UUID of the current sync id for the entity set
 *
 * @example
 * LinkingApi.getCurrentSyncId("e39dfdfa-a3e6-4f1f-b54b-646a723c3085");
 */
export function getCurrentSyncId(entitySetId :UUID) :Promise<> {

  // TODO: everything

  let errorMsg = '';

  return getApiAxiosInstance(SYNC_API)
    .get(`/${entitySetId}/${CURRENT_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
