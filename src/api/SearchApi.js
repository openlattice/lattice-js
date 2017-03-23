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

import FullyQualifiedName from '../models/FullyQualifiedName';
import Logger from '../utils/Logger';

import {
  SEARCH_API
} from '../constants/ApiNames';

import {
  ADVANCED_PATH,
  FQN_PATH,
  ORGANIZATIONS_PATH,
  SEARCH_ENTITY_TYPES_PATH,
  SEARCH_PROPERTY_TYPES_PATH
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
 * `POST /search`
 *
 * Executes a search across all EntitySet metadata with the given parameters.
 *
 * @static
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
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
 * @memberof loom-data.SearchApi
 * @param {UUID} entitySetId
 * @param {Object} searchOptions
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
 * @memberof loom-data.SearchApi
 * @param {UUID} entitySetId
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "searchFields": {
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e": "Loom"
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

  if (!isNonEmptyObject(searchFields)) {
    errorMsg = 'invalid parameter: searchFields must be a non-empty object';
    LOG.error(errorMsg, searchFields);
    return Promise.reject(errorMsg);
  }

  const searchFieldsMap :Map<UUID, string> = Immutable.fromJS(searchFields);

  const allKeysUuids = searchFieldsMap.keySeq().every((key :UUID) => {
    return isValidUuid(key);
  });

  const allValuesUuids = searchFieldsMap.valueSeq().every((value :string) => {
    return isNonEmptyString(value);
  });

  if (!allKeysUuids) {
    errorMsg = 'invalid parameter: searchFields entry keys must all be UUIDs';
    LOG.error(errorMsg, searchFields);
    return Promise.reject(errorMsg);
  }
  else if (!allValuesUuids) {
    errorMsg = 'invalid parameter: searchFields entry values must all be non-empty strings';
    LOG.error(errorMsg, searchFields);
    return Promise.reject(errorMsg);
  }

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
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
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
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntityTypes(
 *   {
 *     "searchTerm": "Loom",
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
 * `POST /search/entity_types/fqn`
 *
 * Executes a search across all EntityTypes to find ones that match the given FQN, including partial matches.
 *
 * @static
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntityTypesByFQN(
 *   {
 *     "namespace": "LOOM",
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

  if (!FullyQualifiedName.isValid(namespace, name)) {
    errorMsg = 'invalid parameter: namespace and name must be a valid FQN';
    LOG.error(errorMsg, namespace, name);
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
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchPropertyTypes(
 *   {
 *     "searchTerm": "Loom",
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
 * @memberof loom-data.SearchApi
 * @param {Object} searchOptions
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchPropertyTypesByFQN(
 *   {
 *     "namespace": "LOOM",
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

  if (!FullyQualifiedName.isValid(namespace, name)) {
    errorMsg = 'invalid parameter: namespace and name must be a valid FQN';
    LOG.error(errorMsg, namespace, name);
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
