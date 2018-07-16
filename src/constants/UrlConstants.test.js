import Immutable from 'immutable';

import * as UrlConstants from './UrlConstants';

/* eslint-disable key-spacing */
const EXPECTED = Immutable.OrderedMap({
  FILE_TYPE : 'fileType',
  SET_ID    : 'setId',
}).sort();
/* eslint-enable */

describe('UrlConstants', () => {

  test('should only export expected constants', () => {
    expect(Immutable.OrderedMap(UrlConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(UrlConstants).toHaveProperty(key);
      expect(UrlConstants[key]).toEqual(value);
    });
  });

});
