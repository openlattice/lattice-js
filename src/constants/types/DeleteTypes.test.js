import { Map } from 'immutable';

import DeleteTypes from './DeleteTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  Hard: 'Hard',
  Soft: 'Soft'
}).sortBy((value, key) => key);

describe('DeleteTypes', () => {

  testEnumIntegrity(DeleteTypes, EXPECTED_ENUM);

});
