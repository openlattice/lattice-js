/*
 * @flow
 */

/**
 * DataSourcesApi ...
 *
 * TODO: add description
 *
 * @module DataSourcesApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.DataSourcesApi.get...
 *
 * @example
 * import { DataSourcesApi } from 'loom-data';
 * // DataSourcesApi.get...
 */

import Logger from '../utils/Logger';

import DataSource, {
  isValid as isValidDataSource
} from '../models/DataSource';

import {
  DATA_SOURCES_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isValidUuid
} from '../utils/ValidationUtils';

const LOG = new Logger('DataSourcesApi');

/**
 * `GET /datasource/{uuid}`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.DataSourcesApi
 * @param {UUID} dataSourceId
 * @returns {Promise<DataSource>}
 *
 * @example
 * DataSourcesApi.getDataSource("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function getDataSource(dataSourceId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .get(`/${dataSourceId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /datasource`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.DataSourcesApi
 * @param {DataSource} dataSource
 * @returns {Promise<UUID>}
 *
 * @example
 * DataSourcesApi.createOrUpdateDataSource(
 *   {
 *     "id": "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *     "title": "My DataSource",
 *     "description": "a DataSource to be integrated into Loom",
 *     "entitySetIds": [
 *       "e39dfdfa-a3e6-4f1f-b54b-646a723c3085",
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8"
 *     ]
 *   }
 * );
 */
export function createOrUpdateDataSource(dataSource :DataSource) :Promise<> {

  let errorMsg = '';

  if (!isValidDataSource(dataSource)) {
    errorMsg = 'invalid parameter: dataSource must be a valid DataSource';
    LOG.error(errorMsg, dataSource);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .post('/', dataSource)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /datasource/{uuid}`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.DataSourcesApi
 * @param {UUID} dataSourceId
 * @returns {Promise}
 *
 * @example
 * DataSourcesApi.deleteDataSource("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function deleteDataSource(dataSourceId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .delete(`/${dataSourceId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /datasource/{uuid}`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.DataSourcesApi
 * @param {UUID} dataSourceId
 * @returns {Promise<UUID>}
 *
 * @example
 * DataSourcesApi.startSync("0c8be4b7-0bd5-4dd1-a623-da78871c9d0e");
 */
export function startSync(dataSourceId :UUID) :Promise<> {

  let errorMsg = '';

  if (!isValidUuid(dataSourceId)) {
    errorMsg = 'invalid parameter: dataSourceId must be a valid UUID';
    LOG.error(errorMsg, dataSourceId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SOURCES_API)
    .post(`/${dataSourceId}`)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `DELETE /datasource/{uuid}/{uuid}`
 *
 * TODO: add description
 *
 * @static
 * @memberof loom-data.DataSourcesApi
 * @param {UUID} dataSourceId
 * @param {UUID} syncId
 * @returns {Promise}
 *
 * @example
 * DataSourcesApi.signalSyncCompleted(
 *   "0c8be4b7-0bd5-4dd1-a623-da78871c9d0e",
 *   "8f79e123-3411-4099-a41f-88e5d22d0e8d"
 * );
 */
export function signalSyncCompleted(dataSourceId :UUID, syncId :UUID) :Promise<> {

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
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
