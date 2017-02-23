/*
 * @flow
 */

/**
 * EntityDataModelApi gives access to Loom's REST API for interacting with EntityDataModel (EDM) schemas.
 *
 * @module EntityDataModelApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.EntityDataModelApi.get...
 *
 * @example
 * import { EntityDataModelApi } from 'loom-data';
 * // EntityDataModelApi.get...
 */

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
  IDS_PATH,
  SCHEMA_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH,
  NAMESPACE_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isEmptyArray,
  isNonEmptyObject,
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidEntitySetArray,
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('EntityDataModelApi');

/*
 *
 * EntityDataModel APIs
 *
 */

/**
 * `GET /edm`
 *
 * Gets the entire Entity Data Model schema.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise} - a Promise that will resolve with the Entity Data Model schema as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityDataModel();
 */
export function getEntityDataModel() :Promise<> {

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
 * Gets the Entity Data Model schema, filtered by the given projection.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise}
 *
 * TODO: add documentation
 * TODO: add validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function getEntityDataModelProjection(projection :Object[]) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} schemaFqn
 * @return {Promise<Schema>}
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function getSchema(schemaFqn :FullyQualifiedName) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Schema[]>}
 *
 * @example
 * EntityDataModelApi.getAllSchemas();
 */
export function getAllSchemas() :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {string} namespace
 * @return {Promise<Schema[]>}
 *
 * @example
 * EntityDataModelApi.getAllSchemasInNamespace("LOOM");
 */
export function getAllSchemasInNamespace(namespace :string) :Promise<> {

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
 * Returns the URL to be used for a direct file download for the given Schema FQN formatted as the given file type.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} schemaFqn
 * @param {string} fileType
 * @returns {string}
 *
 * @example
 * EntityDataModelApi.getSchemaFormatted(
 *   { namespace: "LOOM", name: "MySchema" },
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
 * Creates a new Schema definition, it it does not already exist.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Schema} schema
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createSchema(
 *   {
 *     fqn: { namespace: "LOOM", name: "MySchema" },
 *     propertyTypes: [],
 *     entityTypes: []
 *   }
 * );
 */
export function createSchema(schema :Schema) :Promise<> {

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
 * Creates a new empty Schema definition for the given Schema FQN.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} schemaFqn
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createEmptySchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function createEmptySchema(schemaFqn :FullyQualifiedName) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} schemaFqn
 * @param {string} action
 * @param {UUID[]} entityTypeIds
 * @param {UUID[]} propertyTypeIds
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.updateSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   action: "ADD",
 *   entityTypeIds: [
 *     "ec6865e6-e60e-424b-a071-6a9c1603d735"
 *   ],
 *   propertyTypeIds: [
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 *   ]
 * )
 */
export function updateSchema(
    schemaFqn :FullyQualifiedName,
    action :string,
    entityTypeIds :UUID[],
    propertyTypeIds :UUID[]) :Promise<> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(schemaFqn)) {
    errorMsg = 'invalid parameter: schemaFqn must be a valid FQN';
    LOG.error(errorMsg, schemaFqn);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(action)) {
    errorMsg = 'invalid parameter: action must be a non-empty string';
    LOG.error(errorMsg, action);
    return Promise.reject(errorMsg);
  }

  let entityTypes = entityTypeIds;
  if (isUndefined(entityTypeIds) || isEmptyArray(entityTypeIds)) {
    entityTypes = [];
  }
  else if (!isValidUuidArray(entityTypeIds)) {
    errorMsg = 'invalid parameter: entityTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, entityTypeIds);
    return Promise.reject(errorMsg);
  }

  let propertyTypes = propertyTypeIds;
  if (isUndefined(propertyTypeIds) || isEmptyArray(propertyTypeIds)) {
    propertyTypes = [];
  }
  else if (!isValidUuidArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be an array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = schemaFqn;

  const data = {
    action,
    entityTypes,
    propertyTypes
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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entitySetId
 * @return {Promise<EntitySet>}
 *
 * @example
 * EntityDataModelApi.getEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntitySet(entitySetId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {string} entitySetName
 * @return {Promise<UUID>}
 *
 * @example
 * EntityDataModelApi.getEntitySetId("MyEntitySet");
 */
export function getEntitySetId(entitySetName :string) :Promise<> {

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
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /edm/entity/set`
 *
 * Gets all EntitySet definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<EntitySet[]>}
 *
 * @example
 * EntityDataModelApi.getAllEntitySets();
 */
export function getAllEntitySets() :Promise<> {

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
 * Creates a new EntitySet definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {EntitySet[]} entitySets
 * @return {Promise<Map<string, UUID>>}
 *
 * @example
 * EntityDataModelApi.createEntitySets(
 *   [
 *     {
 *       id: "ec6865e6-e60e-424b-a071-6a9c1603d735", // optional
 *       type: { namespace: "LOOM", name: "MyEntity" },
 *       name: "MyEntities",
 *       title: "My Entities",
 *       description: "a collection of MyEntity EntityTypes",
 *     }
 *   ]
 * );
 */
export function createEntitySets(entitySets :EntitySet[]) :Promise<> {

  let errorMsg = '';

  if (!isValidEntitySetArray(entitySets)) {
    errorMsg = 'invalid parameter: entitySets must be a non-empty array of valid EntitySets';
    LOG.error(errorMsg, entitySets);
    return Promise.reject(errorMsg);
  }

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entitySetId - the EntitySet UUID
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deleteEntitySet("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEntitySet(entitySetId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @return {Promise<EntityType>} - a Promise that will resolve with the EntityType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getEntityType(entityTypeId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} entityTypeFqn
 * @return {Promise<UUID>}
 *
 * @example
 * EntityDataModelApi.getEntityTypeId(
 *   { namespace: "LOOM", name: "MyProperty" }
 * );
 */
export function getEntityTypeId(entityTypeFqn :FullyQualifiedName) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<EntityType[]>}
 *
 * @example
 * EntityDataModelApi.getAllEntityTypes();
 */
export function getAllEntityTypes() :Promise<> {

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
 * `POST /edm/entity/type`
 *
 * Creates a new EntityType definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {EntityType} entityType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created EntityType UUID
 *
 * @example
 * EntityDataModelApi.createEntityType(
 *   {
 *     id: "ec6865e6-e60e-424b-a071-6a9c1603d735", // optional
 *     type: { namespace: "LOOM", name: "MyEntity" },
 *     schemas: [
 *       { namespace: "LOOM", name: "MySchema" }
 *     ],
 *     key: [
 *       "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     properties: [
 *       "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ]
 *   }
 * );
 */
export function createEntityType(entityType :EntityType) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deleteEntityType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deleteEntityType(entityTypeId :UUID) :Promise<> {

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
 * `PUT /edm/entity/type/{uuid}`
 *
 * Updates the EntityType definition for the given EntityType UUID with the given PropertyType UUIDs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId - the EntityType UUID
 * @param {UUID[]} propertyTypeIds - the final set of PropertyType UUIDs with which to set on the EntityType
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.updatePropertyTypesForEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   [
 *     "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *     "4b08e1f9-4a00-4169-92ea-10e377070220"
 *   ]
 * );
 */

export function updatePropertyTypesForEntityType(entityTypeId :UUID, propertyTypeIds :UUID[]) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuidArray(propertyTypeIds)) {
    errorMsg = 'invalid parameter: propertyTypeIds must be a non-empty array of valid UUIDs';
    LOG.error(errorMsg, propertyTypeIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(EDM_API)
    .put(`/${ENTITY_TYPE_PATH}/${entityTypeId}`, propertyTypeIds)
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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.addPropertyTypeToEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function addPropertyTypeToEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} entityTypeId
 * @param {UUID} propertyTypeId
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.removePropertyTypeFromEntityType(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "4b08e1f9-4a00-4169-92ea-10e377070220"
 * );
 */
export function removePropertyTypeFromEntityType(entityTypeId :UUID, propertyTypeId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @return {Promise<PropertyType>}
 *
 * @example
 * EntityDataModelApi.getPropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getPropertyType(propertyTypeId :UUID) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {FullyQualifiedName} propertyTypeFqn
 * @return {Promise<UUID>}
 *
 * @example
 * EntityDataModelApi.getPropertyTypeId(
 *   { namespace: "LOOM", name: "MyProperty" }
 * );
 */
export function getPropertyTypeId(propertyTypeFqn :FullyQualifiedName) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<PropertyType[]>}
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypes();
 */
export function getAllPropertyTypes() :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {string} namespace
 * @return {Promise<PropertyType[]>}
 *
 * @example
 * EntityDataModelApi.getAllPropertyTypesInNamespace("LOOM");
 */
export function getAllPropertyTypesInNamespace(namespace :string) :Promise<> {

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
 * Creates a new PropertyType definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {PropertyType} propertyType
 * @return {Promise<UUID>} - a Promise that will resolve with the newly-created PropertyType UUID
 *
 * @example
 * EntityDataModelApi.createPropertyType(
 *   {
 *     id: "ec6865e6-e60e-424b-a071-6a9c1603d735", // optional
 *     type: { namespace: "LOOM", name: "MyProperty" },
 *     datatype: "String",
 *     schemas: [
 *       { namespace: "LOOM", name: "MySchema" }
 *     ]
 *   }
 * );
 */
export function createPropertyType(propertyType :PropertyType) :Promise<> {

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
 * @memberof loom-data.EntityDataModelApi
 * @param {UUID} propertyTypeId
 * @param {FullyQualifiedName} propertyTypeFqn
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deletePropertyType("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function deletePropertyType(propertyTypeId :UUID) :Promise<> {

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
