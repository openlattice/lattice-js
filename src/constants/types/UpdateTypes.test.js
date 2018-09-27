import { Map } from 'immutable';

import UpdateTypes from './UpdateTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  Merge: 'Merge',
  PartialReplace: 'PartialReplace',
  Replace: 'Replace',
}).sortBy((value, key) => key);

describe('UpdateTypes', () => {

  testEnumIntegrity(UpdateTypes, EXPECTED_ENUM);

});
