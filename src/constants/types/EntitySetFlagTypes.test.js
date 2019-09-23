import { Map } from 'immutable';

import EntitySetFlagTypes from './EntitySetFlagTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  ASSOCIATION: 'ASSOCIATION',
  AUDIT: 'AUDIT',
  EXTERNAL: 'EXTERNAL',
  LINKING: 'LINKING',
}).sortBy((value, key) => key);

describe('IndexTypes', () => {

  testEnumIntegrity(EntitySetFlagTypes, EXPECTED_ENUM);

});
