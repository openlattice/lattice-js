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

import FullyQualifiedName from './types/FullyQualifiedName';
import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  EDM_API
} from './config/ApiEndpoints';

import {
  getAxiosInstance
} from './utils/AxiosUtils';

import {
  isNonEmptyString
} from './utils/LangUtils';

const LOG = new Logger('EntityDataModelApi');

const SCHEMA_PATH = 'schema';
const ENTITY_SET_PATH = 'entity/set';
const ENTITY_TYPE_PATH = 'entity/type';
const PROPERTY_TYPE_PATH = 'property/type';
const ADD_PROPERTY_TYPES_PATH = 'addPropertyTypes';
const DELETE_PROPERTY_TYPES_PATH = 'deletePropertyTypes';

/*
 *
 * EntityDataModel APIs
 *
 */

/**
 * `GET /`
 *
 * Gets the entire Entity Data Model schema.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise} - a Promise that will resolve with the Entity Data Model schema as its fulfillment value
 */
export function getEntityDataModel() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get('/')
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * Schema APIs
 *
 */

/**
 * `GET /schema/{namespace}/{name}`
 *
 * Gets the schema definition for the given schema FQN.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @return {Promise<Object>} - a Promise that will resolve with the schema definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getSchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function getSchema(schemaFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /schema`
 *
 * Gets all schema definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Object[]>} - a Promise that will resolve with all schema definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllSchemas();
 */
export function getAllSchemas() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${SCHEMA_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /schema/{namespace}`
 *
 * Gets all schema definitions under the given namespace.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {String} namespace - the substring before the dot in a FullyQualifiedName String
 * @return {Promise<Object[]>} - a Promise that will resolve with all schema definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getSchemasInNamespace("LOOM");
 */
export function getSchemasInNamespace(namespace :string) :Promise<> {

  if (!isNonEmptyString(namespace)) {
    return Promise.reject('invalid parameter: namespace must be a non-empty string');
  }

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema`
 *
 * Creates a new schema definition for the given schema FQN, it it does not already exist.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createSchema(
 *   { namespace: "LOOM", name: "MySchema" }
 * );
 */
export function createSchema(schemaFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${SCHEMA_PATH}`, schemaFqn)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema/{namespace}/{name}`
 *
 * Updates the schema definition for the given schema FQN with the addition of the given EntityType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} entityTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.addEntityTypesToSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyEntity1" },
 *     { namespace: "LOOM", name: "MyEntity2" }
 *   ]
 * );
 */
export function addEntityTypesToSchema(schemaFqn :Object, entityTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const allValidFqns = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValidFqns) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`, entityTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /schema/{namespace}/{name}`
 *
 * Updates the schema definition for the given schema FQN with the removal of the given EntityType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} entityTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.removeEntityTypesFromSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyEntity1" },
 *     { namespace: "LOOM", name: "MyEntity2" }
 *   ]
 * );
 */
export function removeEntityTypesFromSchema(schemaFqn :Object, entityTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const allValidFqns = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValidFqns) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}`, {
      data: entityTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /schema/{namespace}/{name}/addPropertyTypes`
 *
 * Updates the schema definition for the given schema FQN with the addition of the given PropertyType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} propertyTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.addPropertyTypesToSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyProperty1" },
 *     { namespace: "LOOM", name: "MyProperty2" }
 *   ]
 * );
 */
export function addPropertyTypesToSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const allValidFqns = propertyTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValidFqns) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${SCHEMA_PATH}/${namespace}/${name}/${ADD_PROPERTY_TYPES_PATH}`, propertyTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /schema/{namespace}/{name}/deletePropertyTypes`
 *
 * Updates the schema definition for the given schema FQN with the removal of the given PropertyType FQNs.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object} schemaFqn - an object literal representing a fully qualified name
 * @param {Object[]} propertyTypeFqns - an array of object literals representing fully qualified names
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.removePropertyTypesFromSchema(
 *   { namespace: "LOOM", name: "MySchema" },
 *   [
 *     { namespace: "LOOM", name: "MyProperty1" },
 *     { namespace: "LOOM", name: "MyProperty2" }
 *   ]
 * );
 */
export function removePropertyTypesFromSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(schemaFqn)) {
    return Promise.reject('invalid parameter: schemaFqn must be a valid FQN object literal');
  }

  const allValidFqns = propertyTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValidFqns) {
    return Promise.reject('invalid parameter: propertyTypeFqns must be an array of valid FQN object literals');
  }

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}/${DELETE_PROPERTY_TYPES_PATH}`, {
      data: propertyTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * EntitySet APIs
 *
 */

/**
 * `GET /entity/set`
 *
 * Gets all EntitySet definitions.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @return {Promise<Object[]>} - a Promise that will resolve with all EntitySet definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEntitySets();
 */
export function getAllEntitySets() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${ENTITY_SET_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set`
 *
 * Creates a new EntitySet definition.
 *
 * @static
 * @memberof loom-data.EntityDataModelApi
 * @param {Object[]} entitySets
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createEntitySets(
 *   [{
 *     name: "MyEntities",
 *     type: { namespace: "LOOM", name: "MyEntity" },
 *     title: "a collection of MyEntity EntityTypes"
 *   }]
 * );
 */
export function createEntitySets(entitySets :Object[]) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .post(`/${ENTITY_SET_PATH}`, entitySets)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * EntityType APIs
 *
 */

/**
 * `GET /entity/type/{namespace}/{name}`
 *
 * Gets the EntityType definition for the given EntityType FQN.
 *
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @return {Promise<Object>} - a Promise that will resolve with the EntityType definition as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getEntityType(
 *   { namespace: "LOOM", name: "MyEntity" }
 * );
 */
export function getEntityType(entityTypeFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid FQN object literal');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `GET /entity/type/{namespace}/{name}`
 *
 * Gets all EntityType definitions.
 *
 * @return {Promise<Object[]>} - a Promise that will resolve with all EntityType definitions as its fulfillment value
 *
 * @example
 * EntityDataModelApi.getAllEntityTypes();
 */
export function getAllEntityTypes() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/type`
 *
 * Creates a new EntityType definition.
 *
 * @param {Object} entityType
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.createEntityType(
 *   {
 *     namespace: "LOOM",
 *     type: "MyEntity",
 *     key: [
 *       { namespace: "LOOM", name: "MyProperty1" }
 *       { namespace: "LOOM", name: "MyProperty2" }
 *     ],
 *     properties: [
 *       { namespace: "LOOM", name: "MyProperty1" }
 *       { namespace: "LOOM", name: "MyProperty2" }
 *       { namespace: "LOOM", name: "MyProperty3" }
 *     ]
 *   }
 * );
 */
export function createEntityType(entityType :Object) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .post(`/${ENTITY_TYPE_PATH}`, entityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/{namespace}/{name}`
 *
 * Deletes the EntityType definition for the given EntityType FQN.
 *
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @return {Promise}
 *
 * @example
 * EntityDataModelApi.deleteEntityType(
 *   { namespace: "LOOM", name: "MyEntity" }
 * );
 */
export function deleteEntityType(entityTypeFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid FQN object literal');
  }

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function addPropertyTypesToEntityType(entityTypeFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${ENTITY_TYPE_PATH}/${namespace}/${name}/${ADD_PROPERTY_TYPES_PATH}`, propertyTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function removePropertyTypesFromEntityType(entityTypeFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${ENTITY_TYPE_PATH}/${namespace}/${name}/${DELETE_PROPERTY_TYPES_PATH}`, {
      data: propertyTypeFqns
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/*
 *
 * PropertyType APIs
 *
 */

export function getPropertyType(propertyTypeFqn :Object) :Promise<> {

  const { namespace, name } = propertyTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getPropertyTypes() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${PROPERTY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getPropertyTypesInNamespace(namespace :string) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${PROPERTY_TYPE_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createPropertyType(propertyType :Object) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .post(`/${PROPERTY_TYPE_PATH}`, propertyType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function deletePropertyType(propertyTypeFqn :Object) :Promise<> {

  const { namespace, name } = propertyTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
