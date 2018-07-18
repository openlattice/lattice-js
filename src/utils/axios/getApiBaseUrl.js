/*
 * @flow
 */

import { Map, OrderedMap } from 'immutable';

import * as ApiNames from '../../constants/ApiNames';
import * as UrlConstants from '../../constants/UrlConstants';
import { getConfig } from '../../config/Configuration';
import { isNonEmptyString } from '../LangUtils';

/* eslint-disable key-spacing */
const API_TO_PATH_MAP :Map<string, string> = OrderedMap({
  [ApiNames.ANALYSIS_API]         : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.ANALYSIS_PATH}`,
  [ApiNames.APP_API]              : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.APP_PATH}`,
  [ApiNames.AUTHORIZATION_API]    : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.AUTHORIZATIONS_PATH}`,
  [ApiNames.DATA_API]             : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.DATA_PATH}`,
  [ApiNames.DATA_INTEGRATION_API] : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.INTEGRATION_PATH}`,
  [ApiNames.DATA_SOURCES_API]     : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.DATA_SOURCES_PATH}`,
  [ApiNames.EDM_API]              : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.EDM_PATH}`,
  [ApiNames.LINKING_API]          : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.LINKING_PATH}`,
  [ApiNames.ORGANIZATIONS_API]    : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.ORGANIZATIONS_PATH}`,
  [ApiNames.PERMISSIONS_API]      : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.PERMISSIONS_PATH}`,
  [ApiNames.PRINCIPALS_API]       : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.PRINCIPALS_PATH}`,
  [ApiNames.REQUESTS_API]         : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.REQUESTS_PATH}`,
  [ApiNames.SEARCH_API]           : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.SEARCH_PATH}`,
});
/* eslint-enable */

export default function getApiBaseUrl(api :string) :string {

  if (!isNonEmptyString(api)) {
    throw new Error('invalid parameter: api must be a non-empty string');
  }

  if (!API_TO_PATH_MAP.has(api)) {
    throw new Error(`unknown api: ${api}`);
  }

  return `${getConfig().get('baseUrl')}/${API_TO_PATH_MAP.get(api)}`;
}
