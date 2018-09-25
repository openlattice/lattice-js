import { Map } from 'immutable';

import EntityUpdateTypes from './EntityUpdateTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  PartialReplace: 'PartialReplace',
  Replace: 'Replace'
}).sortBy((value, key) => key);

describe('EntityUpdateTypes', () => {

  testEnumIntegrity(EntityUpdateTypes, EXPECTED_ENUM);

});
