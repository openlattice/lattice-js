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

import Immutable from 'immutable';

import has from 'lodash/has';
import isUndefined from 'lodash/isUndefined';

import EntitySet from '../models/EntitySet';
import FullyQualifiedName from '../models/FullyQualifiedName';
import Logger from '../utils/Logger';

import EntityType, {
  isValid as isValidEntityType
} from '../models/EntityType';

import PropertyType, {
  isValid as isValidPropertyType
} from '../models/PropertyType';

import Schema, {
  isValid as isValidSchema
} from '../models/Schema';

import {
  EDM_API
} from '../constants/ApiNames';

import {
  ASSOCIATION_TYPE_PATH,
  COMPLEX_TYPE_PATH,
  DETAILED_PATH,
  DST_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  ENUM_TYPE_PATH,
  FORCE_PATH,
  HIERARCHY_PATH,
  IDS_PATH,
  NAMESPACE_PATH,
  PROPERTY_TYPE_PATH,
  SCHEMA_PATH,
  SRC_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isNonEmptyStringArray
} from '../utils/LangUtils';

import {
  isValidEntitySetArray,
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  // TODO: add validation
  // TODO: add unit tests
  // TODO: create data models

  return getApiAxiosInstance(EDM_API)
    .post('/', projection)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} schemaFqn
 * @return {Promise<Schema>} - a Promise that will resolve with the Schema definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { "namespace": "LATTICE", "name": "MySchema" }
 * );
 */
export function getSchema(schemaFqn :FullyQualifiedName) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(schemaFqn)) {
    errorMsg = 'invalid parameter: schemaFqn must be a valid FQN';
    LOG.error(errorMsg, schemaFqn);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .get(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} schemaFqn
 * @param {string} fileType
 * @returns {string} - the direct file download URL
 *
 * @example
 * EntityDataModelApi.getSchemaFormatted(
 *   { "namespace": "LATTICE", "name": "MySchema" },
 *   "json"
 * );
 */
export function getSchemaFileUrl(schemaFqn :FullyQualifiedName, fileType :string) :?string {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(schemaFqn)) {
    errorMsg = 'invalid parameter: schemaFqn must be a valid FQN';
    LOG.error(errorMsg, schemaFqn);
    return null;
  }

  if (!isNonEmptyString(fileType)) {
    errorMsg = 'invalid parameter: fileType must be a non-empty string';
    LOG.error(errorMsg, fileType);
    return null;
  }

  const { namespace, name } = schemaFqn;
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} schemaFqn
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.createEmptySchema(
 *   { "namespace": "LATTICE", "name": "MySchema" }
 * );
 */
export function createEmptySchema(schemaFqn :FullyQualifiedName) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(schemaFqn)) {
    errorMsg = 'invalid parameter: schemaFqn must be a valid FQN';
    LOG.error(errorMsg, schemaFqn);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = schemaFqn;

  return getApiAxiosInstance(EDM_API)
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} schemaFqn
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
    schemaFqn :FullyQualifiedName,
    action :string,
    entityTypeIds :UUID[],
    propertyTypeIds :UUID[]
) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(schemaFqn)) {
    errorMsg = 'invalid parameter: schemaFqn must be a valid FQN';
    LOG.error(errorMsg, schemaFqn);
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
  else if (!isValidUuidArray(entityTypeIds)) {
    errorMsg = 'invalid parameter: entityTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, entityTypeIds);
    return Promise.reject(errorMsg);
  }
  else {
    entityTypeIdsSet = Immutable.Set().withMutations((set :Set<UUID>) => {
      entityTypeIds.forEach((entityTypeId :UUID) => {
        set.add(entityTypeId);
      });
    }).toJS();
  }

  let propertyTypeIdsSet :UUID[];
  if (isUndefined(propertyTypeIds) || isEmptyArray(propertyTypeIds)) {
    propertyTypeIdsSet = [];
  }
  else if (!isValidUuidArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }
  else {
    propertyTypeIdsSet = Immutable.Set().withMutations((set :Set<UUID>) => {
      propertyTypeIds.forEach((propertyTypeId :UUID) => {
        set.add(propertyTypeId);
      });
    }).toJS();
  }

  const { namespace, name } = schemaFqn;

  const data = {
    action,
    entityTypes: entityTypeIdsSet,
    propertyTypes: propertyTypeIdsSet
  };

  return getApiAxiosInstance(EDM_API)
    .patch(`/${SCHEMA_PATH}/${namespace}/${name}`, data)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/*
 *
 * EntitySet APIs
 *
 */

/**
 * `GET /edm/entity/set/{uuid}`
 *
 * Gets the EntitySet definition for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entitySetId
 * @return {Promise<EntitySet>} - a Promise that will resolve with the EntitySet definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_SET_PATH}/${entitySetId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/ids/entity/set/{name}`
 *
 * Gets the EntitySet UUID for the given EntitySet name.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {string} entitySetName
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntitySetId("MyEntitySet");
 */
export function getEntitySetId(entitySetName :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(entitySetName)) {
    errorMsg = 'invalid parameter: entitySetName must be a non-empty string';
    LOG.error(errorMsg, entitySetName);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${IDS_PATH}/${ENTITY_SET_PATH}/${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/entity/set`
 *
 * Gets all EntitySet definitions.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @return {Promise<EntitySet[]>} - a Promise that will resolve with all EntitySet definitions
 *
 * @example
 * EntityDataModelApi.getAllEntitySets();
 */
export function getAllEntitySets() :Promise<*> {

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_SET_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/entity/set`
 *
 * Creates new EntitySet definitions if they don't exist.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {EntitySet[]} entitySets
 * @return {Promise<Map<string, UUID>>} - a Promise that will resolve with a Map as its fulfillment value, where
 * the key is the EntitySet name and the value is the newly-created EntitySet UUID
 *
 * @example
 * EntityDataModelApi.createEntitySets(
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

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENTITY_SET_PATH}`, entitySets)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /edm/entity/set/{uuid}`
 *
 * Deletes the EntitySet definition for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entitySetId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.deleteEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEntitySet(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_SET_PATH}/${entitySetId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /edm/entity/set/{uuid}`
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
 * EntityDataModelApi.updateEntitySetMetaData(
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
export function updateEntitySetMetaData(entitySetId :UUID, metadata :Object) :Promise<*> {

  // TODO: create data model: MetaDataUpdate

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

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_SET_PATH}/${entitySetId}`, metadata)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} entityTypeFqn
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityTypeId(
 *   { "namespace": "LATTICE", "name": "MyProperty" }
 * );
 */
export function getEntityTypeId(entityTypeFqn :FullyQualifiedName) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(entityTypeFqn)) {
    errorMsg = 'invalid parameter: entityTypeFqn must be a valid FQN';
    LOG.error(errorMsg, entityTypeFqn);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = entityTypeFqn;

  return getApiAxiosInstance(EDM_API)
    .get(`/${IDS_PATH}/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type`
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
    .get(`/${ASSOCIATION_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${propertyTypeId}/${FORCE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  else if (!isValidUuidArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${PROPERTY_TYPE_PATH}`, propertyTypeIds)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
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

  return getApiAxiosInstance(EDM_API)
    .patch(`/${ENTITY_TYPE_PATH}/${entityTypeId}`, metadata)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_TYPE_PATH}/${entityTypeId}/${HIERARCHY_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 * @param {FullyQualifiedName} propertyTypeFqn
 * @return {Promise<UUID>} - a Promise that will resolve with the UUID as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getPropertyTypeId(
 *   { namespace: "LATTICE", name: "MyProperty" }
 * );
 */
export function getPropertyTypeId(propertyTypeFqn :FullyQualifiedName) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(propertyTypeFqn)) {
    errorMsg = 'invalid parameter: propertyTypeFqn must be a valid FQN';
    LOG.error(errorMsg, propertyTypeFqn);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = propertyTypeFqn;

  return getApiAxiosInstance(EDM_API)
    .get(`/${IDS_PATH}/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 *     "piiField": false,
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(propertyTypeId)) {
    errorMsg = 'invalid parameter: propertyTypeId must be a valid UUID';
    LOG.error(errorMsg, propertyTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}/${FORCE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  return getApiAxiosInstance(EDM_API)
    .patch(`/${PROPERTY_TYPE_PATH}/${propertyTypeId}`, metadata)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DETAILED_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/association/type/{uuid}/available`
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

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ASSOCIATION_TYPE_PATH}/${entityTypeId}/available`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${COMPLEX_TYPE_PATH}/${complexTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${COMPLEX_TYPE_PATH}/${complexTypeId}/${HIERARCHY_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(complexTypeId)) {
    errorMsg = 'invalid parameter: complexTypeId must be a valid UUID';
    LOG.error(errorMsg, complexTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${COMPLEX_TYPE_PATH}/${complexTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(enumTypeId)) {
    errorMsg = 'invalid parameter: enumTypeId must be a valid UUID';
    LOG.error(errorMsg, enumTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENUM_TYPE_PATH}/${enumTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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
 *     "piiField": false,
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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(enumTypeId)) {
    errorMsg = 'invalid parameter: enumTypeId must be a valid UUID';
    LOG.error(errorMsg, enumTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ENUM_TYPE_PATH}/${enumTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${SRC_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DST_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${SRC_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
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

  if (!isValidUuid(associationTypeId)) {
    errorMsg = 'invalid parameter: associationTypeId must be a valid UUID';
    LOG.error(errorMsg, associationTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .delete(`/${ASSOCIATION_TYPE_PATH}/${associationTypeId}/${DST_PATH}/${entityTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/entity/set/{uuid}/property/type`
 *
 * Returns all property type metadata for an entity set
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entitySetId
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.getAllEntitySetPropertyMetadata("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getAllEntitySetPropertyMetadata(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_SET_PATH}/${entitySetId}/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /edm/entity/set/{uuid}/property/type/{uuid}`
 *
 * Returns specified property type metadata for an entity set
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entitySetId
 * @param {UUID} propertyTypeId
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.getEntitySetPropertyMetadata(
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

  return getApiAxiosInstance(EDM_API)
    .get(`/${ENTITY_SET_PATH}/${entitySetId}/${PROPERTY_TYPE_PATH}/${propertyTypeId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /edm/entity/set/{uuid}/property/type/{uuid}`
 *
 * Updates the property type metadata for the given entity set.
 *
 * @static
 * @memberof lattice.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @param {Object} metadata
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * EntityDataModelApi.updateEntitySetPropertyMetadata(
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

  return getApiAxiosInstance(EDM_API)
    .post(`/${ENTITY_SET_PATH}/${entitySetId}/${PROPERTY_TYPE_PATH}/${propertyTypeId}`, metadata)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
