/*
 * @flow
 */

/**
 * FeedsApi ...
 *
 * @module FeedsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.FeedsApi.create...
 *
 * @example
 * import { FeedsApi } from 'lattice';
 * // FeedsApi.create...
 */

import Logger from '../utils/Logger';
import { FEEDS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('FeedsApi');

/**
 * `GET /feeds`
 *
 * Loads a Neighborhood
 *
 * @static
 * @memberof lattice.FeedsApi
 * @returns {Promise<Neighborhood>} - a Promise that resolves with the user's Neighborhood
 *
 * @example
 * FeedsApi.getLatestFeed();
 */
export function getLatestFeed() :Promise<*> {

  return getApiAxiosInstance(FEEDS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
