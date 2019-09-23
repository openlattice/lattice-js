/*
 * @flow
 */

/* eslint-disable import/prefer-default-export */

/**
 * AnalysisApi ...
 *
 * @module AnalysisApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.AnalysisApi.get...
 *
 * @example
 * import { AnalysisApi } from 'lattice';
 * // AnalysisApi.get...
 */

import Logger from '../utils/Logger';

import { ANALYSIS_API } from '../constants/ApiNames';
import { TYPES_PATH } from '../constants/UrlConstants';
import { getApiAxiosInstance } from '../utils/axios';
import { isNonEmptyString } from '../utils/LangUtils';
import { isValidUUID } from '../utils/ValidationUtils';

const LOG = new Logger('AnalysisApi');

/**
 * `GET /analysis/{uuid}/{count}`
 *
 * Gets the top rows of data for the given EntitySet UUID.
 *
 * @static
 * @memberof lattice.AnalysisApi
 * @param {UUID} entitySetId
 * @param {number} count
 * @param {Object} options
 * @param {string} fileType (optional)
 * @returns {Promise<SetMultimap<Object, Object>>} - a Promise that will resolve with the data as its fulfillment value
 *
 * @example
 * AnalysisApi.getTopUtilizers(
 *   "ec6865e6-e60e-424b-a071-6a9c1603d735",
 *   100,
 *   {
 *     "associationTypeId": "8f79e123-3411-4099-a41f-88e5d22d0e8d",
 *     "neighborTypeIds": [
 *       "fae6af98-2675-45bd-9a5b-1619a87235a8",
 *       "4b08e1f9-4a00-4169-92ea-10e377070220"
 *     ],
 *     "utilizerIsSrc": false
 *   }
 *   "json"
 * );
 */
export function getTopUtilizers(
  entitySetId :UUID,
  count :number,
  options :Object,
  fileType :?string
) :Promise<*> {

  // TODO: everything

  let url :string = `/${entitySetId}/${count}`;
  if (isNonEmptyString(fileType)) {
    url = `${url}?fileType=${fileType}`;
  }

  return getApiAxiosInstance(ANALYSIS_API)
    .post(url, options)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

/**
 * `GET /analysis/{uuid}/types`
 *
 * Gets all available association types and neighbor types for a given entity set id
 *
 * @static
 * @memberof lattice.AnalysisApi
 * @param {UUID} entitySetId
 * @returns {Promise<Set<Object>} - a Promise that will resolve with the data as its fulfillment value
 *
 * @example
 * AnalysisApi.getNeighborTypes("ec6865e6-e60e-424b-a071-6a9c1603d735");
 */
export function getNeighborTypes(entitySetId :UUID) :Promise<*> {

  let errorMsg = '';

  if (!isValidUUID(entitySetId)) {
    errorMsg = 'invalid parameter: entitySetId must be a valid UUID';
    LOG.error(errorMsg, entitySetId);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(ANALYSIS_API)
    .get(`/${entitySetId}/${TYPES_PATH}`)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
