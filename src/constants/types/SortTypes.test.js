import { Map } from 'immutable';

import SortTypes from './SortTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  FIELD: 'field',
  Field: 'field',
  GEO_DISTANCE: 'geoDistance',
  GeoDistance: 'geoDistance',
  SCORE: 'score',
  Score: 'score',
}).sortBy((value, key) => key);

describe('SortTypes', () => {

  testEnumIntegrity(SortTypes, EXPECTED_ENUM, false);

});
