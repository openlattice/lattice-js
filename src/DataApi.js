/*
 * @flow
 */

<<<<<<< HEAD
import Axios from 'axios';

=======
>>>>>>> origin/develop
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
 * Gets all entity data for the given EntityType
 *
 * @public
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 * @returns {Promise<Array<Object>>} - a Promise that will resolve with the entity data as its fulfillment value
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
 * Gets all entity data for the given array of EntityTypes
 *
 * @public
 * @param {Array<Object>} entityTypeFqns - an array of object literals representing fully qualified names
 * @returns {Promise<Array<Array<Object>>>} - a Promise that will resolve with the entity data as its fulfillment value
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
 * TODO: finish docs...
 * Creates an entry for the given entity data
 *
 * @param {Object} createEntityRequest
 @ @returns {Promise}
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
 * TODO: finish docs...
 *
 * @param {Object} entityTypeFqn - an object literal representing a fully qualified name
 @ @returns {Promise}
 */
export function getEntitySet(entityTypeFqn :Object) :Promise<> {

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
