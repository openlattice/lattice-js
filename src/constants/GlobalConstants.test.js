import { Map, OrderedMap } from 'immutable';

import * as GlobalConstants from './GlobalConstants';

/* eslint-disable key-spacing */
const EXPECTED = Map({
  AT_CLASS                   : '@class',
  AT_ID                      : '@id',
  OPENLATTICE_COUNT_FQN      : 'openlattice.@count',
  OPENLATTICE_ID_FQN         : 'openlattice.@id',
  OPENLATTICE_LAST_INDEX_FQN : 'openlattice.@lastIndex',
  OPENLATTICE_LAST_LINK_FQN  : 'openlattice.@lastLink',
  OPENLATTICE_LAST_WRITE_FQN : 'openlattice.@lastWrite',
  OPENLATTICE_VERSION_FQN    : 'openlattice.@version',
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
