/*
 * @flow
 */

/**
 * PermissionsApi gives access to Loom's REST API for managing ACLs on existing EntityDataModel schemas.
 *
 * @module PermissionsApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.PermissionsApi.update...
 *
 * @example
 * import { PermissionsApi } from 'loom-data';
 * // PermissionsApi.update...
 */

import Logger from './utils/Logger';

import {
  PERMISSIONS_API
} from './constants/ApiNames';

import {
  ALL_PATH,
  ENTITY_SET_PATH,
  ENTITY_TYPE_PATH,
  PROPERTY_TYPE_PATH
} from './constants/ApiPaths';

import {
  getApiAxiosInstance
} from './utils/AxiosUtils';

const LOG = new Logger('PermissionsApi');

/**
 * `POST /entity/type`
 *
 * @param {Object[]} updateRequests
 * @return {Promise}
 */
export function updateAclsForEntityTypes(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type`
 *
 * @param {Object[]} entityTypeFqns
 * @return {Promise}
 */
export function removeAclsForEntityTypes(entityTypeFqns :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}`, {
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
 * `POST /entity/set`
 *
 * @param {Object[]} updateRequests
 * @return {Promise}
 */
export function updateAclsForEntitySets(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set`
 *
 * @param {string[]} entitySetNames
 * @return {Promise}
 */
export function removeAclsForEntitySets(entitySetNames :string[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}`, {
      data: entitySetNames
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/type/property/type`
 *
 * @param {Object[]} updateRequests
 * @return {Promise}
 */
export function updateAclsForPropertyTypesInEntityTypes(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/property/type`
 *
 * @param {Object[]} removeRequests
 * @return {Promise}
 */
export function removeAclsForPropertyTypesInEntityTypes(removeRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}`, {
      data: removeRequests
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `POST /entity/set/property/type`
 *
 * @param {Object[]} updateRequests
 * @return {Promise}
 */
export function updateAclsForPropertyTypesInEntitySets(updateRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .post(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`, updateRequests)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/set/property/type`
 *
 * @param {Object[]} removeRequests
 * @return {Promise}
 */
export function removeAclsForPropertyTypesInEntitySets(removeRequests :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}`, {
      data: removeRequests
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}

/**
 * `DELETE /entity/type/property/type/all`
 *
 * @param {Object[]} entityTypeFqns
 * @return {Promise}
 */
export function removeAllAclsForPropertyTypesInEntityTypes(entityTypeFqns :Object[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_TYPE_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`, {
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
 * `DELETE /entity/set/property/type/all`
 *
 * @param {string[]} entitySetNames
 * @return {Promise}
 */
export function removeAllAclsForPropertyTypesInEntitySets(entitySetNames :string[]) :Promise<> {

  return getApiAxiosInstance(PERMISSIONS_API)
    .delete(`/${ENTITY_SET_PATH}/${PROPERTY_TYPE_PATH}/${ALL_PATH}`, {
      data: entitySetNames
    })
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
