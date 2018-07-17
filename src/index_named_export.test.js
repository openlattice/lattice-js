/* eslint-disable import/no-named-as-default-member */
import Immutable from 'immutable';

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import * as Lattice from './index';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = Immutable.OrderedMap({
  AnalysisApi        : { size: 2 },
  AppApi             : { size: 18 },
  AuthorizationApi   : { size: 2 },
  DataApi            : { size: 10 },
  DataIntegrationApi : { size: 1 },
  DataSourcesApi     : { size: 5 },
  EntityDataModelApi : { size: 57 },
  LinkingApi         : { size: 2 },
  OrganizationsApi   : { size: 23 },
  PermissionsApi     : { size: 2 },
  PrincipalsApi      : { size: 7 },
  RequestsApi        : { size: 3 },
  SearchApi          : { size: 12 },
  Constants          : { size: 1 },
  Models             : { size: 41 },
  Types              : { size: 6 },
});
/* eslint-enable key-spacing */

describe('lattice-js default export', () => {

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
