/*
 * @flow
 */

/**
 * SearchApi...
 *
 * @module SearchApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.SearchApi.search...
 *
 * @example
 * import { SearchApi } from 'lattice';
 * // SearchApi.search...
 */

import isFinite from 'lodash/isFinite';
import { Set } from 'immutable';

import Logger from '../utils/Logger';
import { SEARCH_API } from '../constants/ApiNames';
import {
  DESTINATION,
  DESTINATION_ES_IDS,
  EDGE,
  EDGE_ES_IDS,
  ENTITY_KEY_IDS,
  SOURCE,
  SOURCE_ES_IDS,
} from '../constants/SerializationConstants';
import {
  ADVANCED_PATH,
  COUNT_PATH,
  DATA_SETS_PATH,
  IDS_PATH,
  NEIGHBORS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
} from '../constants/UrlConstants';
import { isDefined, isEmptyArray, isNonEmptyObject } from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('SearchApi');

/**
 * `POST /search/entity_types/{entityTypeId}/count`
 *
 * Searches EntitySet data according to the given constraints.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {UUID} entityTypeId
 * @param {UUID[]} entitySetIds
 * @returns {Promise<number>} - a Promise that resolves with the number of entities within the provided entity sets.
 * Entity sets must belong to the same provided entity type
 *
 * @example
 * SearchApi.countEntitiesInSets(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["3bf2a30d-fda0-4389-a1e6-8546b230efad", "11442cb3-99dc-4842-8736-6c76e6fcc7c4"]
 * );
 */
function countEntitiesInSets(entityTypeId :UUID, entitySetIds :UUID[]) :Promise<number> {
  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: "entityTypeId" must be a valid UUID';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUIDArray(entitySetIds)) {
    errorMsg = 'invalid parameter: "entitySetIds" must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${SEARCH_ENTITY_TYPES_PATH}/${entityTypeId}/${COUNT_PATH}`, entitySetIds)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/datasets`
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise<Object>}
 *
 * @example
 * SearchApi.searchDataSetMetadata(
 *   {
 *     "excludeColumns": false,
 *     "maxHits": 100,
 *     "organizationIds": ["3bf2a30d-fda0-4389-a1e6-8546b230efad"],
 *     "searchTerm": "test",
 *     "start": 0
 *   }
 * );
 */
function searchDataSetMetadata(searchOptions :Object) :Promise<Object> {

  let errorMsg = '';

  if (!isNonEmptyObject(searchOptions)) {
    errorMsg = 'invalid parameter: "searchOptions" must be a non-empty object';
    LOG.error(errorMsg, searchOptions);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${DATA_SETS_PATH}`, searchOptions)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/{entitySetId}/neighbors/advanced`
 *
 * Searches all neighbors of multiple entities of the same EntitySet that are connected by an association,
 * optinally filtered by the given source/destination/edge EntitySet ids
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {UUID} entitySetId
 * @param {Object} filter
 * @returns {Promise<Object>} - a Promise that resolves with the search results
 *
 * @example
 * SearchApi.searchEntityNeighborsFilter(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "entityKeyIds": ["3bf2a30d-fda0-4389-a1e6-8546b230efad"],
 *     "destinationEntitySetIds": ["11442cb3-99dc-4842-8736-6c76e6fcc7c4"],
 *     "edgeEntitySetIds": ["f8c6c56a-ad39-4587-b216-def81615d69c"],
 *     "sourceEntitySetIds": ["6317fab5-905d-42f4-8d67-2b78b3c56c77"],
 *   },
 *   true
 * );
 */
function searchEntityNeighborsWithFilter(
  entitySetId :UUID,
  filter :Object,
  idsOnly :boolean = false
) :Promise<Object> {

  let errorMsg = '';
  const data :Object = {};

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (typeof idsOnly !== 'boolean') {
    errorMsg = 'invalid parameter: idsOnly must be a boolean';
    LOG.error(errorMsg, idsOnly);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(filter)) {
    errorMsg = 'invalid parameter: filter must be a non-empty object';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUIDArray(filter[ENTITY_KEY_IDS])) {
    errorMsg = `invalid parameter: filter.${ENTITY_KEY_IDS} must be a non-empty set of valid UUIDs`;
    LOG.error(errorMsg, filter[ENTITY_KEY_IDS]);
    return Promise.reject(errorMsg);
  }

  const entityKeyIds :UUID[] = Set().withMutations((set :Set<UUID>) => (
    filter[ENTITY_KEY_IDS].forEach((id :UUID) => set.add(id))
  )).toJS();
  data[ENTITY_KEY_IDS] = entityKeyIds;

  let destinationEntitySetIds :?UUID[];
  if (isEmptyArray(filter[DESTINATION_ES_IDS]) || isValidUUIDArray(filter[DESTINATION_ES_IDS])) {
    destinationEntitySetIds = Set().withMutations((set :Set<UUID>) => (
      filter[DESTINATION_ES_IDS].forEach((id :UUID) => set.add(id))
    )).toJS();
    data[DESTINATION] = destinationEntitySetIds;
  }
  else if (isDefined(filter[DESTINATION_ES_IDS])) {
    errorMsg = `invalid parameter: filter.${DESTINATION_ES_IDS} must be a set of valid UUIDs`;
    LOG.error(errorMsg, filter[DESTINATION_ES_IDS]);
    return Promise.reject(errorMsg);
  }

  let edgeEntitySetIds :?UUID[];
  if (isEmptyArray(filter[EDGE_ES_IDS]) || isValidUUIDArray(filter[EDGE_ES_IDS])) {
    edgeEntitySetIds = Set().withMutations((set :Set<UUID>) => (
      filter[EDGE_ES_IDS].forEach((id :UUID) => set.add(id))
    )).toJS();
    data[EDGE] = edgeEntitySetIds;
  }
  else if (isDefined(filter[EDGE_ES_IDS])) {
    errorMsg = `invalid parameter: filter.${EDGE_ES_IDS} must be a set of valid UUIDs`;
    LOG.error(errorMsg, filter[EDGE_ES_IDS]);
    return Promise.reject(errorMsg);
  }

  let sourceEntitySetIds :?UUID[];
  if (isEmptyArray(filter[SOURCE_ES_IDS]) || isValidUUIDArray(filter[SOURCE_ES_IDS])) {
    sourceEntitySetIds = Set().withMutations((set :Set<UUID>) => (
      filter[SOURCE_ES_IDS].forEach((id :UUID) => set.add(id))
    )).toJS();
    data[SOURCE] = sourceEntitySetIds;
  }
  else if (isDefined(filter[SOURCE_ES_IDS])) {
    errorMsg = `invalid parameter: filter.${SOURCE_ES_IDS} must be a set of valid UUIDs`;
    LOG.error(errorMsg, filter[SOURCE_ES_IDS]);
    return Promise.reject(errorMsg);
  }

  const baseEndpoint = `/${entitySetId}/${NEIGHBORS_PATH}/${ADVANCED_PATH}`;
  const endpoint = idsOnly ? `${baseEndpoint}/${IDS_PATH}` : baseEndpoint;

  return getApiAxiosInstance(SEARCH_API)
    .post(endpoint, data)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /search`
 *
 * Searches EntitySet data according to the given constraints.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchConstraints
 * @returns {Promise<Object>} - a Promise that resolves with the search results
 */
function searchEntitySetData(searchConstraints :Object) :Promise<Object> {

  let errorMsg = '';

  if (!isNonEmptyObject(searchConstraints)) {
    errorMsg = 'invalid parameter: "searchConstraints" must be a non-empty object';
    LOG.error(errorMsg, searchConstraints);
    return Promise.reject(errorMsg);
  }

  // TODO: SearchConstraints model
  const {
    entitySetIds,
    maxHits,
    start,
  } = searchConstraints;

  if (!isValidUUIDArray(entitySetIds)) {
    errorMsg = 'invalid parameter: "entitySetIds" must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  if (!isFinite(start) || start < 0) {
    errorMsg = 'invalid property: "start" must be a positive number';
    LOG.error(errorMsg, start);
    return Promise.reject(errorMsg);
  }

  if (!isFinite(maxHits) || maxHits < 0) {
    errorMsg = 'invalid property: "maxHits" must be a positive number';
    LOG.error(errorMsg, maxHits);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(SEARCH_API)
    .patch('/', searchConstraints)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  countEntitiesInSets,
  searchDataSetMetadata,
  searchEntityNeighborsWithFilter,
  searchEntitySetData,
};
