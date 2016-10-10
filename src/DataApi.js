/*
 * @flow
 */

import Axios from 'axios';
import Promise from 'bluebird';

import Logger from './utils/Logger';

import {
  getApiBaseUrl,
  DATA_API
} from './config/ApiEndpoints';

const LOG = new Logger('DataApi');

const ENTITY_DATA_PATH = 'entitydata';
const ENTITY_SET_PATH = 'entityset';
const MULTIPLE_PATH = 'multiple';

/*
 *
 * EntityData APIs
 *
 */

export function getAllEntitiesOfType(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .get(`${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getAllEntitiesOfTypes(entityTypes :Array<Object>) :Promise {

  return Axios
    .put(`${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`, entityTypes)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntity(createEntityRequest :Object) :Promise {

  return Axios
    .post(`${getApiBaseUrl(DATA_API)}/${ENTITY_DATA_PATH}`, createEntityRequest)
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

export function getEntitySet(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return Axios
    .get(`${getApiBaseUrl(DATA_API)}/${ENTITY_SET_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
