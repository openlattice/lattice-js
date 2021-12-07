/* eslint-disable import/no-named-as-default-member */
import { OrderedMap } from 'immutable';

import Lattice from './index';
import { OBJECT_TAG } from './utils/testing/TestUtils';

import PACKAGE from '../package.json';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  AppApi             : { size: 6 },
  AuthorizationsApi  : { size: 1 },
  CodexApi           : { size: 1 },
  DataApi            : { size: 12 },
  DataIntegrationApi : { size: 1 },
  DataSetMetadataApi : { size: 7 },
  DataSetsApi        : { size: 4 },
  EntityDataModelApi : { size: 27 },
  EntitySetsApi      : { size: 10 },
  OrganizationsApi   : { size: 35 },
  PermissionsApi     : { size: 5 },
  PersistentSearchApi: { size: 4 },
  PrincipalsApi      : { size: 10 },
  SearchApi          : { size: 4 },
  Constants          : { size: 8 },
  Models             : { size: 18 },
  Types              : { size: 12 },
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
