import Immutable from 'immutable';

import getApiBaseUrl from './getApiBaseUrl';
import * as ApiNames from '../../constants/ApiNames';
import * as ApiPaths from '../../constants/ApiPaths';
import * as Config from '../../config/Configuration';
import { INVALID_PARAMS_SS } from '../testing/Invalid';
import { genRandomString } from '../testing/MockUtils';

/*
 * helpers
 */

/* eslint-disable key-spacing */
const API_TO_PATH_MAP = Immutable.OrderedMap({
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
  [ApiNames.SYNC_API]             : `${ApiPaths.DATASTORE_PATH}/${ApiPaths.SYNC_PATH}`
});
/* eslint-enable */

const MOCK_BASE_URL = `https://${genRandomString()}.openlattice.com`;

/*
 * mocks
 */

jest.mock('../../config/Configuration');
Config.getConfig.mockImplementation(() => Immutable.fromJS({
  baseUrl: MOCK_BASE_URL
}));

/*
 * tests
 */

describe('AxiosUtils : getApiBaseUrl()', () => {

  test('should throw if the given API is invalid', () => {
    INVALID_PARAMS_SS.forEach((invalid) => {
      expect(() => {
        getApiBaseUrl(invalid);
      }).toThrow();
    });
  });

  test('should not throw if the given API is valid', () => {
    Object.values(ApiNames).forEach((apiName) => {
      expect(() => {
        getApiBaseUrl(apiName);
      }).not.toThrow();
    });
  });

  Object.values(ApiNames).forEach((apiName) => {
    test(`should return the correct base URL for ${apiName}`, () => {
      expect(getApiBaseUrl(apiName)).toEqual(
        `${MOCK_BASE_URL}/${API_TO_PATH_MAP.get(apiName)}`
      );
    });
  });

});
