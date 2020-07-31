/*
 * @flow
 */

/**
 * PersistentSearchApi ...
 *
 * @module PersistentSearchApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.PersistentSearchApi.create...
 *
 * @example
 * import { PersistentSearchApi } from 'lattice';
 * // PersistentSearchApi.create...
 */

import _isBoolean from 'lodash/isBoolean';

import Logger from '../utils/Logger';
import { PERSISTENT_SEARCH_API } from '../constants/ApiNames';
import { EXPIRATION_PATH } from '../constants/UrlConstants';
import { isNonEmptyObject, isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('PersistentSearchApi');

/**
 * `POST /persistentsearch`
 *
 * Creates a new PersistentSearch
 *
 * @static
 * @memberof lattice.PersistentSearchApi
 * @param {Object} persistentSearch
 * @returns {Promise<UUID>} - a Promise that resolves with the id of the newly-created PersistentSearch
 *
 * @example
 * PersistentSearchApi.createPersistentSearch(
 *   {
 *     "expiration": "2018-12-22T01:57:02.801Z",
 *     "type": "ALPR_ALERT",
 *     "alertMetadata": {
 *       "searchReason": "Locate Witnesses or Victims of Violent Crime"
 *     }
 *     "constraints": {
 *       "constraints": [
 *         {
 *           "entitySetIds": ["8975812d-0325-4934-83a9-5b41bebd4c67"]
 *           "start": 0,
 *           "maxHits": 3000,
 *           "constraints": [{
 *             "min": 1,
 *             "constraints": [{
 *               "type": "simple",
 *               "fuzzy": false,
 *               "searchTerm": "43a6df96-1cb8-4daa-9a82-f9361b8777c7:\"7RMF622\""
 *             }]
 *         }
 *       ]
 *     }
 *   }
 * );
 */
function createPersistentSearch(persistentSearch :Object) :Promise<UUID> {

  let errorMsg = '';

  // TODO: needs more validation
  if (!isNonEmptyObject(persistentSearch)) {
    errorMsg = 'invalid parameter: "persistentSearch" must be a non-empty object';
    LOG.error(errorMsg, persistentSearch);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERSISTENT_SEARCH_API)
    .post('', persistentSearch)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /persistentsearch/{persistentSearchId}`
 *
 * Expires a PersistentSearch
 *
 * @static
 * @memberof lattice.PersistentSearchApi
 * @param {UUID} persistentSearchId The id of the PersistentSearch to expire
 * @returns {Promise<void>} - a Promise that resolves once the expiration date has been expired
 *
 * @example
 * PersistentSearchApi.expirePersistentSearch("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function expirePersistentSearch(persistentSearchId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(persistentSearchId)) {
    errorMsg = 'invalid parameter: "persistentSearchId" must be a valid UUID';
    LOG.error(errorMsg, persistentSearchId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERSISTENT_SEARCH_API)
    .delete(`/${persistentSearchId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /persistentsearch?includeExpired={includeExpired}`
 *
 * Returns all persistent searches a person has created
 *
 * @static
 * @memberof lattice.PersistentSearchApi
 * @param {boolean} includeExpired - indicates whether to return only active persistent searches or include expired ones
 * @returns {Promise<Object[]>} - a Promise that resolves with a list of PersistentSearch objects
 *
 * @example
 * PersistentSearchApi.getPersistentSearches(true);
 */
function getPersistentSearches(includeExpired :boolean) :Promise<Object[]> {

  let errorMsg = '';

  if (!_isBoolean(includeExpired)) {
    errorMsg = 'invalid parameter: "includeExpired" must be a boolean';
    LOG.error(errorMsg, includeExpired);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERSISTENT_SEARCH_API)
    .get(`?includeExpired=${includeExpired}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /persistentsearch/{persistentSearchId}/expiration`
 *
 * Updates the expiration date of a particular PersistentSearch
 *
 * @static
 * @memberof lattice.PersistentSearchApi
 * @param {UUID} persistentSearchId The id of the PersistentSearch to update
 * @param {string} expiration The new expiration date
 * @returns {Promise} - a Promise that resolves once the expiration date has been updated
 *
 * @example
 * PersistentSearchApi.updatePersistentSearchExpiration("ec6865e6-e60e-424b-a071-6a9c1603d735", "2018-12-22T01:57:02.801Z");
 */
function updatePersistentSearchExpiration(persistentSearchId :UUID, expiration :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(persistentSearchId)) {
    errorMsg = 'invalid parameter: "persistentSearchId" must be a valid UUID';
    LOG.error(errorMsg, persistentSearchId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(expiration)) {
    errorMsg = 'invalid parameter: "expiration" must be a valid string';
    LOG.error(errorMsg, persistentSearchId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(PERSISTENT_SEARCH_API)
    .patch(`/${persistentSearchId}/${EXPIRATION_PATH}`, expiration, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  createPersistentSearch,
  expirePersistentSearch,
  getPersistentSearches,
  updatePersistentSearchExpiration,
};
