import { v4 as uuid } from 'uuid';

import * as CollaborationsApi from './CollaborationsApi';

import * as AxiosUtils from '../utils/axios';
import { COLLABORATIONS_API } from '../constants/ApiNames';
import { DATABASE_PATH, ORGANIZATIONS_PATH, PROJECT_PATH, TABLES_PATH } from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_COLLABORATION_ID = uuid();
const MOCK_ORG_ID_1 = uuid();
const MOCK_ORG_ID_2 = uuid();
const MOCK_TABLE_ID = uuid();
const MOCK_NAME = 'test_collaboration';
const MOCK_COLLABORATION = {
  description: 'Test',
  id: MOCK_COLLABORATION_ID,
  name: MOCK_NAME,
  organizationIds: [MOCK_ORG_ID_1, MOCK_ORG_ID_2],
  title: 'Test Collaboration',
};

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(COLLABORATIONS_API, () => {
  runTestSuite(
    CollaborationsApi,
    COLLABORATIONS_API,
    {
      getCollaborations: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: ['/'],
            valid: [],
          },
        },
      },
      createCollaboration: {
        '': { params: { optional: [false], valid: [MOCK_COLLABORATION] } },
        '(collaboration)': {
          method: 'post',
          params: {
            axios: ['/', MOCK_COLLABORATION],
            valid: [MOCK_COLLABORATION],
          },
        },
      },
      getCollaboration: {
        '': { params: { optional: [false], valid: [MOCK_COLLABORATION_ID] } },
        '(collaborationId)': {
          method: 'get',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}`],
            valid: [MOCK_COLLABORATION_ID],
          },
        },
      },
      getCollaborationsIncludingOrganization: {
        '': { params: { optional: [false], valid: [MOCK_ORG_ID_1] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATIONS_PATH}/${MOCK_ORG_ID_1}`],
            valid: [MOCK_ORG_ID_1],
          },
        },
      },
      deleteCollaboration: {
        '': { params: { optional: [false], valid: [MOCK_COLLABORATION_ID] } },
        '(collaborationId)': {
          method: 'delete',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}`],
            valid: [MOCK_COLLABORATION_ID],
          },
        },
      },
      addOrganizationsToCollaboration: {
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1] } },
        '(collaborationId, organzationId)': {
          method: 'post',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`, [MOCK_ORG_ID_1]],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1],
          },
        },
        '(collaborationId, organzationIds)': {
          method: 'post',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`, [MOCK_ORG_ID_1, MOCK_ORG_ID_2]],
            valid: [MOCK_COLLABORATION_ID, [MOCK_ORG_ID_1, MOCK_ORG_ID_2]],
          },
        },
      },
      removeOrganizationsFromCollaboration: {
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1] } },
        '(collaborationId, organzationId)': {
          method: 'delete',
          params: {
            axios: [
              `/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`,
              { data: [MOCK_ORG_ID_1] },
            ],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1],
          },
        },
        '(collaborationId, organzationIds)': {
          method: 'delete',
          params: {
            axios: [
              `/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`,
              { data: [MOCK_ORG_ID_1, MOCK_ORG_ID_2] },
            ],
            valid: [MOCK_COLLABORATION_ID, [MOCK_ORG_ID_1, MOCK_ORG_ID_2]],
          },
        },
      },
      getCollaborationDatabaseInfo: {
        '': { params: { optional: [false], valid: [MOCK_COLLABORATION_ID] } },
        '(collaborationId': {
          method: 'get',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${DATABASE_PATH}`],
            valid: [MOCK_COLLABORATION_ID],
          },
        },
      },
      renameDatabase: {
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_NAME] } },
        '(collaborationId, name)': {
          method: 'patch',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${DATABASE_PATH}`, MOCK_NAME],
            valid: [MOCK_COLLABORATION_ID, MOCK_NAME],
          },
        },
      },
      projectTableToCollaboration: {
        '': {
          params: {
            optional: [false, false, false],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1, MOCK_TABLE_ID]
          }
        },
        '(collaborationId, organizationId, tableId)': {
          method: 'get',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${PROJECT_PATH}/${MOCK_ORG_ID_1}/${MOCK_TABLE_ID}`],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_ID_1, MOCK_TABLE_ID],
          },
        },
      },
      getProjectedTablesInOrganization: {
        '': {
          params: {
            optional: [false],
            valid: [MOCK_ORG_ID_1]
          }
        },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATIONS_PATH}/${MOCK_ORG_ID_1}/${TABLES_PATH}`],
            valid: [MOCK_ORG_ID_1],
          },
        },
      },
    },
  );
});
