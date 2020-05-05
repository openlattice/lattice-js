import { OrderedMap } from 'immutable';

import GrantTypes from './GrantTypes';
import { testEnumIntegrity } from '../../utils/testing/TestUtils';

const EXPECTED_ENUM = OrderedMap({
  ATTRIBUTES: 'Attributes',
  Attributes: 'Attributes',
  AUTOMATIC: 'Automatic',
  Automatic: 'Automatic',
  CLAIM: 'Claim',
  Claim: 'Claim',
  EMAIL_DOMAIN: 'EmailDomain',
  EmailDomain: 'EmailDomain',
  GROUPS: 'Groups',
  Groups: 'Groups',
  MANUAL: 'Manual',
  Manual: 'Manual',
  ROLES: 'Roles',
  Roles: 'Roles',
});

describe('GrantTypes', () => {

  testEnumIntegrity(GrantTypes, EXPECTED_ENUM, false);

});
