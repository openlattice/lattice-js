import { Map } from 'immutable';

import PrincipalTypes from './PrincipalTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  APP: 'APP',
  ORGANIZATION: 'ORGANIZATION',
  ROLE: 'ROLE',
  USER: 'USER',
}).sort();

describe('PrincipalTypes', () => {

  testEnumIntegrity(PrincipalTypes, EXPECTED_ENUM);

});
