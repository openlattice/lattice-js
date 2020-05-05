/*
 * @flow
 */

import {
  ACL_DATA_MOCK,
  AclData,
  AclDataBuilder,
  genRandomAclData,
  isValidAclData,
} from './AclData';

import { ActionTypes } from '../constants/types';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  AclData,
  AclDataBuilder,
  ACL_DATA_MOCK,
  isValidAclData,
  genRandomAclData,
  {
    setAcl: {
      field: 'acl',
      validParams: [ACL_DATA_MOCK.acl],
    },
    setAction: {
      field: 'action',
      validParams: [ACL_DATA_MOCK.action, ...Object.values(ActionTypes)],
    },
  }
);
