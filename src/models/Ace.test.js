/*
 * @flow
 */

import { Map } from 'immutable';

import {
  Ace,
  AceBuilder,
  isValidAce,
} from './Ace';

import { PermissionTypes } from '../constants/types';
import { ACE_MOCK, genRandomAce } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
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
