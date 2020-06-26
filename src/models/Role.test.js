/*
 * @flow
 */

import {
  Role,
  RoleBuilder,
  isValidRole,
} from './Role';

import { ROLE_MOCK, genRandomRole } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

runTestSuite(
  Role,
  RoleBuilder,
  ROLE_MOCK,
  isValidRole,
  genRandomRole,
  {
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [ROLE_MOCK.description],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [ROLE_MOCK.id],
    },
    setOrganizationId: {
      field: 'organizationId',
      validParams: [ROLE_MOCK.organizationId],
    },
    setPrincipal: {
      field: 'principal',
      validParams: [ROLE_MOCK.principal],
    },
    setTitle: {
      field: 'title',
      validParams: [ROLE_MOCK.title],
    },
  }
);
