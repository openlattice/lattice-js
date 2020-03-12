/*
 * @flow
 */

import {
  GRANT_MOCK,
  Grant,
  GrantBuilder,
  genRandomGrant,
  isValidGrant,
} from './Grant';

import { GrantTypes } from '../constants/types';
import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
  Grant,
  GrantBuilder,
  GRANT_MOCK,
  isValidGrant,
  genRandomGrant,
  {
    setAttribute: {
      field: 'attribute',
      isOptional: true,
      validParams: [GRANT_MOCK.attribute],
    },
    setGrantType: {
      field: 'grantType',
      validParams: [GRANT_MOCK.grantType, ...Object.values(GrantTypes)],
    },
    setMappings: {
      field: 'mappings',
      isOptional: true,
      validParams: [GRANT_MOCK.mappings],
    },
  }
);
