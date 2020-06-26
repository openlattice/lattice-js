/*
 * @flow
 */

import {
  Organization,
  OrganizationBuilder,
  isValidOrganization,
} from './Organization';

import { ORGANIZATION_MOCK, genRandomOrganization } from '../utils/testing/MockData';
import { runTestSuite } from '../utils/testing/ModelTestSuite';

// const INVALID_PARAMS_FOR_GRANT = INVALID_PARAMS_FOR_OPTIONAL_OBJECT.slice(0);
// INVALID_PARAMS_FOR_GRANT.push({ invalid_key: 'invalid_value' });
// INVALID_PARAMS_FOR_GRANT.push({ [genRandomUUID()]: 'invalid_value' });

runTestSuite(
  Organization,
  OrganizationBuilder,
  ORGANIZATION_MOCK,
  isValidOrganization,
  genRandomOrganization,
  {
    setApps: {
      field: 'apps',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.apps],
    },
    setConnections: {
      field: 'connections',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.connections],
    },
    setDescription: {
      field: 'description',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.description],
    },
    setEmailDomains: {
      field: 'emailDomains',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.emailDomains],
    },
    setGrants: {
      field: 'grants',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.grants],
    },
    setId: {
      field: 'id',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.id],
    },
    setMembers: {
      field: 'members',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.members],
    },
    setPartitions: {
      field: 'partitions',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.partitions],
    },
    setPrincipal: {
      field: 'principal',
      validParams: [ORGANIZATION_MOCK.principal],
    },
    setRoles: {
      field: 'roles',
      isOptional: true,
      validParams: [ORGANIZATION_MOCK.roles],
    },
    setTitle: {
      field: 'title',
      validParams: [ORGANIZATION_MOCK.title],
    },
  }
);
