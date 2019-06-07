/*
 * @flow
 */

/**
 * S ...
 *
 * @module SubscriptionApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.SubscriptionApi.create...
 *
 * @example
 * import { SubscriptionApi } from 'lattice';
 * // SubscriptionApi.create...
 */

import Logger from '../utils/Logger';
import { SUBSCRIPTION_API } from '../constants/ApiNames';
import { ALL } from '../constants/UrlConstants';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('SubscriptionApi');

/**
 * `GET /subscriptions`
 *
 * Gets all subscriptions
 *
 * @static
 * @memberof lattice.SubscriptionApi
 * @returns {List<Subscription>} - a Promise that resolves with a list of subscriptions
 *
 * @example
 * SubscriptionApi.getAllSubscriptions();
 */
export function getAllSubscriptions() :Promise<*> {

  return getApiAxiosInstance(SUBSCRIPTION_API)
    .get(`/${ALL}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /subscriptions`
 *
 * Creates or updates a new subscription
 *
 * @static
 * @memberof lattice.SubscriptionApi
 * @param {Object} subscription
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * SubscriptionApi.createOrUpdateSubscription(
 *   {
 *     "ids": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *     "outgingEntityTypeIds": ["11442cb3-99dc-4842-8736-6c76e6fcc7c4"]
 *   }
 * );
 */
export function createOrUpdateSubscription(subscription :Object) :Promise<*> {

  return getApiAxiosInstance(SUBSCRIPTION_API)
    .post('/', subscription)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /subscriptions/{entityKeyId}`
 *
 * Deletes a subscription
 *
 * @static
 * @memberof lattice.SubscriptionApi
 * @param {Object} subscription
 * @returns {Promise>} - a Promise that resolves without a value
 *
 * @example
 * SubscriptionApi.deleteSubscription("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteSubscription(entityKeyId :UUID) :Promise<*> {

  return getApiAxiosInstance(SUBSCRIPTION_API)
    .delete(`/${entityKeyId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
