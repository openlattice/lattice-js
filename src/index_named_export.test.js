/* eslint-disable import/no-named-as-default-member */
import { OrderedMap } from 'immutable';

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import * as Lattice from './index';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  AppApi             : { size: 7 },
  AuthorizationApi   : { size: 1 },
  CodexApi           : { size: 1 },
  DataApi            : { size: 19 },
  DataIntegrationApi : { size: 2 },
  EntityDataModelApi : { size: 51 },
  EntitySetsApi      : { size: 8 },
  OrganizationsApi   : { size: 32 },
  PermissionsApi     : { size: 4 },
  PersistentSearchApi: { size: 5 },
  PrincipalsApi      : { size: 7 },
  SearchApi          : { size: 14 },
  Constants          : { size: 8 },
  Models             : { size: 18 },
  Types              : { size: 12 },
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
