import { Map, OrderedMap } from 'immutable';

import * as ApiNames from './ApiNames';

/* eslint-disable key-spacing */
const EXPECTED_APIS = Map({
  APP_API              : 'AppApi',
  AUTHORIZATIONS_API   : 'AuthorizationsApi',
  CODEX_API            : 'CodexApi',
  COLLABORATIONS_API   : 'CollaborationsApi',
  DATA_API             : 'DataApi',
  DATA_INTEGRATION_API : 'DataIntegrationApi',
  DATA_SETS_API        : 'DataSetsApi',
  DATA_SET_METADATA_API:'DataSetMetadataApi',
  EDM_API              : 'EntityDataModelApi',
  ENTITY_SETS_API      : 'EntitySetsApi',
  ORGANIZATIONS_API    : 'OrganizationsApi',
  PERMISSIONS_API      : 'PermissionsApi',
  PERSISTENT_SEARCH_API: 'PersistentSearchApi',
  PRINCIPALS_API       : 'PrincipalsApi',
  SEARCH_API           : 'SearchApi',
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
