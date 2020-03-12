/*
 * @flow
 */

import {
  ACL_MOCK,
  Acl,
  AclBuilder,
  genRandomAcl,
  isValidAcl,
} from './Acl';

import { runModelTestSuite } from '../utils/testing/ModelTestUtils';

runModelTestSuite(
  Acl,
  AclBuilder,
  ACL_MOCK,
  isValidAcl,
  genRandomAcl,
  {
    setAces: {
      field: 'aces',
      isOptional: true,
      validParams: [ACL_MOCK.aces],
    },
    setAclKey: {
      field: 'aclKey',
      validParams: [ACL_MOCK.aclKey],
    },
  }
);
