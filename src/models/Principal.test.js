/*
 * @flow
 */

import {
  PRINCIPAL_MOCK,
  Principal,
  PrincipalBuilder,
  genRandomPrincipal,
  isValidPrincipal,
} from './Principal';

import { PrincipalTypes } from '../constants/types';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  Principal,
  PrincipalBuilder,
  PRINCIPAL_MOCK,
  isValidPrincipal,
  genRandomPrincipal,
  {
    setId: {
      field: 'id',
      validParams: [PRINCIPAL_MOCK.id],
    },
    setType: {
      field: 'type',
      validParams: [PRINCIPAL_MOCK.type, ...Object.values(PrincipalTypes)],
    },
  }
);
