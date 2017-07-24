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

import Immutable from 'immutable';

import isFinite from 'lodash/isFinite';
import isString from 'lodash/isString';

import Logger from '../utils/Logger';

import {
  SEARCH_API
} from '../constants/ApiNames';

import {
  ADVANCED_PATH,
  FQN_PATH,
  ORGANIZATIONS_PATH,
  SEARCH_ENTITY_SETS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
  SEARCH_ASSOCIATION_TYPES_PATH,
  SEARCH_PROPERTY_TYPES_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isDefined,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('SearchApi');

const ENTITY_TYPE_ID :string = 'eid';
const KEYWORD :string = 'kw';
const MAX_HITS :string = 'maxHits';
const NAME :string = 'name';
const NAMESPACE :string = 'namespace';
const PROPERTY_TYPE_IDS :string = 'pid';
const SEARCH_FIELDS :string = 'searchFields';
const SEARCH_TERM :string = 'searchTerm';
const START :string = 'start';

/**
 * `GET /search/entity_sets/{start}/{maxHits}`
 *
 * Executes a search over all existing entity sets to populate the home page
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {number} start
 * @param {number} maxHits
 * @returns {Promise}
 *
 * @example
 * SearchApi.getEntitySets({
 *   start: 0,
 *   maxHits: 10
 * });
 */

export function getEntitySets(searchOptions :Object) :Promise<> {
  let errorMsg = '';

  if (!isNonEmptyObject(searchOptions)) {
    errorMsg = 'invalid parameter: searchOptions must be a non-empty object';
    LOG.error(errorMsg, searchOptions);
    return Promise.reject(errorMsg);
  }

  const {
    start,
    maxHits
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

  return getApiAxiosInstance(SEARCH_API)
    .get(`/${SEARCH_ENTITY_SETS_PATH}/${start}/${maxHits}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });

}

/**
 * `POST /search`
 *
 * Executes a search across all EntitySet metadata with the given parameters.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "searchTerm": "Lattice",
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
 *     "searchTerm": "Lattice",
 *     "entityTypeId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 *
 * SearchApi.searchEntitySetMetaData(
 *   {
 *     "searchTerm": "Lattice",
 *     "propertyTypeIds": [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntitySetMetaData(searchOptions :Object) :Promise<> {

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
 * Executes a search over the data of the given EntitySet to find matches for the given search term.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {UUID} entitySetId
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "searchTerm": "Lattice",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntitySetData(entitySetId :UUID, searchOptions :Object) :Promise<> {

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
 * `POST /search/advanced/{entitySetId}`
 *
 * Executes a search over the data of the given EntitySet to find matches for the given search (field, term) pairs.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {UUID} entitySetId
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "searchFields": {
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e": "Lattice"
 *     },
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function advancedSearchEntitySetData(entitySetId :UUID, searchOptions :Object) :Promise<> {

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
    searchFields
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

  if (!isNonEmptyArray(searchFields)) {
    errorMsg = 'invalid parameter: searchFields must be a non-empty array';
    LOG.error(errorMsg, searchFields);
    return Promise.reject(errorMsg);
  }

  // TODO: validate searchFields

  data[START] = start;
  data[MAX_HITS] = maxHits;
  data[SEARCH_FIELDS] = searchFields;

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${ADVANCED_PATH}/${entitySetId}`, data)
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
 * Executes a search across all Organizations to find ones that match the given search term.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchOrganizations(
 *   {
 *     "searchTerm": "Lattice",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchOrganizations(searchOptions :Object) :Promise<> {

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
 * `POST /search/entity_types`
 *
 * Executes a search across all EntityTypes to find ones that match the given search term.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntityTypes(
 *   {
 *     "searchTerm": "Lattice",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntityTypes(searchOptions :Object) :Promise<> {

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
    .post(`/${SEARCH_ENTITY_TYPES_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/entity_types`
 *
 * Executes a search across all EntityTypes to find ones that match the given search term.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchAssociationTypes(
 *   {
 *     "searchTerm": "Lattice",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchAssociationTypes(searchOptions :Object) :Promise<> {

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
    .post(`/${SEARCH_ASSOCIATION_TYPES_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/entity_types/fqn`
 *
 * Executes a search across all EntityTypes to find ones that match the given FQN, including partial matches.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntityTypesByFQN(
 *   {
 *     "namespace": "LATTICE",
 *     "name": "MyEntityType",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchEntityTypesByFQN(searchOptions :Object) :Promise<> {

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
    name,
    namespace
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

  if (isDefined(namespace) && !isString(namespace)) {
    errorMsg = 'invalid parameter: namespace must be a string';
    LOG.error(errorMsg, namespace);
    return Promise.reject(errorMsg);
  }

  if (isDefined(name) && !isString(name)) {
    errorMsg = 'invalid parameter: name must be a string';
    LOG.error(errorMsg, name);
    return Promise.reject(errorMsg);
  }

  data[START] = start;
  data[MAX_HITS] = maxHits;
  data[NAMESPACE] = namespace;
  data[NAME] = name;

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${SEARCH_ENTITY_TYPES_PATH}/${FQN_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/property_types`
 *
 * Executes a search across all PropertyTypes to find ones that match the given search term.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchPropertyTypes(
 *   {
 *     "searchTerm": "Lattice",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchPropertyTypes(searchOptions :Object) :Promise<> {

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
    .post(`/${SEARCH_PROPERTY_TYPES_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /search/property_types/fqn`
 *
 * Executes a search across all PropertyTypes to find ones that match the given FQN, including partial matches.
 *
 * @static
 * @memberof lattice.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchPropertyTypesByFQN(
 *   {
 *     "namespace": "LATTICE",
 *     "name": "MyPropertyType",
 *     "start": 0,
 *     "maxHits": 100
 *   }
 * );
 */
export function searchPropertyTypesByFQN(searchOptions :Object) :Promise<> {

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
    name,
    namespace
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

  if (isDefined(namespace) && !isString(namespace)) {
    errorMsg = 'invalid parameter: namespace must be a string';
    LOG.error(errorMsg, namespace);
    return Promise.reject(errorMsg);
  }

  if (isDefined(name) && !isString(name)) {
    errorMsg = 'invalid parameter: name must be a string';
    LOG.error(errorMsg, name);
    return Promise.reject(errorMsg);
  }

  data[START] = start;
  data[MAX_HITS] = maxHits;
  data[NAMESPACE] = namespace;
  data[NAME] = name;

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${SEARCH_PROPERTY_TYPES_PATH}/${FQN_PATH}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * TODO: everything
 */
export function searchEntityNeighbors(entitySetId :UUID, entityId :UUID) :Promise<> {

  return getApiAxiosInstance(SEARCH_API)
    .get(`/${entitySetId}/${entityId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
