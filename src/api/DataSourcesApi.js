/*
 * @flow
 */

/**
 * DataSourcesApi ...
 *
 * TODO: add description
 *
 * @module DataSourcesApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataSourcesApi.get...
 *
 * @example
 * import { DataSourcesApi } from 'lattice';
 * // DataSourcesApi.get...
 */

import Logger from '../utils/Logger';

import DataSource, { isValid as isValidDataSource } from '../models/DataSource';
import { DATA_SOURCES_API } from '../constants/ApiNames';
import { getApiAxiosInstance } from '../utils/axios';
import { isValidUuid } from '../utils/ValidationUtils';

const LOG = new Logger('DataSourcesApi');

/**
 * `GET /datasource/{uuid}`
 *
 * Gets the DataSource definition for the given DataSource UUID.
 *
 * @static
 * @memberof lattice.DataSourcesApi
 * @param {UUID} dataSourceId
 * @returns {Promise<DataSource>} - a Promise that will resolve with the DataSource definition as its fulfillment value
 *
 * @example
 * DataSourcesApi.getDataSource("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function getDataSource(dataSourceId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .get(`/${dataSourceId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /datasource`
 *
 * Creates a new DataSource definition if it doesn't exist, or updates the existing DataSource definition.
 *
 * @static
 * @memberof lattice.DataSourcesApi
 * @param {DataSource} dataSource
 * @returns {Promise<UUID>} - a Promise that will resolve with the newly-created DataSource UUID
 *
 * @example
 * DataSourcesApi.createOrUpdateDataSource(
 *   {
 *     "id": "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *     "title": "My DataSource",
 *     "description": "a DataSource to be integrated",
 *     "entitySetIds": [
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ]
 *   }
 * );
 */
export function createOrUpdateDataSource(dataSource :DataSource) :Promise<*> {

  let errorMsg = '';

  if (!isValidDataSource(dataSource)) {
    errorMsg = 'invalid parameter: dataSource must be a valid DataSource';
    LOG.error(errorMsg, dataSource);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .post('/', dataSource)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /datasource/{uuid}`
 *
 * Deletes the DataSource definition for the given DataSource UUID.
 *
 * @static
 * @memberof lattice.DataSourcesApi
 * @param {UUID} dataSourceId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataSourcesApi.deleteDataSource("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function deleteDataSource(dataSourceId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .delete(`/${dataSourceId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /datasource/{uuid}`
 *
 * @static
 * @memberof lattice.DataSourcesApi
 * @param {UUID} dataSourceId
 * @returns {Promise<UUID>} - a Promise that will resolve with the sync UUID as its fulfillment value
 *
 * @example
 * DataSourcesApi.startSync("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function startSync(dataSourceId :UUID) :Promise<*> {

  // TODO: add description

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .post(`/${dataSourceId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /datasource/{uuid}/{uuid}`
 *
 * @static
 * @memberof lattice.DataSourcesApi
 * @param {UUID} dataSourceId
 * @param {UUID} syncId
 * @return {Promise} - a Promise that resolves without a value
 *
 * @example
 * DataSourcesApi.signalSyncCompleted(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "8f79e123-3411-4099-a41f-88e5d22d0e8d"
 * );
 */
export function signalSyncCompleted(dataSourceId :UUID, syncId :UUID) :Promise<*> {

  // TODO: add description

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUuid(syncId)) {
    errorMsg = 'invalid parameter: syncId must be a valid UUID';
    LOG.error(errorMsg, syncId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .delete(`/${dataSourceId}/${syncId}`)
    .then(axiosResponse => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
