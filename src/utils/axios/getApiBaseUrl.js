/*
 * @flow
 */

import Immutable from 'immutable';

import * as ApiNames from '../../constants/ApiNames';
import * as ApiPaths from '../../constants/ApiPaths';
import { getConfig } from '../../config/Configuration';
import { isNonEmptyString } from '../LangUtils';

/* eslint-disable key-spacing */
const API_TO_PATH_MAP :Map<string, string> = Immutable.OrderedMap({
  [ApiNames.ANALYSIS_API]         : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.ANALYSIS_PATH}`,
  [ApiNames.APP_API]              : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.APP_PATH}`,
  [ApiNames.AUTHORIZATION_API]    : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.AUTHORIZATIONS_PATH}`,
  [ApiNames.DATA_API]             : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.DATA_PATH}`,
  [ApiNames.DATA_INTEGRATION_API] : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.INTEGRATION_PATH}`,
  [ApiNames.DATA_SOURCES_API]     : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.DATA_SOURCES_PATH}`,
  [ApiNames.EDM_API]              : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.EDM_PATH}`,
  [ApiNames.LINKING_API]          : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.LINKING_PATH}`,
  [ApiNames.ORGANIZATIONS_API]    : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.ORGANIZATIONS_PATH}`,
  [ApiNames.PERMISSIONS_API]      : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.PERMISSIONS_PATH}`,
  [ApiNames.PRINCIPALS_API]       : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.PRINCIPALS_PATH}`,
  [ApiNames.REQUESTS_API]         : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.REQUESTS_PATH}`,
  [ApiNames.SEARCH_API]           : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.SEARCH_PATH}`,
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
