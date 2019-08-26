/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as OrganizationsApi from './OrganizationsApi';
import { ORGANIZATIONS_API, PERMISSIONS_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ORGANIZATION_DM, MOCK_ROLE_DM } from '../utils/testing/MockDataModels';
import { genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  DESCRIPTION_PATH,
  EMAIL_DOMAINS_PATH,
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
const MOCK_DESCRIPTION = genRandomString();
const MOCK_TITLE = genRandomString();

// const MOCK_MEMBER_ID = 'google-oauth2|850284592837234579086';
const MOCK_MEMBER_ID = genRandomString();

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('OrganizationsApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetOrganization();
  testGetAllOrganizations();
  testCreateOrganization();
  testDeleteOrganization();
  testUpdateTitle();
  testUpdateDescription();
  testGetAutoApprovedEmailDomains();
  testAddAutoApprovedEmailDomain();
  testAddAutoApprovedEmailDomains();
  testSetAutoApprovedEmailDomains();
  testRemoveAutoApprovedEmailDomain();
  testRemoveAutoApprovedEmailDomains();
  testGetRole();
  testGetAllRoles();
  testCreateRole();
  testDeleteRole();
  testUpdateRoleTitle();
  testUpdateRoleDescription();
  testAddRoleToMember();
  testRemoveRoleFromMember();
  testGetAllMembers();
  testAddMemberToOrganization();
  testRemoveMemberFromOrganization();
  testGrantTrustToOrganization();
  testRevokeTrustFromOrganization();
});

function testGetOrganization() {

  describe('getOrganization()', () => {

    const fnToTest = OrganizationsApi.getOrganization;

    const validParams = [MOCK_ORGANIZATION_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetAllOrganizations() {

  describe('getAllOrganizations()', () => {

    const fnToTest = OrganizationsApi.getAllOrganizations;

    const validParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreateOrganization() {

  describe('createOrganization()', () => {

    const fnToTest = OrganizationsApi.createOrganization;

    const validParams = [MOCK_ORGANIZATION_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_ORGANIZATION_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeleteOrganization() {

  describe('deleteOrganization()', () => {

    const fnToTest = OrganizationsApi.deleteOrganization;

    const validParams = [MOCK_ORGANIZATION_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdateTitle() {

  describe('updateTitle()', () => {

    const fnToTest = OrganizationsApi.updateTitle;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${TITLE_PATH}`,
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
  });
}

function testUpdateDescription() {

  describe('updateDescription()', () => {

    const fnToTest = OrganizationsApi.updateDescription;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${DESCRIPTION_PATH}`,
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
  });
}

function testGetAutoApprovedEmailDomains() {

  describe('getAutoApprovedEmailDomains()', () => {

    const fnToTest = OrganizationsApi.getAutoApprovedEmailDomains;

    const validParams = [MOCK_ORGANIZATION_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testAddAutoApprovedEmailDomain() {

  describe('addAutoApprovedEmailDomain()', () => {

    const fnToTest = OrganizationsApi.addAutoApprovedEmailDomain;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testAddAutoApprovedEmailDomains() {

  describe('addAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.addAutoApprovedEmailDomains;

    const validParams = [MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testSetAutoApprovedEmailDomains() {

  describe('setAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.setAutoApprovedEmailDomains;

    const validParams = [MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_EMAIL_DOMAIN]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testRemoveAutoApprovedEmailDomain() {

  describe('removeAutoApprovedEmailDomain()', () => {

    const fnToTest = OrganizationsApi.removeAutoApprovedEmailDomain;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_EMAIL_DOMAIN];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}/${MOCK_EMAIL_DOMAIN}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testRemoveAutoApprovedEmailDomains() {

  describe('removeAutoApprovedEmailDomains()', () => {

    // TODO: add test for removing duplicates

    const fnToTest = OrganizationsApi.removeAutoApprovedEmailDomains;

    const validParams = [MOCK_ORGANIZATION_DM.id, [MOCK_EMAIL_DOMAIN]];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [{
      url: `/${MOCK_ORGANIZATION_DM.id}/${EMAIL_DOMAINS_PATH}`,
      method: 'delete',
      data: [MOCK_EMAIL_DOMAIN]
    }];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'request');
  });
}

function testGetRole() {

  describe('getRole()', () => {

    const fnToTest = OrganizationsApi.getRole;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testGetAllRoles() {

  describe('getAllRoles()', () => {

    const fnToTest = OrganizationsApi.getAllRoles;

    const validParams = [MOCK_ORGANIZATION_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testCreateRole() {

  describe('createRole()', () => {

    const fnToTest = OrganizationsApi.createRole;

    const validParams = [MOCK_ROLE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${ROLES_PATH}`, MOCK_ROLE_DM];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
  });
}

function testDeleteRole() {

  describe('deleteRole()', () => {

    const fnToTest = OrganizationsApi.deleteRole;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testUpdateRoleTitle() {

  describe('updateRoleTitle()', () => {

    const fnToTest = OrganizationsApi.updateRoleTitle;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id, MOCK_TITLE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${TITLE_PATH}`,
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
  });
}

function testUpdateRoleDescription() {

  describe('updateRoleDescription()', () => {

    const fnToTest = OrganizationsApi.updateRoleDescription;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id, MOCK_DESCRIPTION];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${DESCRIPTION_PATH}`,
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
  });
}

function testAddRoleToMember() {

  describe('addRoleToMember()', () => {

    const fnToTest = OrganizationsApi.addRoleToMember;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
    ];
    /* eslint-enable */

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testRemoveRoleFromMember() {

  describe('removeRoleFromMember()', () => {

    const fnToTest = OrganizationsApi.removeRoleFromMember;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_ROLE_DM.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS];
    /* eslint-disable max-len */
    const axiosParams = [
      `/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${MOCK_ROLE_DM.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
    ];
    /* eslint-enable */

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testGetAllMembers() {

  describe('getAllMembers()', () => {

    const fnToTest = OrganizationsApi.getAllMembers;

    const validParams = [MOCK_ORGANIZATION_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
  });
}

function testAddMemberToOrganization() {

  describe('addMemberToOrganization()', () => {

    const fnToTest = OrganizationsApi.addMemberToOrganization;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'put');
  });
}

function testRemoveMemberFromOrganization() {

  describe('removeMemberFromOrganization()', () => {

    const fnToTest = OrganizationsApi.removeMemberFromOrganization;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_MEMBER_ID];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${MOCK_ORGANIZATION_DM.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, ORGANIZATIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
  });
}

function testGrantTrustToOrganization() {

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
      .setAclKey([MOCK_ORGANIZATION_DM.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.ADD)
      .setAcl(mockAcl)
      .build();

    const validParams = [MOCK_ORGANIZATION_DM.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = ['/', mockAclData];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}

function testRevokeTrustFromOrganization() {

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
      .setAclKey([MOCK_ORGANIZATION_DM.id])
      .setAces([mockAce])
      .build();

    const mockAclData = (new AclDataBuilder())
      .setAction(ActionTypes.REMOVE)
      .setAcl(mockAcl)
      .build();

    const validParams = [MOCK_ORGANIZATION_DM.id, mockPrincipal.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = ['/', mockAclData];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, PERMISSIONS_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'patch');
  });
}
