/* eslint-disable import/no-named-as-default-member */
import { OrderedMap } from 'immutable';

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import * as Lattice from './index';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  AnalysisApi        : { size: 2 },
  AppApi             : { size: 18 },
  AuthorizationApi   : { size: 2 },
  CodexApi           : { size: 1 },
  DataApi            : { size: 17 },
  DataIntegrationApi : { size: 1 },
  EntityDataModelApi : { size: 51 },
  EntitySetsApi      : { size: 8 },
  FeedsApi           : { size: 1 },
  LinkingApi         : { size: 2 },
  OrganizationsApi   : { size: 31 },
  PermissionsApi     : { size: 3 },
  PersistentSearchApi: { size: 5 },
  PrincipalsApi      : { size: 9 },
  RequestsApi        : { size: 3 },
  SearchApi          : { size: 14 },
  SubscriptionApi    : { size: 3 },
  Constants          : { size: 3 },
  Models             : { size: 61 },
  Types              : { size: 10 },
});
/* eslint-enable key-spacing */

describe('lattice-js named export', () => {

  EXPECTED_OBJ_EXPORTS.forEach(({ size }, key) => {
    test(`should export "${key}`, () => {
      expect(Object.prototype.toString.call(Lattice[key])).toEqual(OBJECT_TAG);
      expect(Object.keys(Lattice[key])).toHaveLength(size);
    });
  });

  test('should export the correct version', () => {
    expect(Lattice.version).toEqual(PACKAGE.version);
  });

  test('should export configure()', () => {
    expect(Lattice.configure).toBeInstanceOf(Function);
  });

});
