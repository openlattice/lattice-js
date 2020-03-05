/*
 * @flow
 */

/**
 * EntitySetsApi gives access to OpenLattice's REST API for interacting with EntitySets.
 *
 * @module EntitySetsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.EntitySetsApi.get...
 *
 * @example
 * import { EntitySetsApi } from 'lattice';
 * // EntitySetsApi.get...
 */

import { Set } from 'immutable';

import Logger from '../utils/Logger';
import { EntitySet, isValidEntitySetArray } from '../models/EntitySet';
import { ENTITY_SETS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
import { getApiAxiosInstance } from '../utils/axios';
import { isDefined, isNonEmptyString, isNonEmptyStringArray } from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';

const LOG = new Logger('EntitySetsApi');

/**
 * `POST /entity-sets`
 *
 * Creates new EntitySet definitions if they don't exist.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {EntitySet[]} entitySets
 * @return {Promise<Map<string, UUID>>} - a Promise that will resolve with a Map as its fulfillment value, where
 * the key is the EntitySet name and the value is the newly-created EntitySet UUID
 *
 * @example
 * EntitySetsApi.createEntitySets(
 *   [
 *     {
 *       "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *       "type": { "namespace": "LATTICE", "name": "MyEntity" },
 *       "name": "MyEntities",
 *       "title": "My Entities",
 *       "description": "a collection of MyEntity EntityTypes",
 *     }
 *   ]
 * );
 */
function createEntitySets(entitySets :EntitySet[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidEntitySetArray(entitySets)) {
    errorMsg = 'invalid parameter: entitySets must be a non-empty array of valid EntitySets';
    LOG.error(errorMsg, entitySets);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set() - entitySets needs to be Set<EntitySet>

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post('/', entitySets)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /entity-sets/all/{uuid}`
 *
 * Deletes the EntitySet definition for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntitySetsApi.deleteEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .delete(`/${ALL_PATH}/${entitySetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets`
 *
 * Gets all EntitySet definitions.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @return {Promise<EntitySet[]>} - a Promise that will resolve with all EntitySet definitions
 *
 * @example
 * EntitySetsApi.getAllEntitySets();
 */
function getAllEntitySets() :Promise<*> {

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets/all/{uuid}`
 *
 * Gets the EntitySet definition for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @return {Promise<EntitySet>} - a Promise that will resolve with the EntitySet definition as its fulfillment value
 *
 * @example
 * EntitySetsApi.getEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${ALL_PATH}/${entitySetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets/ids/{name}`
 *
 * Gets the EntitySet UUID for the given EntitySet name.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {string} entitySetName
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntitySetsApi.getEntitySetId("MyEntitySet");
 */
function getEntitySetId(entitySetName :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(entitySetName)) {
    errorMsg = 'invalid parameter: entitySetName must be a non-empty string';
    LOG.error(errorMsg, entitySetName);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${IDS_PATH}/${entitySetName}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /entity-sets/ids`
 *
 * Gets the EntitySet UUIDs for the given EntitySet names.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {string} entitySetName
 * @return {Promise<Map<String, UUID>>} - a Promise that will resolve with the id mapping as its fulfillment value
 *
 * @example
 * EntitySetsApi.getEntitySetIds(["EntitySet1", "EntitySet2"]);
 */
function getEntitySetIds(entitySetNames :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyStringArray(entitySetNames)) {
    errorMsg = 'invalid parameter: entitySetNames must be a non-empty array of strings';
    LOG.error(errorMsg, entitySetNames);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post(`/${IDS_PATH}`, entitySetNames)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets/all/{entitySetId}/metadata`
 * `GET /entity-sets/all/{entitySetId}/properties/{propertyTypeId}`
 *
 * The call returns all PropertyType metadata for the given EntitySet id. If a PropertyType id is given, the call
 * returns only the PropertyType metadata matching the given PropertyType id for the given EntitySet id.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @param {UUID} propertyTypeId
 * @return {Promise}
 *
 * @example
 * EntitySetsApi.getPropertyTypeMetaDataForEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 * EntitySetsApi.getPropertyTypeMetaDataForEntitySet(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function getPropertyTypeMetaDataForEntitySet(entitySetId :UUID, propertyTypeId ?:UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isDefined(propertyTypeId)) {
    return getApiAxiosInstance(ENTITY_SETS_API)
      .get(`/${ALL_PATH}/${entitySetId}/${METADATA_PATH}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (isDefined(propertyTypeId) && !isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${ALL_PATH}/${entitySetId}/${PROPERTIES_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /entity-sets/all/metadata`
 *
 * The call returns all PropertyType metadata for all EntitySets matching the given EntitySet ids.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID[]} entitySetIds
 * @return {Promise}
 *
 * @example
 * EntitySetsApi.getPropertyTypeMetaDataForEntitySets(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
function getPropertyTypeMetaDataForEntitySets(entitySetIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUIDArray(entitySetIds)) {
    errorMsg = 'invalid parameter: entitySetIds must be a valid UUID array';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  const entitySetIdsSet :UUID[] = Set(entitySetIds).toJS();
  return getApiAxiosInstance(ENTITY_SETS_API)
    .post(`/${ALL_PATH}/${METADATA_PATH}`, entitySetIdsSet)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  createEntitySets,
  deleteEntitySet,
  getAllEntitySets,
  getEntitySet,
  getEntitySetId,
  getEntitySetIds,
  getPropertyTypeMetaDataForEntitySet,
  getPropertyTypeMetaDataForEntitySets,
};
