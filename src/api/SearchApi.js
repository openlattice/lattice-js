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
 * SearchApi.searchGET(
 *   {
 *     entityTypeId: "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   }
 * );
 *
 * SearchApi.searchGET(
 *   {
 *     propertyTypeIds: [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ]
 *   }
 * );
 *
 * SearchApi.searchGET(
 *   {
 *     keyword: "test",
 *     entityTypeId: "ec6865e6-e60e-424b-a071-6a9c1603d735"
 *   }
 * );
 *
 * SearchApi.searchGET(
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

  const { keyword, entityTypeId, propertyTypeIds } = searchOptions;

  if (isDefined(keyword) && !isNonEmptyString(keyword)) {
    return Promise.reject('invalid parameter: keyword must be a non-empty string');
  }

  if (isDefined(entityTypeId) && !isValidUuid(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  if (isDefined(propertyTypeIds) && !isValidUuidArray(propertyTypeIds)) {
    return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
  }

  let data = [];
  if (isDefined(propertyTypeIds)) {
    data = Immutable.Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((id :UUID) => {
        set.add(id);
      });
    }).toJS();
  }

  const config = {
    params: {
      [KEYWORD]: keyword,
      [ENTITY_TYPE_ID]: entityTypeId
    }
  };

  return getApiAxiosInstance(SEARCH_API)
    .post('/', data, config)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
