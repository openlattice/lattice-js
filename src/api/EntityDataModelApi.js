/*
 * @flow
 */

/**
 * EntityDataModelApi gives access to OpenLattice's REST API for interacting with EntityDataModel (EDM) schemas.
 *
 * @module EntityDataModelApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.EntityDataModelApi.get...
 *
 * @example
 * import { EntityDataModelApi } from 'lattice';
 * // EntityDataModelApi.get...
 */

import has from 'lodash/has';

import FQN from '../models/FQN';
import Logger from '../utils/Logger';
import { EDM_API } from '../constants/ApiNames';
import {
  ASSOCIATION_TYPE_PATH,
  DST_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  SRC_PATH,
} from '../constants/UrlConstants';
import { ActionTypes } from '../constants/types';
import { AssociationType, isValidAssociationType } from '../models/AssociationType';
import { EntityType, isValidEntityType } from '../models/EntityType';
import { PropertyType, isValidPropertyType } from '../models/PropertyType';
import { Schema, isValidSchema } from '../models/Schema';
import { isNonEmptyObject, isNonEmptyString, isNonEmptyStringArray } from '../utils/LangUtils';
import { isValidUUID, validateNonEmptyArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('EntityDataModelApi');

/**
 * `PUT /edm/association/type/{associationTypeId}/dst/{entityTypeId}`
 *
 * Updates the destination EntityTypes for the given AssociationType id by adding the given EntityType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addDestinationEntityTypeToAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function addDestinationEntityTypeToAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DST_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /edm/entity/type/{uuid}/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType id by adding the given PropertyType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addPropertyTypeToEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function addPropertyTypeToEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: "entityTypeId" must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: "propertyTypeId" must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /edm/association/type/{uuid}/src/{uuid}`
 *
 * Updates the source EntityTypes for the given AssociationType id by adding the given EntityType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addSourceEntityTypeToAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function addSourceEntityTypeToAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${SRC_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/association/type`
 *
 * Creates a new AssociationType definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {AssociationType} associationType
 * @returns {Promise<UUID>} - a Promise that resolves with the newly-created AssociationType id
 *
 * @example
 * EntityDataModelApi.createAssociationType(
 *   {
 *     "entityType": { ... },
 *     "src": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
 *     "dst": ["4b08e1f9-4a00-4169-92ea-10e377070220"],
 *     "bidirectional": true
 *   }
 * );
 */
function createAssociationType(associationType :AssociationType) :Promise<UUID> {

  let errorMsg = '';

  if (!isValidAssociationType(associationType)) {
    errorMsg = 'invalid parameter: "associationType" must be a valid AssociationType';
    LOG.error(errorMsg, associationType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ASSOCIATION_TYPE_PATH}`, associationType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/entity/type`
 *
 * Creates a new EntityType definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {EntityType} entityType
 * @returns {Promise<UUID>} - a Promise that resolves with the newly-created EntityType id
 *
 * @example
 * EntityDataModelApi.createEntityType(
 *   {
 *     "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "type": { "namespace": "LATTICE", "name": "MyEntity" },
 *     "title": "title",
 *     "description": "description",
 *     "schemas": [
 *       { "namespace": "LATTICE", "name": "MySchema" }
 *     ],
 *     "key": [
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085"
 *     ],
 *     "properties": [
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ],
 *     "baseType": "4b08e1f9-4a00-4169-92ea-10e377070220",
 *     "category": "EntityType"
 *   }
 * );
 */
function createEntityType(entityType :EntityType) :Promise<UUID> {

  let errorMsg = '';

  if (!isValidEntityType(entityType)) {
    errorMsg = 'invalid parameter: "entityType" must be a valid EntityType';
    LOG.error(errorMsg, entityType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENTITY_TYPE_PATH}`, entityType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/property/type`
 *
 * Creates a new PropertyType definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {PropertyType} propertyType
 * @returns {Promise<UUID>} - a Promise that resolves with the newly-created PropertyType id
 *
 * @example
 * EntityDataModelApi.createPropertyType(
 *   {
 *     "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "type": { "namespace": "LATTICE", "name": "MyProperty" },
 *     "title": "title",
 *     "description": "description",
 *     "schemas": [
 *       { "namespace": "LATTICE", "name": "MySchema" }
 *     ],
 *     "datatype": "String",
 *     "pii": false,
 *     "analyzer": "STANDARD"
 *   }
 * );
 */
function createPropertyType(propertyType :PropertyType) :Promise<UUID> {

  let errorMsg = '';

  if (!isValidPropertyType(propertyType)) {
    errorMsg = 'invalid parameter: "propertyType" must be a valid PropertyType';
    LOG.error(errorMsg, propertyType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${PROPERTY_TYPE_PATH}`, propertyType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/schema`
 *
 * Creates a new Schema definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {Schema} schema
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.createSchema(
 *   {
 *     "fqn": { "namespace": "LATTICE", "name": "MySchema" },
 *     "propertyTypes": [],
 *     "entityTypes": []
 *   }
 * );
 */
function createSchema(schema :Schema) :Promise<void> {

  let errorMsg = '';

  if (!isValidSchema(schema)) {
    errorMsg = 'invalid parameter: "schema" must be a valid Schema';
    LOG.error(errorMsg, schema);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${SCHEMA_PATH}`, schema)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/association/type/{uuid}`
 *
 * Deletes the AssociationType definition for the given AssociationType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteAssociationType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteAssociationType(associationTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: "associationTypeId" must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/entity/type/{uuid}`
 *
 * Deletes the EntityType definition for the given EntityType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deleteEntityType(entityTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: "entityTypeId" must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/property/type/{uuid}`
 *
 * Deletes the PropertyType definition for the given PropertyType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deletePropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function deletePropertyType(propertyTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: "propertyTypeId" must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/entity/type`
 *
 * Gets all AssociationType EntityType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<EntityType[]>} - a Promise that resolves with the EntityType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllAssociationEntityTypes();
 */
function getAllAssociationEntityTypes() :Promise<EntityType[]> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type`
 *
 * Gets all AssociationType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<AssociationType[]>} - a Promise that resolves with the AssociationType definitions
 *
 * @example
 * EntityDataModelApi.getAllAssociationTypes();
 */
function getAllAssociationTypes() :Promise<AssociationType[]> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/entity/type`
 *
 * Gets all EntityType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<EntityType[]>} - a Promise that resolves with the EntityType definitions
 *
 * @example
 * EntityDataModelApi.getAllEntityTypes();
 */
function getAllEntityTypes() :Promise<EntityType[]> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/property/type`
 *
 * Gets all PropertyType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<PropertyType[]>} - a Promise that resolves with the PropertyType definitions
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypes();
 */
function getAllPropertyTypes() :Promise<PropertyType[]> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/schema`
 *
 * Gets all Schema definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<Schema[]>} - a Promise that resolves with the Schema definitions
 *
 * @example
 * EntityDataModelApi.getAllSchemas();
 */
function getAllSchemas() :Promise<Schema[]> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/{uuid}`
 *
 * Gets the AssociationType definition for the given AssociationType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @returns {Promise<AssociationType>} - a Promise that resolves with the AssociationType definition
 *
 * @example
 * EntityDataModelApi.getAssociationType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getAssociationType(associationTypeId :UUID) :Promise<AssociationType> {

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: "associationTypeId" must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm`
 *
 * Gets the entire Entity Data Model.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @returns {Promise<Object>} - a Promise that resolves with the Entity Data Model
 *
 * @example
 * EntityDataModelApi.getEntityDataModel();
 */
function getEntityDataModel() :Promise<Object> {

  return getApiAxiosInstance(EDM_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm`
 *
 * Gets the Entity Data Model, filtered by the given projection.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {Object[]} projection - a set of objects containing an id, a SecurableType, and a set of SecurableTypes
 * @returns {Promise<Object>} - a Promise that resolves with the filtered Entity Data Model
 *
 * @example
 * EntityDataModelApi.getEntityDataModelProjection(
 *   [
 *     {
 *       "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *       "type": "EntitySet",
 *       "include": [
 *         "EntitySet",
 *         "EntityType",
 *         "PropertyTypeInEntitySet"
 *       ]
 *     }
 *   ]
 * );
 */
function getEntityDataModelProjection(projection :Object[]) :Promise<*> {

  let errorMsg = '';

  // TODO: add better validation
  if (!validateNonEmptyArray(projection, isNonEmptyObject)) {
    errorMsg = 'invalid parameter: "projection" must be an array of objects';
    LOG.error(errorMsg, projection);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post('/', projection)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/entity/type/{uuid}`
 *
 * Gets the EntityType definition for the given EntityType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @returns {Promise<EntityType>} - a Promise that resolves with the EntityType definition
 *
 * @example
 * EntityDataModelApi.getEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getEntityType(entityTypeId :UUID) :Promise<EntityType> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: "entityTypeId" must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/property/type/{uuid}`
 *
 * Gets the PropertyType definition for the given PropertyType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @returns {Promise<PropertyType>} - a Promise that resolves with the PropertyType definition
 *
 * @example
 * EntityDataModelApi.getPropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getPropertyType(propertyTypeId :UUID) :Promise<PropertyType> {

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: "propertyTypeId" must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/schema/{namespace}/{name}`
 *
 * Gets the Schema definition for the given Schema FQN.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} schema
 * @returns {Promise<Schema>} - a Promise that resolves with the Schema definition
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { "namespace": "LATTICE", "name": "MySchema" }
 * );
 */
function getSchema(schemaFQN :FQN) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(schemaFQN)) {
    errorMsg = 'invalid parameter: "schemaFQN" must be a valid FQN';
    LOG.error(errorMsg, schemaFQN);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = schemaFQN;

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/association/type/{associationTypeId}/dst/{entityTypeId}`
 *
 * Updates the destination EntityTypes for the given AssociationType id by removing the given EntityType id.
 * UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removeDestinationEntityTypeFromAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function removeDestinationEntityTypeFromAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DST_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/entity/type/{uuid}/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType id by removing the given PropertyType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removePropertyTypeFromEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function removePropertyTypeFromEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/association/type/{associationTypeId}/src/{entityTypeId}`
 *
 * Updates the source EntityTypes for the given AssociationType id by removing the given EntityType id.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removeSourceEntityTypeFromAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
function removeSourceEntityTypeFromAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${SRC_PATH}/${entityTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/entity/type/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType id with the given metadata.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {Object} metadata
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updateEntityTypeMetaData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "type": { "namespace": "LATTICE", "name": "UpdatedEntity" },
 *     "name": "MyEntity",
 *     "title": "MyEntity",
 *     "description": "MyEntity description",
 *     "contacts": ["support@openlattice.com"]
 *   }
 * );
 */
function updateEntityTypeMetaData(entityTypeId :UUID, metadata :Object) :Promise<void> {

  // TODO: create data model: MetaUpdate

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: metadata must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'type') && !FQN.isValid(metadata.type)) {
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

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_TYPE_PATH}/${entityTypeId}`, metadata)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/property/type/{uuid}`
 *
 * Updates the PropertyType definition for the given PropertyType UUID with the given metadata.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @param {Object} metadata
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updatePropertyTypeMetaData(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "type": { "namespace": "LATTICE", "name": "UpdatedProperty" },
 *     "name": "MyProperty",
 *     "title": "MyProperty",
 *     "description": "MyProperty description",
 *     "contacts": ["support@openlattice.com"]
 *   }
 * );
 */
function updatePropertyTypeMetaData(propertyTypeId :UUID, metadata :Object) :Promise<void> {

  // TODO: create data model: MetaDataUpdate

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: metadata must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  if (has(metadata, 'type') && !FQN.isValid(metadata.type)) {
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

  return getApiAxiosInstance(EDM_API)
    .patch(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`, metadata)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/schema/{namespace}/{name}`
 *
 * Updates the Schema definition.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {Schema} schema
 * @returns {Promise<void>} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updateSchema(
 *   {
 *     "entityTypes": [{ ... }],
 *     "fqn": { "namespace": "LATTICE", "name": "MySchema" },
 *     "propertyTypes": [{ ... }],
 *   }
 * )
 */
function updateSchema(schema :Schema) :Promise<void> {

  let errorMsg = '';

  if (!isValidSchema(schema)) {
    errorMsg = 'invalid parameter: "schema" must be a valid Schema';
    LOG.error(errorMsg, schema);
    return Promise.reject(errorMsg);
  }

  const data = {
    action: ActionTypes.REPLACE,
    entityTypes: schema.entityTypes.map((entityType) => entityType.id),
    propertyTypes: schema.propertyTypes.map((propertyType) => propertyType.id),
  };

  return getApiAxiosInstance(EDM_API)
    .patch(`/${SCHEMA_PATH}/${schema.fqn.namespace}/${schema.fqn.name}`, data)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  addDestinationEntityTypeToAssociationType,
  addPropertyTypeToEntityType,
  addSourceEntityTypeToAssociationType,
  createAssociationType,
  createEntityType,
  createPropertyType,
  createSchema,
  deleteAssociationType,
  deleteEntityType,
  deletePropertyType,
  getAllAssociationEntityTypes,
  getAllAssociationTypes,
  getAllEntityTypes,
  getAllPropertyTypes,
  getAllSchemas,
  getAssociationType,
  getEntityDataModel,
  getEntityDataModelProjection,
  getEntityType,
  getPropertyType,
  getSchema,
  removeDestinationEntityTypeFromAssociationType,
  removePropertyTypeFromEntityType,
  removeSourceEntityTypeFromAssociationType,
  updateEntityTypeMetaData,
  updatePropertyTypeMetaData,
  updateSchema,
};
