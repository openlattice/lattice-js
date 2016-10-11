/*
 * @flow
 */

import Axios from 'axios';
import Promise from 'bluebird';

import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  EDM_API
} from './config/ApiEndpoints';

const LOG = new Logger('EntityDataModelApi');

const SCHEMA_PATH = 'schema';
const ENTITY_SET_PATH = 'entity/set';
const ENTITY_TYPE_PATH = 'entity/type';
const PROPERTY_TYPE_PATH = 'property/type';

/*
 *
 * EntityDataModel APIs
 *
 */

export function getEntityDataModel() :Promise {

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/`)
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

export function getSchema(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getAllSchemas() :Promise {

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getSchemasInNamespace(namespace :string) :Promise {

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createSchema(createSchemaRequest :Object) :Promise {


  return Axios
    .put(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}`, createSchemaRequest)
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

export function getEntitySets() :Promise {

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${ENTITY_SET_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntitySets(entitySets :Array<Object>) :Promise {

  return Axios
    .post(`${getApiBaseUrl(EDM_API)}/${ENTITY_SET_PATH}`, entitySets)
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

export function getEntityType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getEntityTypes() :Promise {

  return Axios
    .get(`${getApiBaseUrl(EDM_API)}/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntityType(entityType :Object) :Promise {

  return Axios
    .post(`${getApiBaseUrl(EDM_API)}/${ENTITY_TYPE_PATH}`, entityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function deleteEntityType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .delete(`${getApiBaseUrl(EDM_API)}/${ENTITY_SET_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function addEntityTypesToSchema(fullyQualifiedName :Object, entityTypes :Array<Object>) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .put(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}/${namespace}/${name}`, entityTypes)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function removeEntityTypesFromSchema(fullyQualifiedName :Object, entityTypes :Array<Object>) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .delete(`${getApiBaseUrl(EDM_API)}/${SCHEMA_PATH}/${namespace}/${name}`, {
      data: entityTypes
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

export function createPropertyType(propertyType :Object) :Promise {

  return Axios
    .post(`${getApiBaseUrl(EDM_API)}/${PROPERTY_TYPE_PATH}`, propertyType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function deletePropertyType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .delete(`${getApiBaseUrl(EDM_API)}/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
