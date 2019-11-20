import { Map } from 'immutable';

import GrantTypes from './GrantTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  ATTRIBUTE: 'Attribute',
  AUTO: 'Auto',
  CLAIM: 'Claim',
  GROUP: 'Group',
  MANUAL: 'Manual',
}).sortBy((value, key) => key);

describe('GrantTypes', () => {

  testEnumIntegrity(GrantTypes, EXPECTED_ENUM, false);

});
