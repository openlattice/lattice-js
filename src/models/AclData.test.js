/*
 * @flow
 */

import {
  AclData,
  AclDataBuilder,
  isValidAclData,
} from './AclData';

import { ActionTypes } from '../constants/types';
import { ACL_DATA_MOCK, genRandomAclData } from '../utils/testing/MockData';
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
