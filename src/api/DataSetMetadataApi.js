/*
 * @flow
 */

/**
 * DataSetMetadataApi ...
 *
 * @module DataSetMetadataApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.DataSetMetadataApi.get...
 *
 * @example
 * import { DataSetMetadataApi } from 'lattice';
 * // DataSetMetadataApi.get...
 */

import Logger from '../utils/Logger';
import { DATA_SET_METADATA_API } from '../constants/ApiNames';
import { COLUMNS_PATH, DATA_SETS_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { isNonEmptyArray, isNonEmptyObject } from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';
import { getApiAxiosInstance } from '../utils/axios';
import type { UUID } from '../types';

const LOG = new Logger('DataSetMetadataApi');

type SecurableObjectMetadata = {
  contacts :string[];
  description :string;
  flags :string[];
  metadata :Object;
  title :string;
};

type DataSetMetadata = {
  dataSetType :'EntitySet' | 'ExternalTable';
  externalId :UUID;
  id :UUID;
  metadata :SecurableObjectMetadata;
  name :string;
  organizationId :UUID;
};

type DataSetColumnMetadata = {
  dataSetId :UUID;
  dataType :string;
  id :UUID;
  metadata :SecurableObjectMetadata;
  name :string;
  organizationId :UUID;
};

/**
 * `GET /metadata/datasets/{dataSetId}`
 *
 * Gets the data set metadata object with the given data set id.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID} dataSetId
 * @returns {Promise<DataSetMetadata>}
 *
 * @example
 * DataSetMetadataApi.getDataSetMetadata("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
function getDataSetMetadata(dataSetId :UUID) :Promise<DataSetMetadata> {

  let errorMsg = '';

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .get(`/${DATA_SETS_PATH}/${dataSetId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /metadata/datasets`
 *
 * Gets the data set metadata objects with the given data set ids.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID[]} dataSetIds
 * @returns {Promise<Map<UUID, DataSetMetadata>>}
 *
 * @example
 * DataSetMetadataApi.getDataSetsMetadata(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
function getDataSetsMetadata(dataSetIds :UUID[]) :Promise<Map<UUID, DataSetMetadata>> {

  let errorMsg = '';

  if (!isNonEmptyArray(dataSetIds)) {
    errorMsg = 'invalid parameter: "dataSetIds" must be a non-empty array';
    LOG.error(errorMsg, dataSetIds);
    return Promise.reject(errorMsg);
  }

  if (!dataSetIds.every(isValidUUID)) {
    errorMsg = 'invalid parameter: "dataSetIds" must be an array of valid UUIDs';
    LOG.error(errorMsg, dataSetIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .post(`/${DATA_SETS_PATH}`, dataSetIds)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /metadata/columns/{dataSetId}/{columnId}`
 *
 * Gets the data set column metadata object with the given data set id and column id.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID} dataSetId
 * @param {UUID} columnId
 * @returns {Promise<DataSetColumnMetadata>}
 *
 * @example
 * DataSetMetadataApi.getDataSetColumnMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8"
 * );
 */
function getDataSetColumnMetadata(dataSetId :UUID, columnId :UUID) :Promise<DataSetColumnMetadata> {

  let errorMsg = '';

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(columnId)) {
    errorMsg = 'invalid parameter: "columnId" must be a valid UUID';
    LOG.error(errorMsg, columnId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .get(`/${COLUMNS_PATH}/${dataSetId}/${columnId}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `POST /metadata/columns`
 *
 * Gets all data set column metadata objects that belong to data sets with the given data set ids.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID[]} dataSetIds
 * @returns {Promise<Map<UUID, DataSetColumnMetadata[]>>}
 *
 * @example
 * DataSetMetadataApi.getDataSetColumnsMetadata(["ec6865e6-e60e-424b-a071-6a9c1603d735"]);
 */
function getDataSetColumnsMetadata(dataSetIds :UUID[]) :Promise<Map<UUID, DataSetColumnMetadata[]>> {

  let errorMsg = '';

  if (!isNonEmptyArray(dataSetIds)) {
    errorMsg = 'invalid parameter: "dataSetIds" must be a non-empty array';
    LOG.error(errorMsg, dataSetIds);
    return Promise.reject(errorMsg);
  }

  if (!dataSetIds.every(isValidUUID)) {
    errorMsg = 'invalid parameter: "dataSetIds" must be an array of valid UUIDs';
    LOG.error(errorMsg, dataSetIds);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .post(`/${COLUMNS_PATH}`, dataSetIds)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /metadata/update/{dataSetId}`
 *
 * Applies the given metadata updates to the data set with the given data set id.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID} dataSetId
 * @param {Object} metadata
 * @returns {Promise<void>}
 *
 * @example
 * DataSetMetadataApi.updateDataSetMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   {
 *     "title": "new title",
 *     "description": "new description"
 *   }
 * );
 */
function updateDataSetMetadata(dataSetId :UUID, metadata :Object) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: "metadata" must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .patch(`/${UPDATE_PATH}/${dataSetId}`, metadata)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `PATCH /metadata/update/{dataSetId}/{columnId}`
 *
 * Applies the given metadata updates to the data set with the given data set id.
 *
 * @static
 * @memberof lattice.DataSetMetadataApi
 * @param {UUID} dataSetId
 * @param {UUID} columnId
 * @param {Object} metadata
 * @returns {Promise<void>}
 *
 * @example
 * DataSetMetadataApi.updateDataSetColumnMetadata(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *   {
 *     "title": "new title",
 *     "description": "new description"
 *   }
 * );
 */
function updateDataSetColumnMetadata(dataSetId :UUID, columnId :UUID, metadata :Object) :Promise<void> {

  let errorMsg = '';

  if (!isValidUUID(dataSetId)) {
    errorMsg = 'invalid parameter: "dataSetId" must be a valid UUID';
    LOG.error(errorMsg, dataSetId);
    return Promise.reject(errorMsg);
  }

  if (!isValidUUID(columnId)) {
    errorMsg = 'invalid parameter: "columnId" must be a valid UUID';
    LOG.error(errorMsg, columnId);
    return Promise.reject(errorMsg);
  }

  if (!isNonEmptyObject(metadata)) {
    errorMsg = 'invalid parameter: "metadata" must be a non-empty object';
    LOG.error(errorMsg, metadata);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(DATA_SET_METADATA_API)
    .patch(`/${UPDATE_PATH}/${dataSetId}/${columnId}`, metadata)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  getDataSetMetadata,
  getDataSetColumnMetadata,
  getDataSetColumnsMetadata,
  getDataSetsMetadata,
  updateDataSetColumnMetadata,
  updateDataSetMetadata,
};
