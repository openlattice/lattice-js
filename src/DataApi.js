/**
 * DataApi gives access to Loom's REST API for reading and writing data against an existing EntityDataModel.
 *
 * @module DataApi
 * @memberof loom-data
 * @example
 * import Loom from 'loom-data';
 * // Loom.DataApi.get...
 *
 * @example
 * import { DataApi } from 'loom-data';
 * // DataApi.get...
 */

/*
 * @flow
 */

import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  DATA_API
} from './config/ApiEndpoints';

import {
  getAxiosInstance
} from './utils/AxiosUtils';

const LOG = new Logger('DataApi');

/*
 *
 * constants
 *
 */

const ENTITY_DATA_PATH = 'entitydata';
const ENTITY_SET_PATH = 'entityset';
const MULTIPLE_PATH = 'multiple';

/*
 *
 * EntityData APIs
 *
 */

/**
 * `GET /entitydata/{namespace}/{name}`
 *
 * Gets all entity data for the given EntityType
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise<Array<Object>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfType({
 *   namespace: 'LOOM',
 *   name: 'MyEntity'
 * })
 */
export function getAllEntitiesOfType(entityTypeFqn :Object) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `PUT /entitydata/multiple`
 *
 * Gets all entity data for the given array of EntityTypes
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Array<Object>} entityTypeFqns - an array of object literals representing fully qualified names
 * @returns {Promise<Array<Array<Object>>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfTypes([
 *   { namespace: 'LOOM', name: 'MyEntity1' },
 *   { namespace: 'LOOM', name: 'MyEntity2' }
 * ])
 */
export function getAllEntitiesOfTypes(entityTypeFqns :Array<Object>) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .put(`/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`, entityTypeFqns)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entitydata`
 *
 * Creates an entry for the given entity data
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} createEntityRequest
 * @returns {Promise}
 *
 * @example
 * DataApi.createEntity(...)
 */
export function createEntity(createEntityRequest :Object) :Promise<> {

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .post(`/${ENTITY_DATA_PATH}`, createEntityRequest)
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
 * `GET /entityset/{namespace}/{name}`
 *
 * Gets all entity data in the EntitySet defined by the given EntityType
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise}
 *
 * @example
 * DataApi.getAllEntitiesInSetOfType(...)
 */
export function getAllEntitiesInSetOfType(entityTypeFqn :Object) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_SET_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
