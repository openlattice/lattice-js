import { Map, OrderedMap } from 'immutable';

import * as UrlConstants from './UrlConstants';

/* eslint-disable key-spacing */
const EXPECTED = Map({
  FILE_TYPE : 'fileType',
  PARTIAL   : 'partial',
  SET_ID    : 'setId',
}).sort();
/* eslint-enable */

describe('UrlConstants', () => {

  test('should only export expected constants', () => {
    expect(OrderedMap(UrlConstants)).toEqual(EXPECTED);
  });

  EXPECTED.forEach((value, key) => {
    test(`should export "${key}: ${value}"`, () => {
      expect(UrlConstants).toHaveProperty(key);
      expect(UrlConstants[key]).toEqual(value);
    });
  });

});
