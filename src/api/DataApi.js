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

import Immutable from 'immutable';
import isUndefined from 'lodash/isUndefined';

import Logger from '../utils/Logger';
import { DATA_API } from '../constants/ApiNames';
import { COUNT_PATH, SET_PATH } from '../constants/ApiPaths';
import { FILE_TYPE, SET_ID } from '../constants/UrlConstants';
import { getApiBaseUrl, getApiAxiosInstance } from '../utils/axios';
import { isEmptyArray, isNonEmptyObject, isNonEmptyString } from '../utils/LangUtils';
import { isValidMultimapArray, isValidUuid, isValidUuidArray } from '../utils/ValidationUtils';

const LOG = new Logger('DataApi');

/**
 * `POST /data/entitydata/{entitySetId}`
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
    entitySetSelection.properties = Immutable.Set().withMutations((set :Set<UUID>) => {
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
    entitySetSelection.ids = Immutable.Set().withMutations((set :Set<UUID>) => {
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
 * `POST /data/set?setId={entitySetId}`
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

  if (!isValidMultimapArray(entities)) {
    errorMsg = 'invalid parameter: entities must be a non-empty multimap array';
    LOG.error(errorMsg, entities);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_API)
    .post(`/${SET_PATH}?${SET_ID}=${entitySetId}`, entities)
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
 * `PUT /data/entitydata/{entitySetId}/{entityKeyId}`
 *
 * Replaces the entity values for the specified entityKeyId.
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
 *     "uuid_1a": ["value_1a", "value_1b"],
 *     "uuid_1b": ["value_1c", "value_1d"]
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

  // TODO: validate "entity" structure

  if (!isNonEmptyObject(entity)) {
    errorMsg = 'invalid parameter: entity must be a non-empty object';
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
 * `POST /data/entitydata/update/{entitySetId}/{entityKeyId}`
 *
 * Replaces the entity values for the specified entityKeyId.
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
 *     "namespace1.name1": ["value_1a", "value_1b"],
 *     "namespace2.name2": ["value_1c", "value_1d"]
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

  // TODO: validate "entity" structure

  if (!isNonEmptyObject(entity)) {
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
 * `GET /data/{entitySetId}/{entityKeyId}`
 *
 * Returns a single entity, specified by its entitySetId and entityKeyId.
 *
 * @static
 * @memberof lattice.DataApi
 * @param {UUID} entitySetId
 * @param {UUID} entityKeyId
 * @return {Promise} - a Promise that resolves with the requested entity
 *
 * @example
 *  * DataApi.getEntity("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e", "ec6865e6-e60e-424b-a071-6a9c1603d735")
  */
export function getEntity(entitySetId :UUID, entityKeyId :UUID) :Promise<*> {

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


// TODO: createAssociationData()
// TODO: storeAssociationData()
