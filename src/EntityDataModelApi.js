/*
 * @flow
 */

import Axios from 'axios';
import Promise from 'bluebird';

import Logger from './utils/Logger';

declare var __API_ENDPOINTS__;

const LOG = new Logger('EntityDataModelApi');

const EntityDataModelApi = Axios.create({
  baseURL: __API_ENDPOINTS__.EDM
});

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

  return EntityDataModelApi
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

export function getSchema(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .get(`/${SCHEMA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getAllSchemas() :Promise {

  return EntityDataModelApi
    .get(`/${SCHEMA_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getSchemasInNamespace(namespace :string) :Promise {

  return EntityDataModelApi
    .get(`/${SCHEMA_PATH}/${namespace}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createSchema(createSchemaRequest :Object) :Promise {


  return EntityDataModelApi
    .put(`/${SCHEMA_PATH}`, createSchemaRequest)
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

  return EntityDataModelApi
    .get(`/${ENTITY_SET_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntitySets(entitySets :Array<Object>) :Promise {

  return EntityDataModelApi
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

export function getEntityType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .get(`/${ENTITY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getEntityTypes() :Promise {

  return EntityDataModelApi
    .get(`/${ENTITY_TYPE_PATH}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntityType(entityType :Object) :Promise {

  return EntityDataModelApi
    .post(`/${ENTITY_TYPE_PATH}`, entityType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function deleteEntityType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .delete(`/${ENTITY_SET_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function addEntityTypesToSchema(fullyQualifiedName :Object, entityTypes :Array<Object>) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .put(`/${SCHEMA_PATH}/${namespace}/${name}`, entityTypes)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function removeEntityTypesFromSchema(fullyQualifiedName :Object, entityTypes :Array<Object>) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .delete(`/${SCHEMA_PATH}/${namespace}/${name}`, entityTypes)
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

  return EntityDataModelApi
    .post(`/${PROPERTY_TYPE_PATH}`, propertyType)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function deletePropertyType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return EntityDataModelApi
    .delete(`/${PROPERTY_TYPE_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
