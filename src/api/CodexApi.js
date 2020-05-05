/*
 * @flow
 */

/**
 * CodexApi ...
 *
 * @module CodexApi
 * @memberof lattice
 *
 * @example
 * import Lattice from 'lattice';
 * // Lattice.CodexApi.create...
 *
 * @example
 * import { CodexApi } from 'lattice';
 * // CodexApi.create...
 */

import Logger from '../utils/Logger';
import { CODEX_API } from '../constants/ApiNames';
import { isNonEmptyObject } from '../utils/LangUtils';
import { getApiAxiosInstance } from '../utils/axios';

const LOG = new Logger('CodexApi');

/**
 * `POST /codex`
 *
 * Sends a text message
 *
 * @static
 * @memberof lattice.CodexApi
 * @param {Object} messageRequest
 * @returns {Promise} - a Promise that resolves without a value
 *
 * @example
 * CodexApi.sendOutgoingText(
 *   {
 *     "organizationId": "8975812d-0325-4934-83a9-5b41bebd4c67",
 *     "messageContents": "This is a message.",
 *     "phoneNumber": "+19876543210"
 *   }
 * );
 */
function sendOutgoingText(messageRequest :Object) :Promise<void> {

  let errorMsg = '';

  // TODO: needs more validation
  if (!isNonEmptyObject(messageRequest)) {
    errorMsg = 'invalid parameter: "messageRequest" must be a non-empty object';
    LOG.error(errorMsg, messageRequest);
    return Promise.reject(errorMsg);
  }

  return getApiAxiosInstance(CODEX_API)
    .post('/', messageRequest)
    .then((axiosResponse) => axiosResponse.data)
    .catch((error :Error) => {
      LOG.error(error);
      return Promise.reject(error);
    });
}

export {
  sendOutgoingText,
};
