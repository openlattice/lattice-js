import { Map, OrderedMap } from 'immutable';

import * as GlobalConstants from './GlobalConstants';

/* eslint-disable key-spacing */
const EXPECTED = Map({
  AT_CLASS           : '@class',
  AT_ID              : '@id',
  OPENLATTICE_ID_FQN : 'openlattice.@id',
  ROLE_PKG           : 'com.openlattice.organization.roles.Role',
}).sortBy((value, key) => key);
/* eslint-enable */

describe('GlobalConstants', () => {

  test('should only export expected constants', () => {
    expect(OrderedMap(GlobalConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(GlobalConstants).toHaveProperty(key);
      expect(GlobalConstants[key]).toEqual(value);
    });
  });

});
