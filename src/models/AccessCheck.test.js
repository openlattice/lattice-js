/*
 * @flow
 */

import { Map } from 'immutable';

import {
  AccessCheck,
  AccessCheckBuilder,
  isValidAccessCheck,
} from './AccessCheck';

import { PermissionTypes } from '../constants/types';
import { ACCESS_CHECK_MOCK, genRandomAccessCheck } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
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
