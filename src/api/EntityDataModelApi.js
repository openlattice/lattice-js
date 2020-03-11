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
import isUndefined from 'lodash/isUndefined';
import { Set } from 'immutable';

import FQN from '../models/FQN';
import Logger from '../utils/Logger';
import { EDM_API } from '../constants/ApiNames';
import {
  ASSOCIATION_TYPE_PATH,
  COMPLEX_TYPE_PATH,
  DETAILED_PATH,
  DIFF_PATH,
  DST_PATH,
  ENTITY_TYPE_PATH,
  ENUM_TYPE_PATH,
  FORCE_PATH,
  HIERARCHY_PATH,
  IDS_PATH,
  NAMESPACE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  SRC_PATH,
  VERSION_PATH,
} from '../constants/UrlConstants';
import { EntityType, isValidEntityType } from '../models/EntityType';
import { PropertyType, isValidPropertyType } from '../models/PropertyType';
import { Schema, isValidSchema } from '../models/Schema';
import {
  isEmptyArray,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance, getApiBaseUrl } from '../utils/axios';

const LOG = new Logger('EntityDataModelApi');

const UpdateSchemaRequestActions :{[key :string] :string} = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  REPLACE: 'REPLACE'
};

/*
 *
 * EntityDataModel APIs
 *
 */

/**
 * `GET /edm`
 *
 * Gets the entire Entity Data Model.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<Object>} - a Promise that will resolve with the Entity Data Model as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityDataModel();
 */
export function getEntityDataModel() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/diff`
 *
 * Compares the given Entity Data Model against the existing Entity Data Model, and gets the difference between them
 * in terms of PropertyTypes, EntityTypes, AssociationTypes, and Schemas.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<Object>} - a Promise that will resolve with the Entity Data Model diff as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityDataModelDiff({
 *   "associationTypes": [],
 *   "entityTypes": [],
 *   "namespaces": [],
 *   "propertyTypes": [],
 *   "schemas": [],
 *   "version": "",
 * });
 */
export function getEntityDataModelDiff(edm :Object) :Promise<*> {

  // TODO: add better validation
  // TODO: create EntityDataModel model

  let errorMsg = '';

  if (!isNonEmptyObject(edm)) {
    errorMsg = 'invalid parameter: edm must be a non-empty object';
    LOG.error(errorMsg, edm);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .post(`/${DIFF_PATH}`, edm)
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
 * @param {Object[]} projection - a Set of objects containing an ID, a SecurableType, and a Set of SecurableTypes
 * @return {Promise<Object>} - a Promise that will resolve with the filtered Entity Data Model as its fulfillment value
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
export function getEntityDataModelProjection(projection :Object[]) :Promise<*> {

  // TODO: add better validation
  // TODO: create data models

  let errorMsg = '';

  if (!isNonEmptyArray(projection)) {
    errorMsg = 'invalid parameter: projection must be a non-empty object array';
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
 * `GET /edm/version`
 *
 * Gets the current version of the Entity Data Model.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<UUID>} - a Promise that will resolve with the Entity Data Model version as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityDataModelVersion();
 */
export function getEntityDataModelVersion() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${VERSION_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm`
 *
 * Updates the existing Entity Data Model with the relevant elements from the given Entity Data Model
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updateEntityDataModel({
 *   "associationTypes": [],
 *   "entityTypes": [],
 *   "namespaces": [],
 *   "propertyTypes": [],
 *   "schemas": [],
 *   "version": "",
 * });
 */
export function updateEntityDataModel(edm :Object) :Promise<*> {

  // TODO: add better validation
  // TODO: create EntityDataModel model

  let errorMsg = '';

  if (!isNonEmptyObject(edm)) {
    errorMsg = 'invalid parameter: edm must be a non-empty object';
    LOG.error(errorMsg, edm);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .patch('/', edm)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * Schema APIs
 *
 */

/**
 * `GET /edm/schema/{namespace}/{name}`
 *
 * Gets the Schema definition for the given Schema FQN.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} schema
 * @return {Promise<Schema>} - a Promise that will resolve with the Schema definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { "namespace": "LATTICE", "name": "MySchema" }
 * );
 */
export function getSchema(schemaFQN :FQN) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(schemaFQN)) {
    errorMsg = 'invalid parameter: schemaFQN must be a valid FQN';
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
 * `GET /edm/schema`
 *
 * Gets all Schema definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<Schema[]>} - a Promise that will resolve with all Schema definitions
 *
 * @example
 * EntityDataModelApi.getAllSchemas();
 */
export function getAllSchemas() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/schema/{namespace}`
 *
 * Gets all Schema definitions under the given namespace.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {string} namespace
 * @return {Promise<Schema[]>} - a Promise that will resolve with the Schema definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllSchemasInNamespace("LATTICE");
 */
export function getAllSchemasInNamespace(namespace :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(namespace)) {
    errorMsg = 'invalid parameter: namespace must be a non-empty string';
    LOG.error(errorMsg, namespace);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * Generates the URL to be used for a direct file download for the given Schema FQN formatted as the given file type.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} schemaFQN
 * @param {string} fileType
 * @returns {string} - the direct file download URL
 *
 * @example
 * EntityDataModelApi.getSchemaFormatted(
 *   { "namespace": "LATTICE", "name": "MySchema" },
 *   "json"
 * );
 */
export function getSchemaFileUrl(schemaFQN :FQN, fileType :string) :?string {

  let errorMsg = '';

  if (!FQN.isValid(schemaFQN)) {
    errorMsg = 'invalid parameter: schemaFQN must be a valid FQN';
    LOG.error(errorMsg, schemaFQN);
    return null;
  }

  if (!isNonEmptyString(fileType)) {
    errorMsg = 'invalid parameter: fileType must be a non-empty string';
    LOG.error(errorMsg, fileType);
    return null;
  }

  const { namespace, name } = schemaFQN;
  return `${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}/${namespace}/${name}?fileType=${fileType.toLowerCase()}`;
}

/**
 * `POST /edm/schema`
 *
 * Creates a new Schema definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {Schema} schema
 * @return {Promise} - a Promise that resolves without a value
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
export function createSchema(schema :Schema) :Promise<*> {

  let errorMsg = '';

  if (!isValidSchema(schema)) {
    errorMsg = 'invalid parameter: schema must be a valid Schema';
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
 * `PUT /edm/schema/{namespace}/{name}`
 *
 * Creates a new empty Schema definition for the given Schema FQN, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} schemaFQN
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.createEmptySchema(
 *   { "namespace": "LATTICE", "name": "MySchema" }
 * );
 */
export function createEmptySchema(schemaFQN :FQN) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(schemaFQN)) {
    errorMsg = 'invalid parameter: schemaFQN must be a valid FQN';
    LOG.error(errorMsg, schemaFQN);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = schemaFQN;

  return getApiAxiosInstance(EDM_API)
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/schema/{namespace}/{name}`
 *
 * Updates the Schema definition for the given Schema FQN.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} schemaFQN
 * @param {string} action
 * @param {UUID[]} entityTypeIds
 * @param {UUID[]} propertyTypeIds
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updateSchema(
 *   { "namespace": "LATTICE", "name": "MySchema" },
 *   "action": "ADD",
 *   "entityTypeIds": [
 *     "ec6865e6-e60e-424b-a071-6a9c1603d735"
 *   ],
 *   "propertyTypeIds": [
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 *   ]
 * )
 */
export function updateSchema(
  schemaFQN :FQN,
  action :string,
  entityTypeIds :UUID[],
  propertyTypeIds :UUID[]
) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(schemaFQN)) {
    errorMsg = 'invalid parameter: schemaFQN must be a valid FQN';
    LOG.error(errorMsg, schemaFQN);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(action) || !UpdateSchemaRequestActions[action]) {
    errorMsg = 'invalid parameter: action must be a valid action';
    LOG.error(errorMsg, action);
    return Promise.reject(errorMsg);
  }

  let entityTypeIdsSet :UUID[];
  if (isUndefined(entityTypeIds) || isEmptyArray(entityTypeIds)) {
    entityTypeIdsSet = [];
  }
  else if (!isValidUUIDArray(entityTypeIds)) {
    errorMsg = 'invalid parameter: entityTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, entityTypeIds);
    return Promise.reject(errorMsg);
  }
  else {
    entityTypeIdsSet = Set().withMutations((set :Set<UUID>) => {
      entityTypeIds.forEach((entityTypeId :UUID) => {
        set.add(entityTypeId);
      });
    }).toJS();
  }

  let propertyTypeIdsSet :UUID[];
  if (isUndefined(propertyTypeIds) || isEmptyArray(propertyTypeIds)) {
    propertyTypeIdsSet = [];
  }
  else if (!isValidUUIDArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }
  else {
    propertyTypeIdsSet = Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();
  }

  const { namespace, name } = schemaFQN;

  const data = {
    action,
    entityTypes: entityTypeIdsSet,
    propertyTypes: propertyTypeIdsSet
  };

  return getApiAxiosInstance(EDM_API)
    .patch(`/${SCHEMA_PATH}/${namespace}/${name}`, data)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * EntityType APIs
 *
 */

/**
 * `GET /edm/entity/type/{uuid}`
 *
 * Gets the EntityType definition for the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @return {Promise<EntityType>} - a Promise that will resolve with the EntityType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntityType(entityTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
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
 * `GET /edm/ids/entity/type/{namespace}/{name}`
 *
 * Gets the EntityType UUID for the given EntityType FQN.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} entityTypeFQN
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityTypeId(
 *   { "namespace": "LATTICE", "name": "MyProperty" }
 * );
 */
export function getEntityTypeId(entityTypeFQN :FQN) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(entityTypeFQN)) {
    errorMsg = 'invalid parameter: entityTypeFQN must be a valid FQN';
    LOG.error(errorMsg, entityTypeFQN);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = entityTypeFQN;

  return getApiAxiosInstance(EDM_API)
    .get(`/${IDS_PATH}/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
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
 * @return {Promise<EntityType[]>} - a Promise that will resolve with all EntityType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEntityTypes();
 */
export function getAllEntityTypes() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/entity/type`
 *
 * Gets all association EntityType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<EntityType[]>} - a Promise that will resolve with the EntityType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllAssociationEntityTypes();
 */
export function getAllAssociationEntityTypes() :Promise<*> {

  // TODO: everything

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${ENTITY_TYPE_PATH}`)
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
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created EntityType UUID
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
export function createEntityType(entityType :EntityType) :Promise<*> {

  let errorMsg = '';

  if (!isValidEntityType(entityType)) {
    errorMsg = 'invalid parameter: entityType must be a valid EntityType';
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
 * `DELETE /edm/entity/type/{uuid}`
 *
 * Deletes the EntityType definition for the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEntityType(entityTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
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
 * `PUT /edm/entity/type/{uuid}/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType UUID by adding the given PropertyType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addPropertyTypeToEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function addPropertyTypeToEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<*> {

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
    .put(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/entity/type/{uuid}/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType UUID by removing the given PropertyType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removePropertyTypeFromEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function removePropertyTypeFromEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<*> {

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
 * `DELETE /edm/entity/type/{uuid}/{uuid}/force`
 *
 * Updates the EntityType definition for the given EntityType UUID by removing the given PropertyType UUID,
 * regardless of whether or not there is data associated with the entity type.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removePropertyTypeFromEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function forceRemovePropertyTypeFromEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<*> {

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
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}/${FORCE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}


/**
 * `PATCH /edm/entity/type/{uuid}/property/type`
 *
 * Updates the EntityType definition for the given EntityType UUID by reordering its properties as
 * specified by the provided list
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeIds
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.reorderPropertyTypesInEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   ["4b08e1f9-4a00-4169-92ea-10e377070220", "a00e2ce8-912d-49c9-a259-e6c1ffebf053"]
 * );
 */
export function reorderPropertyTypesInEntityType(entityTypeId :UUID, propertyTypeIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUIDArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${PROPERTY_TYPE_PATH}`, propertyTypeIds)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/entity/type/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType UUID with the given metadata.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {Object} metadata
 * @return {Promise} - a Promise that resolves without a value
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
export function updateEntityTypeMetaData(entityTypeId :UUID, metadata :Object) :Promise<*> {

  // TODO: create data model: MetaDataUpdate

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
 * `GET /edm/entity/type/{uuid}/hierarchy`
 *
 * Gets the EntityType hierarchy for the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @return {Promise<EntityType[]>} - a Promise that will resolve with the EntityType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityTypeHierarchy("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntityTypeHierarchy(entityTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${HIERARCHY_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * PropertyType APIs
 *
 */

/**
 * `GET /edm/property/type/{uuid}`
 *
 * Gets the PropertyType definition for the given PropertyType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @return {Promise<PropertyType>} - a Promise that will resolve with the PropertyType definition
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getPropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getPropertyType(propertyTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
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
 * `GET /edm/ids/property/type/{namespace}/{name}`
 *
 * Gets the PropertyType UUID for the given PropertyType FQN.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {FQN} propertyTypeFQN
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getPropertyTypeId(
 *   { namespace: "LATTICE", name: "MyProperty" }
 * );
 */
export function getPropertyTypeId(propertyTypeFQN :FQN) :Promise<*> {

  let errorMsg = '';

  if (!FQN.isValid(propertyTypeFQN)) {
    errorMsg = 'invalid parameter: propertyTypeFQN must be a valid FQN';
    LOG.error(errorMsg, propertyTypeFQN);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = propertyTypeFQN;

  return getApiAxiosInstance(EDM_API)
    .get(`/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
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
 * @return {Promise<PropertyType[]>} - a Promise that will resolve with all PropertyType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypes();
 */
export function getAllPropertyTypes() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/property/type/namespace/{namespace}`
 *
 * Gets all PropertyType definitions under the given namespace.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {string} namespace
 * @return {Promise<PropertyType[]>} - a Promise that will resolve with the PropertyType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypesInNamespace("LATTICE");
 */
export function getAllPropertyTypesInNamespace(namespace :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(namespace)) {
    errorMsg = 'invalid parameter: namespace must be a non-empty string';
    LOG.error(errorMsg, namespace);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}/${NAMESPACE_PATH}/${namespace}`)
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
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created PropertyType definition UUID
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
export function createPropertyType(propertyType :PropertyType) :Promise<*> {

  let errorMsg = '';

  if (!isValidPropertyType(propertyType)) {
    errorMsg = 'invalid parameter: propertyType must be a valid PropertyType';
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
 * `DELETE /edm/property/type/{uuid}`
 *
 * Deletes the PropertyType definition for the given PropertyType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deletePropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deletePropertyType(propertyTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
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
 * `DELETE /edm/property/type/{uuid}/force`
 *
 * Deletes the PropertyType definition for the given PropertyType UUID regardless of
 * whether or not there is data associated with it.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.forceDeletePropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function forceDeletePropertyType(propertyTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}/${FORCE_PATH}`)
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
 * @return {Promise} - a Promise that resolves without a value
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
export function updatePropertyTypeMetaData(propertyTypeId :UUID, metadata :Object) :Promise<*> {

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

/*
 *
 * AssociationType APIs
 *
 */

/**
 * `GET /edm/association/type/{uuid}`
 *
 * Gets the AssociationType definition for the given AssociationType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @return {Promise<AssociationType>} - a Promise that will resolve with the AssociationType definition
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAssociationType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAssociationType(associationTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
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
 * `GET /edm/association/type`
 *
 * Gets all AssociationType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<AssociationType[]>} - a Promise that will resolve with all AssociationType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllAssociationTypes();
 */
export function getAllAssociationTypes() :Promise<*> {

  // TODO: everything

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/{uuid}/detailed`
 *
 * Gets details about the AssociationType for the given AssociationType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @return {Promise<Object>} - a Promise that will resolve with the AssociationType details
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAssociationTypeDetails("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAssociationTypeDetails(associationTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DETAILED_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/{uuid}/available`
 *
 * Gets all available associationTypes for the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.getAllAvailableAssociationTypes("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllAvailableAssociationTypes(entityTypeId :UUID) :Promise<*> {

  // TODO: backend returns Iterable<EntityType>, but the function name is getAllAvailableAssociationTypes, feels weird
  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${entityTypeId}/available`)
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
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created AssociationType definition UUID
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
export function createAssociationType(associationType :Object) :Promise<*> {

  // TODO: everything

  // let errorMsg = '';
  //
  // if (!isValidAssociationType(associationType)) {
  //   errorMsg = 'invalid parameter: associationType must be a valid AssociationType';
  //   LOG.error(errorMsg, associationType);
  //   return Promise.reject(errorMsg);
  // }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ASSOCIATION_TYPE_PATH}`, associationType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/association/type/{uuid}`
 *
 * Deletes the AssociationType definition for the given AssociationType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteAssociationType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteAssociationType(associationTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
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

/*
 *
 * ComplexType APIs
 *
 */

/**
 * `GET /edm/complex/type/{uuid}`
 *
 * Gets the ComplexType definition for the given ComplexType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} complexTypeId
 * @return {Promise<ComplexType>} - a Promise that will resolve with the ComplexType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getComplexType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getComplexType(complexTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${COMPLEX_TYPE_PATH}/${complexTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/complex/type`
 *
 * Gets all ComplexType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<ComplexType[]>} - a Promise that will resolve with all ComplexType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllComplexTypes();
 */
export function getAllComplexTypes() :Promise<*> {

  // TODO: everything

  return getApiAxiosInstance(EDM_API)
    .get(`/${COMPLEX_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/complex/type/{uuid}/hierarchy`
 *
 * Gets the ComplexType hierarchy for the given ComplexType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} complexTypeId
 * @return {Promise<ComplexType[]>} - a Promise that will resolve with the ComplexType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getComplexTypeHierarchy("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getComplexTypeHierarchy(complexTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${COMPLEX_TYPE_PATH}/${complexTypeId}/${HIERARCHY_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/complex/type`
 *
 * Creates a new ComplexType definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {ComplexType} complexType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created ComplexType UUID
 *
 * @example
 * EntityDataModelApi.createComplexType(
 *   {
 *     "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "type": { "namespace": "LATTICE", "name": "MyComplexType" },
 *     "title": "title",
 *     "description": "description",
 *     "schemas": [
 *       { "namespace": "LATTICE", "name": "MySchema" }
 *     ],
 *     "properties": [
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ],
 *     "baseType": "4b08e1f9-4a00-4169-92ea-10e377070220",
 *     "category": "ComplexType"
 *   }
 * );
 */
export function createComplexType(complexType :Object) :Promise<*> {

  // TODO: everything

  // let errorMsg = '';
  //
  // if (!isValidComplexType(complexType)) {
  //   errorMsg = 'invalid parameter: complexType must be a valid ComplexType';
  //   LOG.error(errorMsg, complexType);
  //   return Promise.reject(errorMsg);
  // }

  return getApiAxiosInstance(EDM_API)
    .post(`/${COMPLEX_TYPE_PATH}`, complexType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/complex/type/{uuid}`
 *
 * Deletes the ComplexType definition for the given ComplexType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} complexTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteComplexType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteComplexType(complexTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${COMPLEX_TYPE_PATH}/${complexTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * EnumType APIs
 *
 */

/**
 * `GET /edm/enum/type/{uuid}`
 *
 * Gets the EnumType definition for the given EnumType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} enumTypeId
 * @return {Promise<EnumType>} - a Promise that will resolve with the EnumType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEnumType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEnumType(enumTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(enumTypeId)) {
    errorMsg = 'invalid parameter: enumTypeId must be a valid UUID';
    LOG.error(errorMsg, enumTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENUM_TYPE_PATH}/${enumTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/enum/type`
 *
 * Gets all EnumType definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<EnumType[]>} - a Promise that will resolve with all EnumType definitions
 * as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEnumTypes();
 */
export function getAllEnumTypes() :Promise<*> {

  // TODO: everything

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENUM_TYPE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/enum/type`
 *
 * Creates a new EnumType definition, if it doesn't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {EnumType} enumType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created EnumType UUID
 *
 * @example
 * EntityDataModelApi.createEnumType(
 *   {
 *     "id": "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *     "type": { "namespace": "LATTICE", "name": "MyEnumType" },
 *     "title": "title",
 *     "description": "description",
 *     "members": [
 *       "Blue", "Red", "Green"
 *     ],
 *     "schemas": [
 *       { "namespace": "LATTICE", "name": "MySchema" }
 *     ],
 *     "datatype": "String",
 *     "flags": false,
 *     "pii": false,
 *     "analyzer": "STANDARD"
 *   }
 * );
 */
export function createEnumType(enumType :Object) :Promise<*> {

  // TODO: everything

  // let errorMsg = '';
  //
  // if (!isValidEnumType(enumType)) {
  //   errorMsg = 'invalid parameter: enumType must be a valid EnumType';
  //   LOG.error(errorMsg, enumType);
  //   return Promise.reject(errorMsg);
  // }

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENUM_TYPE_PATH}`, enumType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/enum/type/{uuid}`
 *
 * Deletes the EnumType definition for the given EnumType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} enumTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteEnumType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEnumType(enumTypeId :UUID) :Promise<*> {

  // TODO: everything

  let errorMsg = '';

  if (!isValidUUID(enumTypeId)) {
    errorMsg = 'invalid parameter: enumTypeId must be a valid UUID';
    LOG.error(errorMsg, enumTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENUM_TYPE_PATH}/${enumTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PUT /edm/association/type/{uuid}/src/{uuid}`
 *
 * Updates the AssociationType src entity types for the given AssociationType UUID by adding the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addSrcEntityTypeToAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function addSrcEntityTypeToAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<*> {

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
 * `PUT /edm/association/type/{uuid}/dst/{uuid}`
 *
 * Updates the AssociationType dst entity types for the given AssociationType UUID by adding the given EntityType UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.addDstEntityTypeToAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function addDstEntityTypeToAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<*> {

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
 * `DELETE /edm/association/type/{uuid}/src/{uuid}`
 *
 * Updates the AssociationType src entity types for the given AssociationType UUID by removing the given EntityType
 * UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removeSrcEntityTypeFromAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function removeSrcEntityTypeFromAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<*> {

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
 * `DELETE /edm/association/type/{uuid}/dst/{uuid}`
 *
 * Updates the AssociationType dst entity types for the given AssociationType UUID by removing the given EntityType
 * UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} associationTypeId
 * @param {UUID} entityTypeId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.removeDstEntityTypeFromAssociationType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function removeDstEntityTypeFromAssociationType(associationTypeId :UUID, entityTypeId :UUID) :Promise<*> {

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
