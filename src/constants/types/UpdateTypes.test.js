import { Map } from 'immutable';

import UpdateTypes from './UpdateTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  MERGE: 'Merge',
  Merge: 'Merge',
  PARTIAL_REPLACE: 'PartialReplace',
  PartialReplace: 'PartialReplace',
  REPLACE: 'Replace',
  Replace: 'Replace',
}).sortBy((value, key) => key);

describe('UpdateTypes', () => {

  testEnumIntegrity(UpdateTypes, EXPECTED_ENUM, false);

});
