/*
 * @flow
 */

import {
  Grant,
  GrantBuilder,
  isValidGrant,
} from './Grant';

import { GrantTypes } from '../constants/types';
import { GRANT_MOCK, genRandomGrant } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
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
