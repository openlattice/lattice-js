/*
 * @flow
 */

import Logger from '../utils/Logger';

import {
  APP_API
} from '../constants/ApiNames';

import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH
} from '../constants/ApiPaths';

import {
  getApiAxiosInstance
} from '../utils/axios';

import {
  isNonEmptyString
} from '../utils/LangUtils';

import {
  isValidUuid,
  isValidUuidArray
} from '../utils/ValidationUtils';

const LOG = new Logger('AppApi');

/**
  * `GET /app/`
  *
  * Loads all apps.
  *
  * @static
  * @memberof lattice.AppApi
  * @return {Promise<Object[]>} - a Promise that will resolve with a list of all apps
  *
  * @example
  * AppApi.getApps();
  */
export function getApps() :Promise<*> {

  return getApiAxiosInstance(APP_API)
    .get('/')
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/{appId}`
  *
  * Loads app with provided id
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @return {Promise<Object>} - a Promise that will resolve with the details of an app
  *
  * @example
  * AppApi.getApp("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
  */

export function getApp(appId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${appId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/{appName}`
  *
  * Loads app with provided name
  *
  * @static
  * @memberof lattice.AppApi
  * @param {string} appName
  * @return {Promise<Object>} - a Promise that will resolve with the details of an app
  *
  * @example
  * AppApi.getAppByName("bhr");
  */

export function getAppByName(appName :string) :Promise<*> {

  let errorMsg = '';

  if (!isNonEmptyString(appName)) {
    errorMsg = 'invalid parameter: appName must be a non-empty string';
    LOG.error(errorMsg, appName);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${LOOKUP_PATH}/${appName}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/type`
  *
  * Loads app type objects for provided ids
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID[]} appTypeIds
  * @return {Promise<Object>} - a Promise that will resolve with a mapping from app type ids to app types
  *
  * @example
  * AppApi.getAppTypeIds([
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
  * ]);
  */

export function getAppTypesForAppTypeIds(appTypeIds :UUID[]) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuidArray(appTypeIds)) {
    errorMsg = 'invalid parameter: appTypeIds must be a valid UUID array';
    LOG.error(errorMsg, appTypeIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${TYPE_PATH}/${BULK_PATH}`, appTypeIds)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/config/{appId}`
  *
  * Loads all available configurations for a provided app id
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @return {Promise<Object[]>} - a Promise that will resolve with all available configurations for an app
  *
  * @example
  * AppApi.getConfigurations("ec6865e6-e60e-424b-a071-6a9c1603d735");
  */
export function getConfigurations(appId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${CONFIG_PATH}/${appId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/install/{appId}/{organizationId}/{prefix}`
  *
  * Installs an app for an organization.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @param {UUID} organizationId
  * @param {string} prefix
  * @return {Promise} - a Promise that will resolve without a value after creating an app for an organization
  *
  * @example
  * AppApi.installApp(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
  *   "app_prefix"
  * );
  */
export function installApp(appId :UUID, organizationId :UUID, prefix :string) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(prefix)) {
    errorMsg = 'invalid parameter: prefix must be a non-empty string';
    LOG.error(errorMsg, prefix);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${INSTALL_PATH}/${appId}/${organizationId}/${prefix}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
