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

import has from 'lodash/has';

import FullyQualifiedName from '../models/FullyQualifiedName';
import Logger from '../utils/Logger';

import EntitySet, { isValidEntitySetArray } from '../models/EntitySet';

import { ENTITY_SETS_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isValidUuid, isValidUuidArray } from '../utils/ValidationUtils';

import {
  ALL,
  IDS_PATH,
  METADATA_PATH,
  PROPERTIES_PATH
} from '../constants/UrlConstants';

import {
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';

const LOG = new Logger('EntitySetsApi');

/*
 *
 * EntitySetsApi APIs
 *
 */


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
export function getAllEntitySets() :Promise<*> {

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get('/')
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

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
export function createEntitySets(entitySets :EntitySet[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidEntitySetArray(entitySets)) {
    errorMsg = 'invalid parameter: entitySets must be a non-empty array of valid EntitySets';
    LOG.error(errorMsg, entitySets);
    return Promise.reject(errorMsg);
  }

  // TODO: Immutable.Set() - entitySets needs to be Set<EntitySet>

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post('/', entitySets)
    .then(axiosResponse => axiosResponse.data)
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
export function getEntitySetIds(entitySetNames :string[]) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyStringArray(entitySetNames)) {
    errorMsg = 'invalid parameter: entitySetNames must be a non-empty array of strings';
    LOG.error(errorMsg, entitySetNames);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post(`/${IDS_PATH}`, entitySetNames)
    .then(axiosResponse => axiosResponse.data)
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
export function getEntitySetId(entitySetName :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(entitySetName)) {
    errorMsg = 'invalid parameter: entitySetName must be a non-empty string';
    LOG.error(errorMsg, entitySetName);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${IDS_PATH}/${entitySetName}`)
    .then(axiosResponse => axiosResponse.data)
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
export function deleteEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .delete(`/${ALL}/${entitySetId}`)
    .then(axiosResponse => axiosResponse.data)
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
export function getEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${ALL}/${entitySetId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /entity-sets/all/metadata`
 *
 * Returns all property type metadata for the requested entity sets
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID[]} entitySetIds
 * @return {Promise}
 *
 * @example
 * EntitySetsApi.getPropertyMetadataForEntitySets(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
export function getPropertyMetadataForEntitySets(entitySetIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuidArray(entitySetIds)) {
    errorMsg = 'invalid parameter: entitySetIds must be a valid UUID array';
    LOG.error(errorMsg, entitySetIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post(`/${ALL}/${METADATA_PATH}`, entitySetIds)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}


/**
 * `GET /entity-sets/all/{uuid}/metadata`
 *
 * Returns all property type metadata for an entity set
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @return {Promise}
 *
 * @example
 * EntitySetsApi.getAllEntitySetPropertyMetadata("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllEntitySetPropertyMetadata(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${ALL}/${entitySetId}/${METADATA_PATH}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /entity-sets/all/{uuid}/properties/{uuid}`
 *
 * Returns specified property type metadata for an entity set
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @param {UUID} propertyTypeId
 * @return {Promise}
 *
 * @example
 * EntitySetsApi.getEntitySetPropertyMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function getEntitySetPropertyMetadata(entitySetId :UUID, propertyTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .get(`/${ALL}/${entitySetId}/${PROPERTIES_PATH}/${propertyTypeId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}


/**
 * `POST /entity-sets/all/{uuid}/properties/{uuid}`
 *
 * Updates the property type metadata for the given entity set.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @param {UUID} propertyTypeId
 * @param {Object} metadata
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntitySetsApi.updateEntitySetPropertyMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220",
 *   {
 *     "title": "MyPropertyType",
 *     "description": "MyPropertyType description",
 *     "defaultShow": false
 *   }
 * );
 */
export function updateEntitySetPropertyMetadata(
  entitySetId :UUID,
  propertyTypeId :UUID,
  metadata :Object
) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: metadata must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'title') && !isNonEmptyString(metadata.title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, metadata.title);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'description') && !isNonEmptyString(metadata.description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, metadata.description);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .post(`/${ALL}/${entitySetId}/${PROPERTIES_PATH}/${propertyTypeId}`, metadata)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /entity-sets/all/{uuid}/metadata`
 *
 * Updates the EntityType definition for the given EntitySet UUID with the given metadata.
 *
 * @static
 * @memberof lattice.EntitySetsApi
 * @param {UUID} entitySetId
 * @param {Object} metadata
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntitySetsApi.updateEntitySetMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "type": { namespace: "LATTICE", name: "UpdatedEntitySet" },
 *     "name": "MyEntitySet",
 *     "title": "MyEntitySet",
 *     "description": "MyEntitySet description",
 *     "contacts": ["support@openlattice.com"]
 *   }
 * );
 */
export function updateEntitySetMetadata(entitySetId :UUID, metadata :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: metadata must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'type') && !FullyQualifiedName.isValid(metadata.type)) {
    errorMsg = 'invalid parameter: type must be a valid FQN';
    LOG.error(errorMsg, metadata.type);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'name') && !isNonEmptyString(metadata.name)) {
    errorMsg = 'invalid parameter: name must be a non-empty string';
    LOG.error(errorMsg, metadata.name);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'title') && !isNonEmptyString(metadata.title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, metadata.title);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'description') && !isNonEmptyString(metadata.description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, metadata.description);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'contacts') && !isNonEmptyStringArray(metadata.contacts)) {
    errorMsg = 'invalid parameter: contacts must be a non-empty string';
    LOG.error(errorMsg, metadata.contacts);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ENTITY_SETS_API)
    .patch(`/${ALL}/${entitySetId}/${METADATA_PATH}`, metadata)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
