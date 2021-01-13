import * as OrganizationsApi from './OrganizationsApi';
import * as PermissionsApi from './PermissionsApi';

import * as AxiosUtils from '../utils/axios';
import { ORGANIZATIONS_API } from '../constants/ApiNames';
import {
  CONNECTIONS_PATH,
  DATABASE_PATH,
  DATASOURCE_PATH,
  DESCRIPTION_PATH,
  DESTROY_PATH,
  EMAIL_DOMAINS_PATH,
  ENTITY_SETS_PATH,
  GRANT_PATH,
  INTEGRATION_PATH,
  MEMBERS_PATH,
  PRINCIPALS_PATH,
  PROMOTE_PATH,
  ROLES_PATH,
  TITLE_PATH,
  TRANSPORT_PATH,
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
import { runTestSuite } from '../utils/testing/APITestSuite';
import {
  ENTITY_SET_MOCK,
  GRANT_MOCK,
  ORGANIZATION_MOCK as ORG_MOCK,
  ROLE_MOCK,
} from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_CONNECTION = 'mock_connection';
const MOCK_DB_NAME = 'mock_database_name';
const MOCK_DOMAIN = 'openlattice.com';
const MOCK_MEMBER_ID = 'openlattice|12345678901234567890';
const MOCK_TABLE_NAME = 'mock_table_name';

const MOCK_ID = 'adec59a3-0c25-4ad4-a407-9c510acbf0d0';
const MOCK_DATA_SOURCE = {
  database: 'database',
  driver: 'driver',
  name: 'name',
  password: 'password',
  url: 'url',
  username: 'username',
};

const AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN = {
  headers: {
    'Content-Type': 'text/plain',
  },
};

const updateAclSpy = jest.spyOn(PermissionsApi, 'updateAcl');

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(ORGANIZATIONS_API, () => {

  beforeEach(() => {
    updateAclSpy.mockClear();
  });

  runTestSuite(
    OrganizationsApi,
    ORGANIZATIONS_API,
    {
      addConnectionsToOrganization: {
        '': { params: { optional: [false, true], valid: [ORG_MOCK.id, [MOCK_CONNECTION]] } },
        '(organizationId, [])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, []],
            valid: [ORG_MOCK.id, []],
          },
        },
        '(organizationId, [connection])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]],
            valid: [ORG_MOCK.id, [MOCK_CONNECTION]],
          },
        },
        '(organizationId, [connection_1, connection_1])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, [MOCK_CONNECTION]],
            valid: [ORG_MOCK.id, [MOCK_CONNECTION, MOCK_CONNECTION]],
          },
        },
      },
      addDomainsToOrganization: {
        '': { params: { optional: [false, true], valid: [ORG_MOCK.id, [MOCK_DOMAIN]] } },
        '(organizationId, [])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, []],
            valid: [ORG_MOCK.id, []],
          },
        },
        '(organizationId, [domain])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_DOMAIN]],
            valid: [ORG_MOCK.id, [MOCK_DOMAIN]],
          },
        },
        '(organizationId, [domain_1, domain_1])': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, [MOCK_DOMAIN]],
            valid: [ORG_MOCK.id, [MOCK_DOMAIN, MOCK_DOMAIN]],
          },
        },
      },
      addMemberToOrganization: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, MOCK_MEMBER_ID] } },
        '(organizationId, memberId)': {
          method: 'put',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`],
            valid: [ORG_MOCK.id, MOCK_MEMBER_ID],
          },
        },
      },
      addRoleToMember: {
        '': { params: { optional: [false, false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID] } },
        '(organizationId, roleId, memberId)': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
            ],
            valid: [ORG_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID],
          },
        },
      },
      createOrganization: {
        '': { params: { optional: [false], valid: [ORG_MOCK] } },
        '(organization)': {
          method: 'post',
          params: {
            axios: ['/', ORG_MOCK],
            valid: [ORG_MOCK],
          },
        },
      },
      createRole: {
        '': { params: { optional: [false], valid: [ROLE_MOCK] } },
        '(role)': {
          method: 'post',
          params: {
            axios: [`/${ROLES_PATH}`, ROLE_MOCK],
            valid: [ROLE_MOCK],
          },
        },
      },
      deleteOrganization: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      deleteRole: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id] } },
        '(organizationId, roleId)': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}`],
            valid: [ORG_MOCK.id, ROLE_MOCK.id],
          },
        },
      },
      destroyTransportedOrganizationEntitySet: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ENTITY_SET_MOCK.id] } },
        '(organizationId, entitySetId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${ENTITY_SET_MOCK.id}/${DESTROY_PATH}`],
            valid: [ORG_MOCK.id, ENTITY_SET_MOCK.id],
          },
        },
      },
      getAllOrganizations: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: ['/'],
            valid: [],
          },
        },
      },
      getOrganization: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getOrganizationDatabaseName: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${DATABASE_PATH}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getOrganizationEntitySets: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${ENTITY_SETS_PATH}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getOrganizationIntegrationAccount: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${INTEGRATION_PATH}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getOrganizationMembers: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getOrganizationRoles: {
        '': { params: { optional: [false], valid: [ORG_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}`],
            valid: [ORG_MOCK.id],
          },
        },
      },
      getRole: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id] } },
        '(organizationId, roleId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}`],
            valid: [ORG_MOCK.id, ROLE_MOCK.id],
          },
        },
      },
      getUsersWithRole: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id] } },
        '(organizationId, roleId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}`],
            valid: [ORG_MOCK.id, ROLE_MOCK.id],
          },
        },
      },
      promoteStagingTable: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, MOCK_TABLE_NAME] } },
        '(organizationId, tableName)': {
          method: 'post',
          params: {
            axios: [
              `/${PROMOTE_PATH}/${ORG_MOCK.id}`,
              MOCK_TABLE_NAME,
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, MOCK_TABLE_NAME],
          },
        },
      },
      registerOrganizationDataSource: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, MOCK_DATA_SOURCE] } },
        '(organizationId, dataSource)': {
          method: 'post',
          params: {
            axios: [`/${ORG_MOCK.id}/${DATASOURCE_PATH}`, MOCK_DATA_SOURCE],
            valid: [ORG_MOCK.id, MOCK_DATA_SOURCE],
          },
        },
      },
      removeConnectionsFromOrganization: {
        '': { params: { optional: [false, true], valid: [ORG_MOCK.id, [MOCK_CONNECTION]] } },
        '(organizationId, [])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, { data: [] }],
            valid: [ORG_MOCK.id, []],
          },
        },
        '(organizationId, [connection])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, { data: [MOCK_CONNECTION] }],
            valid: [ORG_MOCK.id, [MOCK_CONNECTION]],
          },
        },
        '(organizationId, [connection_1, connection_1])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${CONNECTIONS_PATH}`, { data: [MOCK_CONNECTION] }],
            valid: [ORG_MOCK.id, [MOCK_CONNECTION, MOCK_CONNECTION]],
          },
        },
      },
      removeDomainsFromOrganization: {
        '': { params: { optional: [false, true], valid: [ORG_MOCK.id, [MOCK_DOMAIN]] } },
        '(organizationId, [])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, { data: [] }],
            valid: [ORG_MOCK.id, []],
          },
        },
        '(organizationId, [domain])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, { data: [MOCK_DOMAIN] }],
            valid: [ORG_MOCK.id, [MOCK_DOMAIN]],
          },
        },
        '(organizationId, [domain_1, domain_1])': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${EMAIL_DOMAINS_PATH}`, { data: [MOCK_DOMAIN] }],
            valid: [ORG_MOCK.id, [MOCK_DOMAIN, MOCK_DOMAIN]],
          },
        },
      },
      removeMemberFromOrganization: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, MOCK_MEMBER_ID] } },
        '(organizationId, memberId)': {
          method: 'delete',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`],
            valid: [ORG_MOCK.id, MOCK_MEMBER_ID],
          },
        },
      },
      removeRoleFromMember: {
        '': { params: { optional: [false, false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID] } },
        '(organizationId, roleId, memberId)': {
          method: 'delete',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${MEMBERS_PATH}/${MOCK_MEMBER_ID}`
            ],
            valid: [ORG_MOCK.id, ROLE_MOCK.id, MOCK_MEMBER_ID],
          },
        },
      },
      renameOrganizationDatabase: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, MOCK_DB_NAME] } },
        '(organizationId, databaseName)': {
          method: 'patch',
          params: {
            axios: [`/${ORG_MOCK.id}/${DATABASE_PATH}`, MOCK_DB_NAME, AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN],
            valid: [ORG_MOCK.id, MOCK_DB_NAME],
          },
        },
      },
      transportOrganizationEntitySet: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ENTITY_SET_MOCK.id] } },
        '(organizationId, entitySetId)': {
          method: 'get',
          params: {
            axios: [`/${ORG_MOCK.id}/${ENTITY_SET_MOCK.id}/${TRANSPORT_PATH}`],
            valid: [ORG_MOCK.id, ENTITY_SET_MOCK.id],
          },
        },
      },
      updateOrganizationDataSource: {
        '': { params: { optional: [false, false, false], valid: [ORG_MOCK.id, MOCK_ID, MOCK_DATA_SOURCE] } },
        '(organizationId, dataSourceId, dataSource)': {
          method: 'put',
          params: {
            axios: [`/${ORG_MOCK.id}/${DATASOURCE_PATH}/${MOCK_ID}`, MOCK_DATA_SOURCE],
            valid: [ORG_MOCK.id, MOCK_ID, MOCK_DATA_SOURCE],
          },
        },
      },
      updateOrganizationDescription: {
        '': { params: { optional: [false, true], valid: [ORG_MOCK.id, ORG_MOCK.description] } },
        '(organizationId, description)': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${DESCRIPTION_PATH}`,
              ORG_MOCK.description,
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, ORG_MOCK.description],
          },
        },
        '(organizationId, description="")': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${DESCRIPTION_PATH}`,
              '',
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id],
          },
        },
      },
      updateOrganizationTitle: {
        '': { params: { optional: [false, false], valid: [ORG_MOCK.id, ORG_MOCK.title] } },
        '(organizationId, title)': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${TITLE_PATH}`,
              ORG_MOCK.title,
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, ORG_MOCK.title],
          },
        },
      },
      updateRoleDescription: {
        '': { params: { optional: [false, false, true], valid: [ORG_MOCK.id, ROLE_MOCK.id, ROLE_MOCK.description] } },
        '(organizationId, roleId, description)': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${DESCRIPTION_PATH}`,
              ROLE_MOCK.description,
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, ROLE_MOCK.id, ROLE_MOCK.description],
          },
        },
        '(organizationId, roleId, description="")': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${DESCRIPTION_PATH}`,
              '',
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, ROLE_MOCK.id],
          },
        },
      },
      updateRoleGrant: {
        '': { params: { optional: [false, false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id, GRANT_MOCK] } },
        '(organizationId, roleId, grant)': {
          method: 'put',
          params: {
            axios: [`/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${GRANT_PATH}`, GRANT_MOCK],
            valid: [ORG_MOCK.id, ROLE_MOCK.id, GRANT_MOCK],
          },
        },
      },
      updateRoleTitle: {
        '': { params: { optional: [false, false, false], valid: [ORG_MOCK.id, ROLE_MOCK.id, ROLE_MOCK.title] } },
        '(organizationId, title)': {
          method: 'put',
          params: {
            axios: [
              `/${ORG_MOCK.id}/${PRINCIPALS_PATH}/${ROLES_PATH}/${ROLE_MOCK.id}/${TITLE_PATH}`,
              ROLE_MOCK.title,
              AXIOS_CONFIG_CONTENT_TYPE_TEXT_PLAIN,
            ],
            valid: [ORG_MOCK.id, ROLE_MOCK.id, ROLE_MOCK.title],
          },
        },
      },
    },
  );

  describe('grantTrustToOrganization()', () => {

    test('should call PermissionsApi.updateAcl', () => {

      const mockPrincipal = (new PrincipalBuilder())
        .setId('MockTrustedPrincipalId')
        .setType(PrincipalTypes.ORGANIZATION)
        .build();

      const mockAce = (new AceBuilder())
        .setPermissions([PermissionTypes.READ])
        .setPrincipal(mockPrincipal)
        .build();

      const mockAcl = (new AclBuilder())
        .setAclKey([ORG_MOCK.id])
        .setAces([mockAce])
        .build();

      const mockAclData = (new AclDataBuilder())
        .setAction(ActionTypes.ADD)
        .setAcl(mockAcl)
        .build();

      OrganizationsApi.grantTrustToOrganization(ORG_MOCK.id, mockPrincipal.id);
      expect(updateAclSpy).toHaveBeenCalledTimes(1);
      expect(updateAclSpy).toHaveBeenCalledWith(mockAclData);
    });

  });

  describe('revokeTrustFromOrganization', () => {

    test('should call PermissionsApi.updateAcl', () => {

      const mockPrincipal = (new PrincipalBuilder())
        .setId('MockTrustedPrincipalId')
        .setType(PrincipalTypes.ORGANIZATION)
        .build();

      const mockAce = (new AceBuilder())
        .setPermissions([PermissionTypes.READ])
        .setPrincipal(mockPrincipal)
        .build();

      const mockAcl = (new AclBuilder())
        .setAclKey([ORG_MOCK.id])
        .setAces([mockAce])
        .build();

      const mockAclData = (new AclDataBuilder())
        .setAction(ActionTypes.REMOVE)
        .setAcl(mockAcl)
        .build();

      OrganizationsApi.revokeTrustFromOrganization(ORG_MOCK.id, mockPrincipal.id);
      expect(updateAclSpy).toHaveBeenCalledTimes(1);
      expect(updateAclSpy).toHaveBeenCalledWith(mockAclData);
    });

  });

});
