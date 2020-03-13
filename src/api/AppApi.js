/*
 * @flow
 */

import FQN from '../models/FQN';
import Logger from '../utils/Logger';
import { APP_API } from '../constants/ApiNames';
import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH,
} from '../constants/UrlConstants';
import { isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID, isValidUUIDArray } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type {
  App,
  AppType,
  OrganizationObject,
  PrincipalObject,
} from '../models';

const LOG = new Logger('AppApi');

// TODO: this belongs in an AppConfig model
type AppConfig = {|
  appId :UUID;
  config :Object;
  description ?:string;
  id ?:UUID;
  organization :OrganizationObject;
  principal :PrincipalObject;
  title :string;
|};

/**
 * `GET /app/`
 *
 * Gets all App definitions.
 *
 * @static
 * @memberof lattice.AppApi
 * @return {Promise<App[]>} - a Promise that resolves with all App definitions
 *
 * @example
 * AppApi.getApps();
 */
function getAllApps() :Promise<App[]> {

  return getApiAxiosInstance(APP_API)
    .get('/')
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /app/{id}`
 * `GET /app/lookup/{name}`
 *
 * Gets the App definition for the given App id or App name.
 *
 * @static
 * @memberof lattice.AppApi
 * @param {(UUID|string)} idOrName
 * @return {Promise<App>} - a Promise that resolves with the App definition
 *
 * @example
 * AppApi.getApp("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 * AppApi.getApp("AppName");
 */
function getApp(idOrName :UUID | string) :Promise<App> {

  if (isValidUUID(idOrName)) {
    return getApiAxiosInstance(APP_API)
      .get(`/${idOrName}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (isNonEmptyString(idOrName)) {
    return getApiAxiosInstance(APP_API)
      .get(`/${LOOKUP_PATH}/${idOrName}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  const errorMsg = 'invalid parameter: "idOrName" must be a valid UUID or a non-empty string';
  LOG.error(errorMsg, idOrName);
  return Promise.reject(errorMsg);
}

/**
 * `GET /app/config/{id}`
 *
 * Gets the AppConfig definitions for the given App id.
 *
 * @static
 * @memberof lattice.AppApi
 * @param {UUID} id
 * @return {Promise<AppConfig[]>} - a Promise that resolves with the AppConfig definitions
 *
 * @example
 * AppApi.getAppConfigs("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getAppConfigs(id :UUID) :Promise<AppConfig[]> {

  let errorMsg = '';

  if (!isValidUUID(id)) {
    errorMsg = 'invalid parameter: id must be a valid UUID';
    LOG.error(errorMsg, id);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${CONFIG_PATH}/${id}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /app/type/{id}`
 * `GET /app/type/lookup/{namespace}/{name}`
 *
 * Gets the AppType definition for the given AppType UUID or AppType FQN.
 *
 * @static
 * @memberof lattice.AppApi
 * @param {(UUID|FQN)} idOrFQN
 * @return {Promise<AppType>} - a Promise that resolves with the AppType definition
 *
 * @example
 * AppApi.getAppType("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 * AppApi.getAppType("ol.apptype");
 * AppApi.getAppType({ "namespace": "ol", "name": "apptype" });
 */
function getAppType(idOrFQN :UUID | FQN) :Promise<AppType> {

  if (isValidUUID(idOrFQN)) {
    return getApiAxiosInstance(APP_API)
      .get(`/${TYPE_PATH}/${idOrFQN}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (FQN.isValid(idOrFQN)) {
    const fqn = FQN.of(idOrFQN);
    return getApiAxiosInstance(APP_API)
      .get(`/${TYPE_PATH}/${LOOKUP_PATH}/${fqn.getNamespace()}/${fqn.getName()}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  const errorMsg = 'invalid parameter: "idOrFQN" must be a valid UUID or FQN';
  LOG.error(errorMsg, idOrFQN);
  return Promise.reject(errorMsg);
}

/**
 * `GET /app/type`
 *
 * Gets the AppType definitions for the given AppType ids.
 *
 * @static
 * @memberof lattice.AppApi
 * @param {UUID[]} ids
 * @return {Promise<Map<UUID, AppType>>} - a Promise that resolves with a map of AppType id to AppTypes
 *
 * @example
 * AppApi.getAppTypes([
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
 * ]);
 */
function getAppTypes(ids :UUID[]) :Promise<Map<UUID, AppType>> {

  let errorMsg = '';

  if (!isValidUUIDArray(ids)) {
    errorMsg = 'invalid parameter: ids must be a valid UUID array';
    LOG.error(errorMsg, ids);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${TYPE_PATH}/${BULK_PATH}`, ids)
    .then((axiosResponse) => axiosResponse.data)
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
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * AppApi.installApp(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "app_prefix"
 * );
 */
function installApp(appId :UUID, organizationId :UUID, prefix :string) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(appId)) {
    errorMsg = 'invalid parameter: "appId" must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyString(prefix)) {
    errorMsg = 'invalid parameter: "prefix" must be a non-empty string';
    LOG.error(errorMsg, prefix);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${INSTALL_PATH}/${appId}/${organizationId}/${prefix}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getAllApps,
  getApp,
  getAppConfigs,
  getAppType,
  getAppTypes,
  installApp,
};
