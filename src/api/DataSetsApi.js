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

import Logger from '../utils/Logger';
import { DATA_SETS_API } from '../constants/ApiNames';
import { EXTERNAL_DB_COLUMN_PATH, EXTERNAL_DB_TABLE_PATH } from '../constants/UrlConstants';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('DataSetsApi');

/**
 * `GET /external-database-table`
 *
 * @static
 * @memberof lattice.DataSetsApi
 * @param {UUID} organizationId
 * @returns {Promise<Object>}
 */
function getOrganizationDataSets(organizationId :UUID) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SETS_API)
    .get(`/${organizationId}/${EXTERNAL_DB_TABLE_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /external-database-table/external-database-column`
 *
 * @static
 * @memberof lattice.DataSetsApi
 * @param {UUID} organizationId
 * @returns {Promise<Object>}
 */
function getOrganizationDataSetsWithColumns(organizationId :UUID) :Promise<Object> {

  let errorMsg = '';

  if (!isValidUUID(organizationId)) {
    errorMsg = 'invalid parameter: "organizationId" must be a valid UUID';
    LOG.error(errorMsg, organizationId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SETS_API)
    .get(`/${organizationId}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getOrganizationDataSets,
  getOrganizationDataSetsWithColumns,
};
