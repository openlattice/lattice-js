/*
 * @flow
 */

/**
 * AnalysisApi ...
 *
 * @module AnalysisApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.AnalysisApi.get...
 *
 * @example
 * import { AnalysisApi } from 'loom-data';
 * // AnalysisApi.get...
 */

import Logger from '../utils/Logger';

import {
  ANALYSIS_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

import {
  isNonEmptyString
} from '../utils/LangUtils';

const LOG = new Logger('AnalysisApi');

/**
 * `GET /analysis/{uuid}/{count}`
 *
 * Gets the top rows of data for the given EntitySet UUID.
 *
 * @static
 * @memberof loom-data.AnalysisApi
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
    fileType :string) :Promise<> {

  // TODO: everything

  let url: string = `/${entitySetId}/${count}`;
  if (isNonEmptyString(fileType)) {
    url = `${url}&fileType=${fileType}`;
  }

  return getApiAxiosInstance(ANALYSIS_API)
    .post(url, options)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
