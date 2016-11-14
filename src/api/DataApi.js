/*
 * @flow
 */

/**
 * DataApi gives access to Loom's REST API for reading and writing data against an existing EntityDataModel.
 *
 * @module DataApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.DataApi.get...
 *
 * @example
 * import { DataApi } from 'loom-data';
 * // DataApi.get...
 */

import FullyQualifiedName from '../types/FullyQualifiedName';
import Logger from '../utils/Logger';

import {
  DATA_API
} from '../constants/ApiNames';

import {
  ENTITY_DATA_PATH,
  MULTIPLE_PATH
} from '../constants/ApiPaths';

import {
  getApiBaseUrl,
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString
} from '../utils/LangUtils';

const LOG = new Logger('DataApi');

/**
 * `GET /entitydata/{namespace}/{name}`
 *
 * Gets all entity data for the given EntityType FQN.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise<Array<Object>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfType(
 *   { namespace: "LOOM", name: "MyEntity" }
 * );
 */
export function getAllEntitiesOfType(entityTypeFqn :Object) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid FQN object literal');
  }

  const { namespace, name } = entityTypeFqn;

  return getApiAxiosInstance(DATA_API)
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * Returns the URL to be used for a direct file download for all entity data for the given EntityType FQN.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @param {string} fileType - the format in which to download the data
 * @returns {string} - the file download URL
 *
 * @example
 * DataApi.getAllEntitiesOfTypeFileUrl(
 *   { namespace: "LOOM", name: "MyEntity" },
 *   "json"
 * );
 */
export function getAllEntitiesOfTypeFileUrl(entityTypeFqn :Object, fileType :string) :?string {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return null;
  }

  const { namespace, name } = entityTypeFqn;
  return `${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${namespace}/${name}?fileType=${fileType}`;
}

/**
 * `GET /entitydata/{namespace}/{name}/{name}`
 *
 * Gets all entity data in the EntitySet defined by the given EntityType FQN.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @param {string} entitySetName - the value of the "name" field of the EntitySet
 * @returns {Promise}
 *
 * @example
 * DataApi.getAllEntitiesOfTypeInSet({
 *   { namespace: "LOOM", name: "MyEntity" },
 *   "MyEntityCollection"
 * });
 */
export function getAllEntitiesOfTypeInSet(entityTypeFqn :Object, entitySetName :string) :Promise<> {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn)) {
    return Promise.reject('invalid parameter: entityTypeFqn must be a valid FQN object literal');
  }

  if (!isNonEmptyString(entitySetName)) {
    return Promise.reject('invalid parameter: entitySetName must be a non-empty string');
  }

  const { namespace, name } = entityTypeFqn;

  return getApiAxiosInstance(DATA_API)
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}/${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * Returns the URL to be used for a direct file download for all entity data in the EntitySet defined by the given
 * EntityType FQN.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @param {string} entitySetName - the value of the "name" field of the EntitySet
 * @returns {string} - the file download URL
 *
 * @example
 * DataApi.getAllEntitiesOfTypeInSetFileUrl({
 *   { namespace: "LOOM", name: "MyEntity" },
 *   "MyEntityCollection",
 *   "json"
 * });
 */
export function getAllEntitiesOfTypeInSetFileUrl(
    entityTypeFqn :Object, entitySetName :string, fileType :string) :?string {

  if (!FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn) || !isNonEmptyString(entitySetName)) {
    return null;
  }

  const { namespace, name } = entityTypeFqn;
  return `${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${namespace}/${name}/${entitySetName}?fileType=${fileType}`;
}

/**
 * `PUT /entitydata/multiple`
 *
 * Gets all entity data for the given EntityType FQNs.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Array<Object>} entityTypeFqns - an array of object literals representing fully qualified names
 * @returns {Promise<Array<Array<Object>>>} - a Promise that will resolve with the entity data as its fulfillment value
 *
 * @example
 * DataApi.getAllEntitiesOfTypes([
 *   { namespace: "LOOM", name: "MyEntity1" },
 *   { namespace: "LOOM", name: "MyEntity2" }
 * ]);
 */
export function getAllEntitiesOfTypes(entityTypeFqns :Object[]) :Promise<> {

  const allValidFqns = entityTypeFqns.reduce((isValid, entityTypeFqn) => {
    return isValid && FullyQualifiedName.isValidFqnObjectLiteral(entityTypeFqn);
  }, true);

  if (!allValidFqns) {
    return Promise.reject('invalid parameter: entityTypeFqns must be an array of valid FQN object literals');
  }

  return getApiAxiosInstance(DATA_API)
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
 * Creates an entry for the given entity data.
 *
 * @static
 * @memberof loom-data.DataApi
 * @param {Object} createEntityRequest
 * @returns {Promise}
 *
 * @example
 * // creating a single entity
 * DataApi.createEntity({
 *   type: { namespace: "LOOM", name: "MyEntity" },
 *   entitySetName: "MyEntityCollection",
 *   properties: [
 *     { "LOOM.MyProperty": "value" }
 *   ]
 * });
 *
 * @example
 * // creating multiple entities of the same EntityType
 * DataApi.createEntity({
 *   type: { namespace: "LOOM", name: "MyEntity" },
 *   entitySetName: "MyEntityCollection",
 *   properties: [
 *     { "LOOM.MyProperty": "value1" },
 *     { "LOOM.MyProperty": "value2" },
 *   ]
 * });
 */
export function createEntity(createEntityRequest :Object) :Promise<> {

  return getApiAxiosInstance(DATA_API)
    .post(`/${ENTITY_DATA_PATH}`, createEntityRequest)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
