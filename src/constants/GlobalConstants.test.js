import { Map, OrderedMap } from 'immutable';

import * as GlobalConstants from './GlobalConstants';

const EXPECTED = Map({
  OPENLATTICE_ID_FQN: 'openlattice.@id'
}).sortBy((value, key) => key);

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
