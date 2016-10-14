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

const ENTITY_DATA_PATH = 'entitydata';
const MULTIPLE_PATH = 'multiple';

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

export function getAllEntitiesOfTypeInSet(entityTypeFqn :Object, entitySetName :string) :Promise<> {

  const { namespace, name } = entityTypeFqn;

  return getAxiosInstance(getApiBaseUrl(DATA_API))
    .get(`/${ENTITY_DATA_PATH}/${namespace}/${name}/${entitySetName}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

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
