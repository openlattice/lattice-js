import { Map } from 'immutable';

import DeleteTypes from './DeleteTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  HARD: 'Hard',
  Hard: 'Hard',
  SOFT: 'Soft',
  Soft: 'Soft',
}).sortBy((value, key) => key);

describe('DeleteTypes', () => {

  testEnumIntegrity(DeleteTypes, EXPECTED_ENUM, false);

});
