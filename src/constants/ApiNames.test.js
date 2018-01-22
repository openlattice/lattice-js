import Immutable from 'immutable';

import * as ApiNames from './ApiNames';

/* eslint-disable key-spacing */
const API_NAMES_MAP = Immutable.OrderedMap({
  ANALYSIS_API      : 'AnalysisApi',
  APP_API           : 'AppApi',
  AUTHORIZATION_API : 'AuthorizationApi',
  DATA_API          : 'DataApi',
  DATA_SOURCES_API  : 'DataSourcesApi',
  EDM_API           : 'EntityDataModelApi',
  LINKING_API       : 'LinkingApi',
  ORGANIZATIONS_API : 'OrganizationsApi',
  PERMISSIONS_API   : 'PermissionsApi',
  PRINCIPALS_API    : 'PrincipalsApi',
  REQUESTS_API      : 'RequestsApi',
  SEARCH_API        : 'SearchApi',
  SYNC_API          : 'SyncApi'
}).sort();
/* eslint-enable */

describe('ApiNames', () => {

  test('should be kept in sync with test file', () => {
    expect(Object.keys(ApiNames)).toEqual(API_NAMES_MAP.keySeq().toJS());
    expect(Object.values(ApiNames)).toEqual(API_NAMES_MAP.valueSeq().toJS());
  });

});
