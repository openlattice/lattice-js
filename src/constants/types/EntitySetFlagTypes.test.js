import { OrderedMap } from 'immutable';

import EntitySetFlagTypes from './EntitySetFlagTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = OrderedMap({
  ASSOCIATION: 'ASSOCIATION',
  AUDIT: 'AUDIT',
  EXTERNAL: 'EXTERNAL',
  LINKING: 'LINKING',
  TRANSPORTED: 'TRANSPORTED',
  UNVERSIONED: 'UNVERSIONED',
});

describe('IndexTypes', () => {

  testEnumIntegrity(EntitySetFlagTypes, EXPECTED_ENUM);

});
