/*
 * @flow
 */

/**
 * DataSetsApi ...
 *
 * @module DataSetsApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataSetsApi.check...
 *
 * @example
 * import { DataSetsApi } from 'lattice';
 * // DataSetsApi.get...
 */

import _isInteger from 'lodash/isInteger';

import Logger from '../utils/Logger';
import { DATA_SETS_API } from '../constants/ApiNames';
import { DATA_PATH, EXTERNAL_DB_COLUMN_PATH, EXTERNAL_DB_TABLE_PATH } from '../constants/UrlConstants';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('DataSetsApi');

/**
 * `GET /{organizationId}/{dataSetId}/external-database-table`
 * `GET /{organizationId}/{dataSetId}/external-database-table/external-database-column`
 *
 * @static
 * @memberof lattice.DataSetsApi
 * @param {UUID} organizationId
 * @param {UUID} dataSetId
 * @param {boolean} columns
 * @returns {Promise<Object>}
 */
function getOrganizationDataSet(organizationId :UUID, dataSetId :UUID, columns :?boolean = true) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  if (columns === true) {
    return getApiAxiosInstance(DATA_SETS_API)
      .get(`/${organizationId}/${dataSetId}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (columns === false) {
    return getApiAxiosInstance(DATA_SETS_API)
      .get(`/${organizationId}/${dataSetId}/${EXTERNAL_DB_TABLE_PATH}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  errorMsg = 'invalid parameter: "columns" must be a boolean';
  LOG.error(errorMsg, columns);
  return Promise.reject(errorMsg);
}

/**
 * `GET /{organizationId}/external-database-table`
 * `GET /{organizationId}/external-database-table/external-database-column`
 *
 * @static
 * @memberof lattice.DataSetsApi
 * @param {UUID} organizationId
 * @param {boolean} columns
 * @returns {Promise<Object>}
 */
function getOrganizationDataSets(organizationId :UUID, columns :?boolean = true) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (columns === true) {
    return getApiAxiosInstance(DATA_SETS_API)
      .get(`/${organizationId}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  if (columns === false) {
    return getApiAxiosInstance(DATA_SETS_API)
      .get(`/${organizationId}/${EXTERNAL_DB_TABLE_PATH}`)
      .then((axiosResponse) => axiosResponse.data)
      .catch((error :Error) => {
        LOG.error(error);
        return Promise.reject(error);
      });
  }

  errorMsg = 'invalid parameter: "columns" must be a boolean';
  LOG.error(errorMsg, columns);
  return Promise.reject(errorMsg);
}

/**
 * `GET /{organizationId}/{dataSetId}/{count}/data`
 *
 * @static
 * @memberof lattice.DataSetsApi
 * @param {UUID} organizationId
 * @param {UUID} dataSetId
 * @param {number} count
 * @returns {Promise<Object>}
 */
function getOrganizationDataSetData(organizationId :UUID, dataSetId :UUID, count :?number = 10) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  if (!_isInteger(count) || count <= 0) {
    errorMsg = 'invalid parameter: "count" must be a positive integer';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SETS_API)
    .get(`/${organizationId}/${dataSetId}/${count}/${DATA_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getOrganizationDataSet,
  getOrganizationDataSets,
  getOrganizationDataSetData,
};
