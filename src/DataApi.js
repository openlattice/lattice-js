/*
 * @flow
 */

import Axios from 'axios';
import Promise from 'bluebird';

import Logger from './utils/Logger';

declare var __API_ENDPOINTS__;

const LOG = new Logger('DataApi');

const DataApi = Axios.create({
  baseURL: __API_ENDPOINTS__.DATA
});

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

  return DataApi
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function getAllEntitiesOfTypes(entityTypes :Array<Object>) :Promise {

  return DataApi
    .put(`/${ENTITY_DATA_PATH}/${MULTIPLE_PATH}`, entityTypes)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

export function createEntity(createEntityRequest :Object) :Promise {

  return DataApi
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

export function getEntitySet(fullyQualifiedName :Object) :Promise {

  const { namespace, name } = fullyQualifiedName;

  return DataApi
    .get(`/${ENTITY_SET_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
