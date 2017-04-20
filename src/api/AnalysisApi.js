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

const LOG = new Logger('AnalysisApi');

/**
 * TODO: everything
 */
export function getTopUtilizers(entitySetId :UUID, propertyTypeIds :UUID[], count :number) :Promise<> {

  return getApiAxiosInstance(ANALYSIS_API)
    .post(`/${entitySetId}/${count}`, propertyTypeIds)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}
