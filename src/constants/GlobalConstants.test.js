import Immutable from 'immutable';

import * as GlobalConstants from './GlobalConstants';

const EXPECTED = Immutable.OrderedMap({
  OPENLATTICE_ID_FQN: 'openlattice.@id'
}).sort();

describe('GlobalConstants', () => {

  test('should only export expected constants', () => {
    expect(Immutable.OrderedMap(GlobalConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(GlobalConstants).toHaveProperty(key);
      expect(GlobalConstants[key]).toEqual(value);
    });
  });

});
