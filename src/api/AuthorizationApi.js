/*
 * @flow
 */

/**
 * AuthorizationApi ...
 *
 * @module AuthorizationApi
 * @memberof loom-data
 *
 * @example
 * import Loom from 'loom-data';
 * // Loom.AuthorizationApi.check...
 *
 * @example
 * import { AuthorizationApi } from 'loom-data';
 * // AuthorizationApi.check...
 */

import Logger from '../utils/Logger';

import {
  AUTHORIZATION_API
} from '../constants/ApiNames';

import {
  getApiAxiosInstance
} from '../utils/AxiosUtils';

const LOG = new Logger('AuthorizationApi');

/**
 * `POST /authorizations`
 *
 * TODO: add documentation
 * TODO: add validation
 * TODO: add unit tests
 * TODO: create data models
 */
export function checkAuthorizations(queries :AccessCheck[]) :Promise<> {

  return getApiAxiosInstance(AUTHORIZATION_API)
    .post('/', queries)
    .then((axiosResponse) => {
      return axiosResponse.data;
    })
    .catch((e) => {
      LOG.error(e);
    });
}
