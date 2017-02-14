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

import Logger from '../utils/Logger';

import {
  SEARCH_API
} from '../constants/ApiNames';

import {
  POPULAR_PATH
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

/**
 * `POST /search`
 *
 * Executes a search query with the given parameters.
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
 * SearchApi.search(
 *   {
 *     keyword: "test",
 *   }
 * );
 *
 * SearchApi.search(
 *   {
 *     entityTypeId: "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   }
 * );
 *
 * SearchApi.search(
 *   {
 *     propertyTypeIds: [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ]
 *   }
 * );
 *
 * SearchApi.search(
 *   {
 *     keyword: "test",
 *     entityTypeId: "ec6865e6-e60e-424b-a071-6a9c1603d735"
 *   }
 * );
 *
 * SearchApi.search(
 *   {
 *     keyword: "test",
 *     propertyTypeIds: [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ]
 *   }
 * );
 */
export function search(searchOptions :Object) :Promise<> {

  if (!isNonEmptyObject(searchOptions)) {
    return Promise.reject('invalid parameter: at least one search parameter must be defined');
  }

  const data = {};
  const { keyword, entityTypeId, propertyTypeIds } = searchOptions;

  if (isDefined(keyword)) {
    if (!isNonEmptyString(keyword)) {
      return Promise.reject('invalid parameter: keyword must be a non-empty string');
    }
    data[KEYWORD] = keyword;
  }

  if (isDefined(entityTypeId)) {
    if (!isValidUuid(entityTypeId)) {
      return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
    }
    data[ENTITY_TYPE_ID] = entityTypeId;
  }

  if (isDefined(propertyTypeIds)) {
    if (!isValidUuidArray(propertyTypeIds)) {
      return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
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
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /search/{entitySetId}`
 *
 * Executes a search query over the given entity set.
 *
 * @static
 * @memberof loom-data.SearchApi
 * @param {UUID} entitySetId
 * @param {string} searchTerm
 * @returns {Promise}
 *
 * @example
 * SearchApi.searchEntitySetData("ec6865e6-e60e-424b-a071-6a9c1603d735", "john");
 */
export function searchEntitySetData(entitySetId :UUID, searchTerm :String) :Promise<> {

  if (!isValidUuid(entitySetId)) {
    return Promise.reject('invalid parameter: entitySetId must be a valid UUID');
  }

  if (!isNonEmptyString(searchTerm)) {
    return Promise.reject('invalid parameter: searchTerm must be a non-empty string');
  }

  return getApiAxiosInstance(SEARCH_API)
    .post(`/${entitySetId}`, searchTerm)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}


/**
 * `GET /search/popular`
 *
 * @static
 * @memberof loom-data.SearchApi
 * @returns {Promise<EntitySet[]>}
 *
 * @example
 * SearchApi.getPopularEntitySet();
 */
export function getPopularEntitySet() :Promise<> {

  return getApiAxiosInstance(SEARCH_API)
    .get(`/${POPULAR_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
