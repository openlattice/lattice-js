/*
 * @flow
 */

import { Map } from 'immutable';

import {
  ACE_MOCK,
  Ace,
  AceBuilder,
  genRandomAce,
  isValidAce,
} from './Ace';

import { PermissionTypes } from '../constants/types';
import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
  Ace,
  AceBuilder,
  ACE_MOCK,
  isValidAce,
  genRandomAce,
  {
    setPermissions: {
      field: 'permissions',
      isOptional: true,
      validParams: [
        ACE_MOCK.permissions,
        Object.values(PermissionTypes),
        ...Map(PermissionTypes).valueSeq().map((type) => [type]).toJS()
      ],
    },
    setPrincipal: {
      field: 'principal',
      validParams: [ACE_MOCK.principal],
    }
  },
);
