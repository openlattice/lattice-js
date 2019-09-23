/*
 * @flow
 */
import has from 'lodash/has';
import Logger from '../utils/Logger';

import FullyQualifiedName from '../models/FullyQualifiedName';
import { APP_API } from '../constants/ApiNames';
import { PermissionTypes } from '../constants/types';
import { isValidApp } from '../models/App';
import { isValidAppType } from '../models/AppType';
import { getApiAxiosInstance } from '../utils/axios';
import { isNonEmptyString, isNonEmptyObject } from '../utils/LangUtils';
import { isValidTypeArray, isValidUuid, isValidUuidArray } from '../utils/ValidationUtils';

import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH,
  UPDATE_PATH
} from '../constants/UrlConstants';

import type { PermissionType } from '../constants/types/PermissionTypes';

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
    .then((axiosResponse) => axiosResponse.data)
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
    .then((axiosResponse) => axiosResponse.data)
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
    .then((axiosResponse) => axiosResponse.data)
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
  * AppApi.getAppTypesForAppTypeIds([
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
    .then((axiosResponse) => axiosResponse.data)
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
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app`
  *
  * Creates a new app.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {Object} app
  * @return {Promise} - a Promise that will resolve without a value after creating an app
  *
  * @example
  * AppApi.createApp({
  *   "name": "myapp",
  *   "title": "My App",
  *   "description": "This is my app.",
  *   "appTypeIds": ["ec6865e6-e60e-424b-a071-6a9c1603d735"],
  *   "url": "https://openlattice.com/my_app"
  * });
  */
export function createApp(app :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidApp(app)) {
    errorMsg = 'invalid parameter: app must be a valid App';
    LOG.error(errorMsg, app);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post('/', app)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app/type`
  *
  * Creates a new app type.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {Object} appType
  * @return {Promise} - a Promise that will resolve without a value after creating an app type
  *
  * @example
  * AppApi.createAppType({
  *   "type": {
  *     "namespace": "sample",
  *     "name": "apptype"
  *   },
  *   "title": "Sample App Type",
  *   "description": "This is a sample app type.",
  *   "entityTypeId": "ec6865e6-e60e-424b-a071-6a9c1603d735"
  * });
  */
export function createAppType(appType :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidAppType(appType)) {
    errorMsg = 'invalid parameter: appType must be a valid AppType';
    LOG.error(errorMsg, appType);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${TYPE_PATH}`, appType)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/type/{appId}`
  *
  * Loads app type with provided id
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appTypeId
  * @return {Promise<Object>} - a Promise that will resolve with the details of an app type
  *
  * @example
  * AppApi.getAppType("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
  */

export function getAppType(appTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${TYPE_PATH}/${appTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/type/lookup/{namespace}/{name}`
  *
  * Loads app type with provided namespace and name
  *
  * @static
  * @memberof lattice.AppApi
  * @param {FullyQualifiedName} appTypeFqn
  * @return {Promise<Object>} - a Promise that will resolve with the details of an app type
  *
  * @example
  * AppApi.getAppTypeByFqn(
  *   { "namespace": "LATTICE", "name": "AppType" }
  * );
  */

export function getAppTypeByFqn(appTypeFqn :FullyQualifiedName) :Promise<*> {

  let errorMsg = '';

  if (!FullyQualifiedName.isValid(appTypeFqn)) {
    errorMsg = 'invalid parameter: appTypeFqn must be a valid FQN';
    LOG.error(errorMsg, appTypeFqn);
    return Promise.reject(errorMsg);
  }

  const { namespace, name } = appTypeFqn;

  return getApiAxiosInstance(APP_API)
    .get(`/${TYPE_PATH}/${LOOKUP_PATH}/${namespace}/${name}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `DELETE /app/{appId}`
  *
  * Deletes app with provided id
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @return {Promise<Object>} - a Promise that will resolve once the specified app has been deleted.
  *
  * @example
  * AppApi.deleteApp("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
  */

export function deleteApp(appId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .delete(`/${appId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `DELETE /app/type/{appTypeId}`
  *
  * Deletes app type with provided id
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @return {Promise<Object>} - a Promise that will resolve once the specified app type has been deleted.
  *
  * @example
  * AppApi.deleteAppType("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
  */

export function deleteAppType(appTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .delete(`/${TYPE_PATH}/${appTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app/update/{appId}/{appTypeId}`
  *
  * Adds an app type to an app.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @param {UUID} appTypeId
  * @return {Promise<Object>} - a Promise that will resolve once an app type has been added to an app.
  *
  * @example
  * AppApi.addAppTypeToApp(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
  * );
  */

export function addAppTypeToApp(appId :UUID, appTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${UPDATE_PATH}/${appId}/${appTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `DELETE /app/update/{appId}/{appTypeId}`
  *
  * Removes an app type from an app.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @param {UUID} appTypeId
  * @return {Promise<Object>} - a Promise that will resolve once an app type has been removed from an app.
  *
  * @example
  * AppApi.removeAppTypeFromApp(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e"
  * );
  */

export function removeAppTypeFromApp(appId :UUID, appTypeId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .delete(`/${UPDATE_PATH}/${appId}/${appTypeId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `GET /app/update/{organizationId}/{appId}/{appTypeId}/${entitySetId}`
  *
  * Updates an entity set used for a particular organization's app config.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} organizationId
  * @param {UUID} appId
  * @param {UUID} appTypeId
  * @param {UUID} entitySetId
  * @return {Promise<Object>} - a Promise that will resolve the app config has been
  *   updated to incude the specified entity set.
  *
  * @example
  * AppApi.updateAppEntitySetConfig(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
  *   "dc6465e6-285e-424b-c927-039c1603d739",
  *   "c88be4b7-a623-d4d1-0bd5-da788719c16"
  * );
  */

export function updateAppEntitySetConfig(
  organizationId :UUID,
  appId :UUID,
  appTypeId :UUID,
  entitySetId :UUID
) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .get(`/${UPDATE_PATH}/${organizationId}/${appId}/${appTypeId}/${entitySetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app/update/{organizationId}/{appId}/{appTypeId}`
  *
  * Updates the required permissions for a particular organization's app config.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} organizationId
  * @param {UUID} appId
  * @param {UUID} appTypeId
  * @return {Promise<Object>} - a Promise that will resolve the app config has been
  *   updated to reflect the specified permissions.
  *
  * @example
  * AppApi.updateAppConfigPermissions(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
  *   "dc6465e6-285e-424b-c927-039c1603d739",
  *   ["READ", "WRITE"]
  * );
  */

export function updateAppConfigPermissions(
  organizationId :UUID,
  appId :UUID,
  appTypeId :UUID,
  permissions :PermissionType[]
) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(organizationId)) {
    errorMsg = 'invalid parameter: organizationId must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isValidTypeArray(permissions, PermissionTypes)) {
    errorMsg = 'invalid parameter: permissions must be a valid PermissionType array';
    LOG.error(errorMsg, permissions);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${UPDATE_PATH}/${organizationId}/${appId}/${appTypeId}`, permissions)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app/update/{appId}`
  *
  * Updates the specified app's metadata.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @param {Object} metadataUpdate
  * @return {Promise<Object>} - a Promise that will resolve the app metadata has been updated.
  *
  * @example
  * AppApi.updateAppMetadata(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   {
  *     "name": "newname",
  *     "title": "New App Title"
  *   }
  * );
  */

export function updateAppMetadata(appId :UUID, metadataUpdate :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appId)) {
    errorMsg = 'invalid parameter: appId must be a valid UUID';
    LOG.error(errorMsg, appId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadataUpdate)) {
    errorMsg = 'invalid parameter: metadataUpdate must be a non-empty object';
    LOG.error(errorMsg, metadataUpdate);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'name') && !isNonEmptyString(metadataUpdate.name)) {
    errorMsg = 'invalid parameter: name must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.name);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'title') && !isNonEmptyString(metadataUpdate.title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.title);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'description') && !isNonEmptyString(metadataUpdate.description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.description);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'url') && !isNonEmptyString(metadataUpdate.url)) {
    errorMsg = 'invalid parameter: url must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.url);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'id') && !isValidUuid(metadataUpdate.id)) {
    errorMsg = 'invalid parameter: id must be a valid UUID';
    LOG.error(errorMsg, metadataUpdate.id);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'appTypeIds') && !isValidUuidArray(metadataUpdate.appTypeIds)) {
    errorMsg = 'invalid parameter: appTypeIds must be a valid UUID array';
    LOG.error(errorMsg, metadataUpdate.appTypeIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${UPDATE_PATH}/${appId}`, metadataUpdate)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
  * `POST /app/type/update/{appId}`
  *
  * Updates the specified app type's metadata.
  *
  * @static
  * @memberof lattice.AppApi
  * @param {UUID} appId
  * @param {Object} metadataUpdate
  * @return {Promise<Object>} - a Promise that will resolve the app type metadata has been updated.
  *
  * @example
  * AppApi.updateAppTypeMetadata(
  *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
  *   {
  *     "description": "this is a new description."
  *   }
  * );
  */

export function updateAppTypeMetadata(appTypeId :UUID, metadataUpdate :Object) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(appTypeId)) {
    errorMsg = 'invalid parameter: appTypeId must be a valid UUID';
    LOG.error(errorMsg, appTypeId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadataUpdate)) {
    errorMsg = 'invalid parameter: metadataUpdate must be a non-empty object';
    LOG.error(errorMsg, metadataUpdate);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'type') && !FullyQualifiedName.isValid(metadataUpdate.type)) {
    errorMsg = 'invalid parameter: type must be a valid FQN';
    LOG.error(errorMsg, metadataUpdate.type);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'title') && !isNonEmptyString(metadataUpdate.title)) {
    errorMsg = 'invalid parameter: title must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.title);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'entityTypeId') && !isValidUuid(metadataUpdate.entityTypeId)) {
    errorMsg = 'invalid parameter: entityTypeId must be a valid UUID';
    LOG.error(errorMsg, metadataUpdate.entityTypeId);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'description') && !isNonEmptyString(metadataUpdate.description)) {
    errorMsg = 'invalid parameter: description must be a non-empty string';
    LOG.error(errorMsg, metadataUpdate.description);
    return Promise.reject(errorMsg);
  }

  if (has(metadataUpdate, 'id') && !isValidUuid(metadataUpdate.id)) {
    errorMsg = 'invalid parameter: id must be a valid UUID';
    LOG.error(errorMsg, metadataUpdate.id);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(APP_API)
    .post(`/${TYPE_PATH}/${UPDATE_PATH}/${appTypeId}`, metadataUpdate)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
