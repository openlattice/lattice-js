import { Map } from 'immutable';

import IndexTypes from './IndexTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  BTREE: 'BTREE',
  GIN: 'GIN',
  HASH: 'HASH',
  NONE: 'NONE',
}).sortBy((value, key) => key);

describe('IndexTypes', () => {

  testEnumIntegrity(IndexTypes, EXPECTED_ENUM);

});
