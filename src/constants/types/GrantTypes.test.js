import { Map } from 'immutable';

import GrantTypes from './GrantTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = Map({
  ATTRIBUTES: 'Attributes',
  AUTOMATIC: 'Automatic',
  CLAIM: 'Claim',
  EMAIL_DOMAIN: 'EmailDomain',
  GROUPS: 'Groups',
  MANUAL: 'Manual',
  ROLES: 'Roles',
}).sortBy((value, key) => key);

describe('GrantTypes', () => {

  testEnumIntegrity(GrantTypes, EXPECTED_ENUM, false);

});
