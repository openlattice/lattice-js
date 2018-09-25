/*
 * @flow
 */

/**
 * DataApi gives access to OpenLattice's REST API for reading, writing data against an existing EntityDataModel schema.
 *
 * @module DataApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataApi.get...
 *
 * @example
 * import { DataApi } from 'lattice';
 * // DataApi.get...
 */

import isUndefined from 'lodash/isUndefined';
import { Set } from 'immutable';

import DataEdgeKey, { isValidDataEdgeKeyArray } from '../models/DataEdgeKey';
import DataGraph, { isValidDataGraph } from '../models/DataGraph';
import FullyQualifiedName from '../models/FullyQualifiedName';
import Logger from '../utils/Logger';
import { DATA_API } from '../constants/ApiNames';
import { getApiBaseUrl, getApiAxiosInstance } from '../utils/axios';
import { isEmptyArray, isNonEmptyObject, isNonEmptyString } from '../utils/LangUtils';

import EntityUpdateTypes from '../constants/types/EntityUpdateTypes';

import {
  ASSOCIATION_PATH,
  COUNT_PATH,
  FILE_TYPE,
  SET_ID,
  SET_PATH,
  TYPE_PATH
} from '../constants/UrlConstants';

import {
  isValidMultimap,
  isValidMultimapArray,
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('DataApi');

/**
 * `DELETE /data/set/{entitySetId}/{entityKeyId}`
 *
 * Clears the entity data with the given entityKeyId from the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.clearEntityFromEntitySet(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735"
 * );
 */
export function clearEntityFromEntitySet(entitySetId :UUID, entityKeyId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityKeyId)) {
    errorMsg = 'invalid parameter: entityKeyId must be a valid UUID';
    LOG.error(errorMsg, entityKeyId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${SET_PATH}/${entitySetId}/${entityKeyId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /data/set/{entitySetId}`
 *
 * Clears all entity data from the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.clearEntitySet("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function clearEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .delete(`/${SET_PATH}/${entitySetId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /data/association`
 *
 * Creates associations (edges) from the given DataEdgeKeys.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {DataEdgeKey[]} associations
 * @return {Promise} - a Promise that resolves with the count of associations (edges) that were created
 *
 * @example
 * DataApi.createAssociations([
 *   {
 *     "dst": {
 *       "entitySetId": "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "entityKeyId": "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     },
 *     "edge": {
 *       "entitySetId": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *       "entityKeyId": "e39dfdfa-a3e6-4f1f-b54b-646a723c3085"
 *     },
 *     "src": {
 *       "entitySetId": "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "entityKeyId": "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     },
 *   }
 * ]);
 */
export function createAssociations(associations :DataEdgeKey[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidDataEdgeKeyArray(associations)) {
    errorMsg = 'invalid parameter: associations must be a non-empty array of valid DataEdgeKeys';
    LOG.error(errorMsg, associations);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .put(`/${ASSOCIATION_PATH}`, associations)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data`
 *
 * Creates entities for the given entity and association data, and returns the corresponding entity UUIDs.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {DataGraph} data
 * @return {Promise} - a Promise that resolves with the ids of the entities and associations that were created
 *
 * @example
 * DataApi.createEntityAndAssociationData({
 *   associations: {
 *     'a680a1d8-73fb-423c-abd2-fd71965693d2': [{
 *       dstEntityIndex: 2,
 *       dstEntityKeyId: 'cf72e97f-109c-46a1-bb89-93a8753fd7ac',
 *       dstEntitySetId: '69682f1e-6039-44da-8342-522395b43738',
 *       srcEntityIndex: 4,
 *       srcEntityKeyId: '5e4a579a-ad72-4902-991c-027d80dcd590',
 *       srcEntitySetId: 'd66c4c7d-0aa9-43f3-bb80-9ebcbd5e21ea',
 *     }]
 *   },
 *   entities: {
 *     'c92f4318-9f93-4f88-94c1-0ca5b3b278ab': [{
 *       '6a74d45c-9451-4f88-b8c8-a0e27c08b2a2': ['value_1', 'value_2'],
 *     }]
 *   },
 * });
 */
export function createEntityAndAssociationData(data :DataGraph) :Promise<*> {

  let errorMsg = '';

  if (!isValidDataGraph(data)) {
    errorMsg = 'invalid parameter: data must be a valid DataGraph';
    LOG.error(errorMsg, data);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post('/', data)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/set/?setId={entitySetId}`
 *
 * Creates or updates entities for the given entity data, and returns the corresponding entity UUIDs.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {Object} entities
 * @return {Promise<UUID[]>} - a Promise that resolves with a list of UUIDs
 *
 * @example
 * DataApi.createOrMergeEntityData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [{
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e": ["value_1", "value_2"],
 *     "fae6af98-2675-45bd-9a5b-1619a87235a8": ["value_3", "value_4"]
 *   }]
 * );
 */

export function createOrMergeEntityData(entitySetId :UUID, entities :Object[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate SetMultimap
  if (!isValidMultimapArray(entities, isValidUuid)) {
    errorMsg = 'invalid parameter: entities must be a non-empty multimap array';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/?${SET_ID}=${entitySetId}`, entities)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /data/{entitySetId}/{entityKeyId}`
 *
 * Returns the entity data with the given entityKeyId in the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @return {Promise} - a Promise that resolves with the requested entity data
 *
 * @example
 * DataApi.getEntityData("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e", "ec6865e6-e60e-424b-a071-6a9c1603d735")
 */
export function getEntityData(entitySetId :UUID, entityKeyId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityKeyId)) {
    errorMsg = 'invalid parameter: entityKeyId must be a valid UUID';
    LOG.error(errorMsg, entityKeyId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .get(`/${entitySetId}/${entityKeyId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * @deprecated
 */
export function getEntity(entitySetId :UUID, entityKeyId :UUID) :Promise<*> {

  LOG.error('DataApi.getEntity() is deprecated. Please use DataApi.getEntityData() instead.');
  return getEntityData(entitySetId, entityKeyId);
}

/**
 * `POST /data/set/{entitySetId}`
 *
 * Gets all data for the given EntitySet UUID with respect to the given filters.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID[]} propertyTypeIds
 * @param {UUID[]} entityKeyIds
 * @returns {Promise<Object[]>} - a Promise that will resolve with the EntitySet data as its fulfillment value
 *
 * @example
 * DataApi.getEntitySetData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["8f79e123-3411-4099-a41f-88e5d22d0e8d"],
 *   ["0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"]
 * );
 */
export function getEntitySetData(entitySetId :UUID, propertyTypeIds :UUID[], entityKeyIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const entitySetSelection = {};

  if (isValidUuidArray(propertyTypeIds)) {
    entitySetSelection.properties = Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();
  }
  else if (!isUndefined(propertyTypeIds) && !isEmptyArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  if (isValidUuidArray(entityKeyIds)) {
    entitySetSelection.ids = Set().withMutations((set :Set<UUID>) => {
      entityKeyIds.forEach((entityKeyId :UUID) => {
        set.add(entityKeyId);
      });
    }).toJS();
  }
  else if (!isUndefined(entityKeyIds) && !isEmptyArray(entityKeyIds)) {
    errorMsg = 'invalid parameter: entityKeyIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, entityKeyIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/${entitySetId}`, entitySetSelection)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * Returns the URL to be used for a direct file download for all data for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {string} fileType
 * @returns {string} - the direct file download URL
 *
 * @example
 * DataApi.getEntitySetDataFileUrl("ec6865e6-e60e-424b-a071-6a9c1603d735", "json");
 */
export function getEntitySetDataFileUrl(entitySetId :UUID, fileType :string) :?string {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return null;
  }

  // TODO: create an allowed file type constants map, and validate fileType against it

  if (!isNonEmptyString(fileType)) {
    errorMsg = 'invalid parameter: fileType must be a non-empty string';
    LOG.error(errorMsg, fileType);
    return null;
  }

  return `${getApiBaseUrl(DATA_API)}/${SET_PATH}/${entitySetId}?${FILE_TYPE}=${fileType.toLowerCase()}`;
}

/**
 * `GET /data/{entitySetId}/count`
 *
 * Returns the number of entities in the specified entity set
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @return {Promise} - a Promise that resolves with the entity count
 *
 * @example
 * DataApi.getEntitySetSize("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e")
 */
export function getEntitySetSize(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .get(`/${entitySetId}/${COUNT_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /data/set/{entitySetId}`
 *
 * // TODO: description
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {Object} entities
 * @param {Boolean} partial
 * @return {Promise} - a Promise that resolves with the count of entities that were updated
 *
 * @example
 * DataApi.replaceEntityData(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   {
 *     "ec6865e6-e60e-424b-a071-6a9c1603d735": {
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d": ["value_1", "value_2"],
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8": ["value_3", "value_4"]
 *     }
 *   },
 *   false
 * );
 */
export function replaceEntityData(entitySetId :UUID, entities :Object, partial :boolean = false) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty object';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  const ids :any[] = Object.keys(entities);

  // validate all keys are UUIDs
  for (let index1 = 0; index1 < ids.length; index1 += 1) {
    const id :any = ids[index1];
    if (!isValidUuid(id)) {
      errorMsg = 'invalid parameter: entities must be a non-empty object where all keys are UUIDs';
      LOG.error(errorMsg, id);
      return Promise.reject(errorMsg);
    }
  }

  // validate all values are multimaps
  // TODO: validate SetMultimap
  for (let index2 = 0; index2 < ids.length; index2 += 1) {
    const value :any = entities[ids[index2]];
    if (!isValidMultimap(value, isValidUuid)) {
      errorMsg = 'invalid parameter: entities must be a non-empty object where all values are multimaps';
      LOG.error(errorMsg, value);
      return Promise.reject(errorMsg);
    }
  }

  const replaceType :string = (partial === true) ? EntityUpdateTypes.PartialReplace : EntityUpdateTypes.Replace;

  return getApiAxiosInstance(DATA_API)
    .put(`/${SET_PATH}/${entitySetId}?${TYPE_PATH}=${replaceType}`, entities)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /data/set/{entitySetId}/{entityKeyId}`
 *
 * Replaces the entity data for the given entityKeyId in the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @param {Object} entity
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.replaceEntityInEntitySet(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "8f79e123-3411-4099-a41f-88e5d22d0e8d": ["value_1", "value_2"],
 *     "fae6af98-2675-45bd-9a5b-1619a87235a8": ["value_3", "value_4"]
 *   }
 * );
 */
export function replaceEntityInEntitySet(entitySetId :UUID, entityKeyId :UUID, entity :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityKeyId)) {
    errorMsg = 'invalid parameter: entityKeyId must be a valid UUID';
    LOG.error(errorMsg, entityKeyId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate SetMultimap
  if (!isValidMultimap(entity, isValidUuid)) {
    errorMsg = 'invalid parameter: entity must be a non-empty multimap';
    LOG.error(errorMsg, entity);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .put(`/${SET_PATH}/${entitySetId}/${entityKeyId}`, entity)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /data/set/{entitySetId}/{entityKeyId}`
 *
 * Replaces the entity data for the given entityKeyId in the EntitySet with the given entitySetId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @param {Object} entity
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataApi.replaceEntityInEntitySetUsingFqns(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "namespace1.name1": ["value_1", "value_2"],
 *     "namespace2.name2": ["value_3", "value_4"]
 *   }
 * );
 */
export function replaceEntityInEntitySetUsingFqns(entitySetId :UUID, entityKeyId :UUID, entity :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityKeyId)) {
    errorMsg = 'invalid parameter: entityKeyId must be a valid UUID';
    LOG.error(errorMsg, entityKeyId);
    return Promise.reject(errorMsg);
  }

  // TODO: validate SetMultimap
  if (!isValidMultimap(entity, FullyQualifiedName.isValid)) {
    errorMsg = 'invalid parameter: entity must be a non-empty object';
    LOG.error(errorMsg, entity);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}/${entitySetId}/${entityKeyId}`, entity)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
