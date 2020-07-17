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
import { ENTITY_SETS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  BY_ID_PATH,
  BY_NAME_PATH,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH,
} from '../constants/UrlConstants';
import { EntitySet, isValidEntitySet } from '../models/EntitySet';
import { isDefined, isNonEmptyArray, isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('EntitySetsApi');

/**
 * `POST /entity-sets`
 *
 * Creates new EntitySet definitions if they don't exist.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {EntitySet[]} entitySets
 * @returns {Promise<Map<string, UUID>>} - a Promise that resolves with a mapping where the key is the EntitySet name
 * and the value is the newly-created EntitySet id
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

  if (!isNonEmptyArray(entitySets)) {
    errorMsg = 'invalid parameter: entitySets must be a non-empty array';
    LOG.error(errorMsg, entitySets);
    return Promise.reject(errorMsg);
  }

  if (!entitySets.every(isValidEntitySet)) {
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
 * `DELETE /entity-sets/all/{entitySetId}`
 *
 * Deletes the EntitySet definition for the given EntitySet id.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntitySetsApi.deleteEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteEntitySet(entitySetId :UUID) :Promise<void> {

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
 * @returns {Promise<EntitySet[]>} - a Promise that resolves with all EntitySet definitions
 *
 * @example
 * EntitySetsApi.getAllEntitySets();
 */
function getAllEntitySets() :Promise<EntitySet[]> {

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets/all/{entitySetId}`
 *
 * Gets the EntitySet definition for the given EntitySet id.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @returns {Promise<EntitySet>} - a Promise that resolves with the EntitySet definition
 *
 * @example
 * EntitySetsApi.getEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getEntitySet(entitySetId :UUID) :Promise<EntitySet> {

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
 * `GET /entity-sets/ids/{entitySetName}`
 *
 * Gets the EntitySet id for the given EntitySet name.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {string} entitySetName
 * @returns {Promise<UUID>} - a Promise that resolves with the EntitySet id
 *
 * @example
 * EntitySetsApi.getEntitySetId("MyEntitySet");
 */
function getEntitySetId(entitySetName :string) :Promise<UUID> {

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
 * Gets the EntitySet ids for the given EntitySet names.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {string[]} entitySetName
 * @returns {Promise<Map<string, UUID>>} - a Promise that resolves with a mapping where the key is the EntitySet name
 * and the value is the EntitySet id
 *
 * @example
 * EntitySetsApi.getEntitySetIds(["EntitySet1", "EntitySet2"]);
 */
function getEntitySetIds(entitySetNames :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyArray(entitySetNames)) {
    errorMsg = 'invalid parameter: "entitySetNames" must be a non-empty array';
    LOG.error(errorMsg, entitySetNames);
    return Promise.reject(errorMsg);
  }

  if (!entitySetNames.every(isNonEmptyString)) {
    errorMsg = 'invalid parameter: "entitySetNames" must be an array of strings';
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
 * `POST /entity-sets/by-id`
 * `POST /entity-sets/by-name`
 *
 * Gets the EntitySet definitions for the given EntitySet ids or names.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID[] | string[]} idsOrNames
 * @returns {Promise} - a Promise that resolves with the EntitySet definitions
 *
 * @example
 * EntitySetsApi.getEntitySets(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 * EntitySetsApi.getEntitySets(["EntitySet1", "EntitySet2"]);
 */
function getEntitySets(idsOrNames :UUID[] | string[]) :Promise<EntitySet[]> {

  let errorMsg = '';

  if (!isNonEmptyArray(idsOrNames)) {
    errorMsg = 'invalid parameter: "idsOrNames" must be a non-empty array';
    LOG.error(errorMsg, idsOrNames);
    return Promise.reject(errorMsg);
  }

  const idsOrNamesSet = Set(idsOrNames);

  // isValidUUID check must be first since UUIDs are strings
  if (idsOrNamesSet.every(isValidUUID)) {
    return getApiAxiosInstance(ENTITY_SETS_API)
      .post(`/${BY_ID_PATH}`, idsOrNamesSet.toJS())
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (idsOrNamesSet.every(isNonEmptyString)) {
    return getApiAxiosInstance(ENTITY_SETS_API)
      .post(`/${BY_NAME_PATH}`, idsOrNamesSet.toJS())
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  errorMsg = 'invalid parameter: "idsOrNames" must be an array of EntitySet ids or names';
  LOG.error(errorMsg, idsOrNames);
  return Promise.reject(errorMsg);
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
 * @returns {Promise}
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
 * @returns {Promise}
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
  getEntitySets,
  getPropertyTypeMetaDataForEntitySet,
  getPropertyTypeMetaDataForEntitySets,
};
