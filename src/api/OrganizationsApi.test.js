/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as OrganizationsApi from './OrganizationsApi';
import { ORGANIZATIONS_API, PERMISSIONS_API } from '../constants/ApiNames';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_OPTIONAL_ARRAY,
  INVALID_PARAMS_FOR_OPTIONAL_STRING,
  INVALID_PARAMS_SS,
} from '../utils/testing/Invalid';
import { MOCK_GRANT, MOCK_ORGANIZATION, MOCK_ROLE } from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

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

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addConnections()', () => {

    const fnToTest = OrganizationsApi.addConnections;

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_ARRAY];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addMemberToOrganization()', () => {

    const fnToTest = OrganizationsApi.addMemberToOrganization;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('addRoleToMember()', () => {

    const fnToTest = OrganizationsApi.addRoleToMember;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
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

    const validParams = [MOCK_ORGANIZATION];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_ORGANIZATION];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('createRole()', () => {

    const fnToTest = OrganizationsApi.createRole;

    const validParams = [MOCK_ROLE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ROLES_PATH}`, MOCK_ROLE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('deleteOrganization()', () => {

    const fnToTest = OrganizationsApi.deleteOrganization;

    const validParams = [MOCK_ORGANIZATION.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('deleteRole()', () => {

    const fnToTest = OrganizationsApi.deleteRole;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}`];

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

    const validParams = [MOCK_ORGANIZATION.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllRoles()', () => {

    const fnToTest = OrganizationsApi.getAllRoles;

    const validParams = [MOCK_ORGANIZATION.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAllUsersOfRole()', () => {

    const fnToTest = OrganizationsApi.getAllUsersOfRole;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${MEMBERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAutoApprovedEmailDomains()', () => {

    const fnToTest = OrganizationsApi.getAutoApprovedEmailDomains;

    const validParams = [MOCK_ORGANIZATION.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getOrganization()', () => {

    const fnToTest = OrganizationsApi.getOrganization;

    const validParams = [MOCK_ORGANIZATION.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getRole()', () => {

    const fnToTest = OrganizationsApi.getRole;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}`];

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
      .setAclKey([MOCK_ORGANIZATION.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.ADD)
      .setAcl(mockAcl)
      .build();

    const validParams = [MOCK_ORGANIZATION.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

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

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [{
      url: `/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}`,
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

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_ARRAY];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeMemberFromOrganization()', () => {

    const fnToTest = OrganizationsApi.removeMemberFromOrganization;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('removeRoleFromMember()', () => {

    const fnToTest = OrganizationsApi.removeRoleFromMember;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
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
      .setAclKey([MOCK_ORGANIZATION.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.REMOVE)
      .setAcl(mockAcl)
      .build();

    const validParams = [MOCK_ORGANIZATION.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
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

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('setConnections()', () => {

    const fnToTest = OrganizationsApi.setConnections;

    const validParams = [MOCK_ORGANIZATION.id, [MOCK_CONNECTION]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_ARRAY];
    const axiosParams = [`/${MOCK_ORGANIZATION.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('updateOrganizationDescription()', () => {

    const fnToTest = OrganizationsApi.updateOrganizationDescription;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_FOR_OPTIONAL_STRING];
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${DESCRIPTION_PATH}`,
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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${DESCRIPTION_PATH}`,
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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id, MOCK_GRANT];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${GRANT_PATH}`,
      MOCK_GRANT,
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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_ROLE.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE.id}/${TITLE_PATH}`,
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

    const validParams = [MOCK_ORGANIZATION.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION.id}/${TITLE_PATH}`,
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
