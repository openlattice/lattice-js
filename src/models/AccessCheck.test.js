/*
 * @flow
 */

import { Map } from 'immutable';

import {
  ACCESS_CHECK_MOCK,
  AccessCheck,
  AccessCheckBuilder,
  genRandomAccessCheck,
  isValidAccessCheck,
} from './AccessCheck';

import { PermissionTypes } from '../constants/types';
import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
  AccessCheck,
  AccessCheckBuilder,
  ACCESS_CHECK_MOCK,
  isValidAccessCheck,
  genRandomAccessCheck,
  {
    setAclKey: {
      field: 'aclKey',
      validParams: [ACCESS_CHECK_MOCK.aclKey],
    },
    setPermissions: {
      field: 'permissions',
      isOptional: true,
      validParams: [
        ACCESS_CHECK_MOCK.permissions,
        Object.values(PermissionTypes),
        ...Map(PermissionTypes).valueSeq().map((type) => [type]).toJS()
      ],
    },
  }
);
