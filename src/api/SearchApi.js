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
 * // Loom.SearchApi.get...
 *
 * @example
 * import { SearchApi } from 'loom-data';
 * // SearchApi.get...
 */

import Immutable from 'immutable';

import Logger from '../utils/Logger';

import {
  SEARCH_API
} from '../constants/ApiNames';

import {
  SEARCH_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
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
 * `GET /search`
 */
export function searchGET(keyword :string, entityTypeId :UUID, propertyTypeIds :UUID[]) :Promise<> {

  if (!isNonEmptyString(keyword)) {
    return Promise.reject('invalid parameter: keyword must be a non-empty string');
  }

  if (!isValidUuid(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  if (!isValidUuidArray(propertyTypeIds)) {
    return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
  }

  const ids = Immutable.Set().withMutations((set :Set<UUID>) => {
    propertyTypeIds.forEach((id :UUID) => {
      set.add(id);
    });
  }).toJS();

  const config = {
    params: {
      [KEYWORD]: keyword,
      [ENTITY_TYPE_ID]: entityTypeId,
      [PROPERTY_TYPE_IDS]: ids
    }
  };

  return getApiAxiosInstance(SEARCH_API)
    .get('/', config)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /search`
 */
export function search(keyword :string, entityTypeId :UUID, propertyTypeIds :UUID[]) :Promise<> {

  if (!isNonEmptyString(keyword)) {
    return Promise.reject('invalid parameter: keyword must be a non-empty string');
  }

  if (!isValidUuid(entityTypeId)) {
    return Promise.reject('invalid parameter: entityTypeId must be a valid UUID');
  }

  if (!isValidUuidArray(propertyTypeIds)) {
    return Promise.reject('invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs');
  }

  const data = Immutable.Set().withMutations((set :Set<UUID>) => {
    propertyTypeIds.forEach((id :UUID) => {
      set.add(id);
    });
  }).toJS();

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
