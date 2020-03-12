/* eslint-disable no-use-before-define */

import * as OrganizationsApi from './OrganizationsApi';

import * as AxiosUtils from '../utils/axios';
import { ORGANIZATIONS_API, PERMISSIONS_API } from '../constants/ApiNames';
import {
  CONNECTIONS_PATH,
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
  GRANT_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  ROLES_PATH,
  TITLE_PATH,
} from '../constants/UrlConstants';
import {
  ActionTypes,
  PermissionTypes,
  PrincipalTypes,
} from '../constants/types';
import {
  AceBuilder,
  AclBuilder,
  AclDataBuilder,
  PrincipalBuilder,
} from '../models';
import { GRANT_MOCK } from '../models/Grant';
import { ORGANIZATION_MOCK } from '../models/Organization';
import { ROLE_MOCK } from '../models/Role';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS,
  INVALID_PARAMS_OPTIONAL_STRING,
  INVALID_PARAMS_REQUIRED_STRING,
} from '../utils/testing/InvalidParams';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

/*
 * mocks
 */

const MOCK_EMAIL_DOMAIN = 'openlattice.com';
const MOCK_DESCRIPTION = 'mock description';
const MOCK_TITLE = 'mock title';

const MOCK_MEMBER_ID = 'openlattice|12345678901234567890';
const MOCK_CONNECTION = 'mock_connection';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('OrganizationsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addAutoApprovedEmailDomain()', () => {

    const fnToTest = OrganizationsApi.addAutoApprovedEmailDomain;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.addAutoApprovedEmailDomains;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addConnections()', () => {

    const fnToTest = OrganizationsApi.addConnections;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addMemberToOrganization()', () => {

    const fnToTest = OrganizationsApi.addMemberToOrganization;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addRoleToMember()', () => {

    const fnToTest = OrganizationsApi.addRoleToMember;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
    ];
    /* eslint-enable */

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('createOrganization()', () => {

    const fnToTest = OrganizationsApi.createOrganization;

    const validParams = [ORGANIZATION_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', ORGANIZATION_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('createRole()', () => {

    const fnToTest = OrganizationsApi.createRole;

    const validParams = [ROLE_MOCK];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ROLES_PATH}`, ROLE_MOCK];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('deleteOrganization()', () => {

    const fnToTest = OrganizationsApi.deleteOrganization;

    const validParams = [ORGANIZATION_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('deleteRole()', () => {

    const fnToTest = OrganizationsApi.deleteRole;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllOrganizations()', () => {

    const fnToTest = OrganizationsApi.getAllOrganizations;

    const validParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllMembers()', () => {

    const fnToTest = OrganizationsApi.getAllMembers;

    const validParams = [ORGANIZATION_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllRoles()', () => {

    const fnToTest = OrganizationsApi.getAllRoles;

    const validParams = [ORGANIZATION_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllUsersOfRole()', () => {

    const fnToTest = OrganizationsApi.getAllUsersOfRole;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAutoApprovedEmailDomains()', () => {

    const fnToTest = OrganizationsApi.getAutoApprovedEmailDomains;

    const validParams = [ORGANIZATION_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getOrganization()', () => {

    const fnToTest = OrganizationsApi.getOrganization;

    const validParams = [ORGANIZATION_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getRole()', () => {

    const fnToTest = OrganizationsApi.getRole;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('grantTrustToOrganization()', () => {

    const fnToTest = OrganizationsApi.grantTrustToOrganization;

    const mockPrincipal = (new PrincipalBuilder())
      .setId('justbeamit')
      .setType(PrincipalTypes.ORGANIZATION)
      .build();

    const mockAce = (new AceBuilder())
      .setPermissions([PermissionTypes.READ])
      .setPrincipal(mockPrincipal)
      .build();

    const mockAcl = (new AclBuilder())
      .setAclKey([ORGANIZATION_MOCK.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.ADD)
      .setAcl(mockAcl)
      .build();

    const validParams = [ORGANIZATION_MOCK.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = ['/', mockAclData];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeAutoApprovedEmailDomain()', () => {

    const fnToTest = OrganizationsApi.removeAutoApprovedEmailDomain;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.removeAutoApprovedEmailDomains;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_EMAIL_DOMAIN]];
    // TODO: INVALID_PARAMS_REQUIRED_STRING is not the right one to use
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [{
      url: `/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}`,
      method: 'delete',
      data: [MOCK_EMAIL_DOMAIN]
    }];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeConnections()', () => {

    const fnToTest = OrganizationsApi.removeConnections;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${CONNECTIONS_PATH}`, { data: [MOCK_CONNECTION] }];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeMemberFromOrganization()', () => {

    const fnToTest = OrganizationsApi.removeMemberFromOrganization;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeRoleFromMember()', () => {

    const fnToTest = OrganizationsApi.removeRoleFromMember;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
    ];
    /* eslint-enable */

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('revokeTrustFromOrganization()', () => {

    const fnToTest = OrganizationsApi.revokeTrustFromOrganization;

    const mockPrincipal = (new PrincipalBuilder())
      .setId('justbeamit')
      .setType(PrincipalTypes.ORGANIZATION)
      .build();

    const mockAce = (new AceBuilder())
      .setPermissions([PermissionTypes.READ])
      .setPrincipal(mockPrincipal)
      .build();

    const mockAcl = (new AclBuilder())
      .setAclKey([ORGANIZATION_MOCK.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.REMOVE)
      .setAcl(mockAcl)
      .build();

    const validParams = [ORGANIZATION_MOCK.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = ['/', mockAclData];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('setAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.setAutoApprovedEmailDomains;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_EMAIL_DOMAIN]];
    // TODO: INVALID_PARAMS_REQUIRED_STRING is not the right one to use
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('setConnections()', () => {

    const fnToTest = OrganizationsApi.setConnections;

    const validParams = [ORGANIZATION_MOCK.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_ARRAY_OF_STRINGS];
    const axiosParams = [`/${ORGANIZATION_MOCK.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateOrganizationDescription()', () => {

    const fnToTest = OrganizationsApi.updateOrganizationDescription;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_OPTIONAL_STRING];
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${DESCRIPTION_PATH}`,
      MOCK_DESCRIPTION,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateRoleDescription()', () => {

    const fnToTest = OrganizationsApi.updateRoleDescription;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${DESCRIPTION_PATH}`,
      MOCK_DESCRIPTION,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateRoleGrant()', () => {

    const fnToTest = OrganizationsApi.updateRoleGrant;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id, GRANT_MOCK];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${GRANT_PATH}`,
      GRANT_MOCK,
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateRoleTitle()', () => {

    const fnToTest = OrganizationsApi.updateRoleTitle;

    const validParams = [ORGANIZATION_MOCK.id, ROLE_MOCK.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${TITLE_PATH}`,
      MOCK_TITLE,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateOrganizationTitle()', () => {

    const fnToTest = OrganizationsApi.updateOrganizationTitle;

    const validParams = [ORGANIZATION_MOCK.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];
    const axiosParams = [
      `/${ORGANIZATION_MOCK.id}/${TITLE_PATH}`,
      MOCK_TITLE,
      {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
