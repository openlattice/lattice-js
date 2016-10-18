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

import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  EDM_API
} from './config/ApiEndpoints';

import {
  getAxiosInstance
} from './utils/AxiosUtils';

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

export function getSchema(schemaFqn :Object) :Promise<> {

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

export function getSchemasInNamespace(namespace :string) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createSchema(createSchemaRequest :Object) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${SCHEMA_PATH}`, createSchemaRequest)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function addEntityTypesToSchema(schemaFqn :Object, entityTypes :Object[]) :Promise<> {

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`, entityTypes)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function removeEntityTypesFromSchema(schemaFqn :Object, entityTypes :Object[]) :Promise<> {

  const { namespace, name } = schemaFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}`, {
      data: entityTypes
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function addPropertyTypesToSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

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

export function removePropertyTypesFromSchema(schemaFqn :Object, propertyTypeFqns :Object[]) :Promise<> {

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

export function getEntitySets() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${ENTITY_SET_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

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

export function getEntityType(entityTypeFqn :Object) :Promise<> {

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

export function getEntityTypes() :Promise<> {

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

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

export function deleteEntityType(entityTypeFqn :Object) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(EDM_API))
    .delete(`/${ENTITY_SET_PATH}/${namespace}/${name}`)
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
