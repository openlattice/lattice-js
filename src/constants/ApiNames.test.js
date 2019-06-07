import { Map, OrderedMap } from 'immutable';

import * as ApiNames from './ApiNames';

/* eslint-disable key-spacing */
const EXPECTED_APIS = Map({
  ANALYSIS_API         : 'AnalysisApi',
  APP_API              : 'AppApi',
  AUTHORIZATION_API    : 'AuthorizationApi',
  DATA_API             : 'DataApi',
  DATA_INTEGRATION_API : 'DataIntegrationApi',
  EDM_API              : 'EntityDataModelApi',
  FEEDS_API            : 'FeedsApi',
  LINKING_API          : 'LinkingApi',
  ORGANIZATIONS_API    : 'OrganizationsApi',
  PERMISSIONS_API      : 'PermissionsApi',
  PERSISTENT_SEARCH_API: 'PersistentSearchApi',
  PRINCIPALS_API       : 'PrincipalsApi',
  REQUESTS_API         : 'RequestsApi',
  SEARCH_API           : 'SearchApi',
  SUBSCRIPTION_API     : 'SubscriptionApi',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('ApiNames', () => {

  test('should only export expected APIs', () => {
    expect(OrderedMap(ApiNames)).toEqual(EXPECTED_APIS);
  });

  EXPECTED_APIS.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(ApiNames).toHaveProperty(key);
      expect(ApiNames[key]).toEqual(value);
    });
  });

});
