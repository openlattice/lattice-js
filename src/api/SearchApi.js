/*
 * @flow
 */

/**
 * SearchApi...
 *
 * @module SearchApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.SearchApi.search...
 *
 * @example
 * import { SearchApi } from 'loom-data';
 * // SearchApi.search...
 */

import Immutable from 'immutable';

import isFinite from 'lodash/isFinite';

import Logger from '../utils/Logger';

import {
  SEARCH_API
} from '../constants/ApiNames';

import {
  POPULAR_PATH,
  ORGANIZATIONS_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isDefined,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('SearchApi');

const KEYWORD = 'kw';
const ENTITY_TYPE_ID = 'eid';
const PROPERTY_TYPE_IDS = 'pid';
const START = 'start';
const MAX_HITS = 'maxHits';
const SEARCH_TERM = 'searchTerm';

/**
 * `POST /search`
 *
 * Executes a search across all EntitySet metadata with the given parameters.
 *
 * TODO: add unit tests
 * TODO: better validation
 * TODO: create data models
 *
 * @static
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
 * @property {string} keyword (optional)
 * @property {UUID} entityTypeId (optional)
 * @property {UUID[]} propertyTypeIds (optional)
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "searchTerm": "Loom",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 *
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "entityTypeId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 *
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "propertyTypeIds": [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 *
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "searchTerm": "Loom",
 *     "entityTypeId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 *
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "searchTerm": "Loom",
 *     "propertyTypeIds": [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntitySetMetaData(searchOptions :SearchOptions) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyObject(searchOptions)) {
    errorMsg = 'invalid parameter: at least one search parameter must be defined';
    LOG.error(errorMsg, searchOptions);
    return Promise.reject(errorMsg);
  }

  const data = {};
  const {
    start,
    maxHits,
    searchTerm,
    entityTypeId,
    propertyTypeIds
  } = searchOptions;

  if (!isFinite(start) || start < 0) {
    errorMsg = 'invalid property: start must be a positive number';
    LOG.error(errorMsg, start);
    return Promise.reject(errorMsg);
  }

  if (!isFinite(maxHits) || maxHits < 0) {
    errorMsg = 'invalid property: maxHits must be a positive number';
    LOG.error(errorMsg, maxHits);
    return Promise.reject(errorMsg);
  }

  data[START] = start;
  data[MAX_HITS] = maxHits;

  if (isDefined(searchTerm)) {
    if (!isNonEmptyString(searchTerm)) {
      errorMsg = 'invalid property: searchTerm must be a non-empty string';
      LOG.error(errorMsg, searchTerm);
      return Promise.reject(errorMsg);
    }
    data[KEYWORD] = searchTerm;
  }

  if (isDefined(entityTypeId)) {
    if (!isValidUuid(entityTypeId)) {
      errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
      LOG.error(errorMsg, entityTypeId);
      return Promise.reject(errorMsg);
    }
    data[ENTITY_TYPE_ID] = entityTypeId;
  }

  if (isDefined(propertyTypeIds)) {
    if (!isValidUuidArray(propertyTypeIds)) {
      errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
      LOG.error(errorMsg, propertyTypeIds);
      return Promise.reject(errorMsg);
    }
    data[PROPERTY_TYPE_IDS] = Immutable.Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((id :UUID) => {
        set.add(id);
      });
    }).toJS();
  }

  return getApiAxiosInstance(SEARCH_API)
    .post('/', data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/{entitySetId}`
 *
 * Executes a search query over the given entity set.
 *
 * TODO: add unit tests
 * TODO: better validation
 * TODO: create data models
 *
 * @static
 * @memberof loom-data.SearchApi
 * @param {UUID} entitySetId
 * @param {string} searchTerm
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "searchTerm": "Loom",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntitySetData(entitySetId :UUID, searchOptions :SearchOptions) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(searchOptions)) {
    errorMsg = 'invalid parameter: searchOptions must be a non-empty object';
    LOG.error(errorMsg, searchOptions);
    return Promise.reject(errorMsg);
  }

  const data = {};
  const {
    start,
    maxHits,
    searchTerm
  } = searchOptions;

  if (!isFinite(start) || start < 0) {
    errorMsg = 'invalid property: start must be a positive number';
    LOG.error(errorMsg, start);
    return Promise.reject(errorMsg);
  }

  if (!isFinite(maxHits) || maxHits < 0) {
    errorMsg = 'invalid property: maxHits must be a positive number';
    LOG.error(errorMsg, maxHits);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(searchTerm)) {
    errorMsg = 'invalid property: searchTerm must be a non-empty string';
    LOG.error(errorMsg, searchTerm);
    return Promise.reject(errorMsg);
  }

  data[START] = start;
  data[MAX_HITS] = maxHits;
  data[SEARCH_TERM] = searchTerm;

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${entitySetId}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/organizations`
 *
 * TODO: add unit tests
 *
 * @static
 * @memberof loom-data.SearchApi
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchOrganizations(
 *   {
 *     "searchTerm": "Loom",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchOrganizations(searchOptions :SearchOptions) :Promise<> {

  let errorMsg = '';

  if (!isNonEmptyObject(searchOptions)) {
    errorMsg = 'invalid parameter: searchOptions must be a non-empty object';
    LOG.error(errorMsg, searchOptions);
    return Promise.reject(errorMsg);
  }

  const data = {};
  const {
    start,
    maxHits,
    searchTerm
  } = searchOptions;

  if (!isFinite(start) || start < 0) {
    errorMsg = 'invalid property: start must be a positive number';
    LOG.error(errorMsg, start);
    return Promise.reject(errorMsg);
  }

  if (!isFinite(maxHits) || maxHits < 0) {
    errorMsg = 'invalid property: maxHits must be a positive number';
    LOG.error(errorMsg, maxHits);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(searchTerm)) {
    errorMsg = 'invalid property: searchTerm must be a non-empty string';
    LOG.error(errorMsg, searchTerm);
    return Promise.reject(errorMsg);
  }

  data[START] = start;
  data[MAX_HITS] = maxHits;
  data[SEARCH_TERM] = searchTerm;

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${ORGANIZATIONS_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /search/popular`
 *
 * TODO: add unit tests
 *
 * @static
 * @memberof loom-data.SearchApi
 * @returns {Promise<EntitySet[]>}
 *
 * @example
 * SearchApi.getPopularEntitySets();
 */
export function getPopularEntitySets() :Promise<> {

  return getApiAxiosInstance(SEARCH_API)
    .get(`/${POPULAR_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
