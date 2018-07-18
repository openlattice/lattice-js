import { Map } from 'immutable';

import PrincipalTypes from './PrincipalTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  APP: 'APP',
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER',
}).sortBy((value, key) => key);

describe('PrincipalTypes', () => {

  testEnumIntegrity(PrincipalTypes, EXPECTED_ENUM);

});
