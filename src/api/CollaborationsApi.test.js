import { v4 as uuid } from 'uuid';

import * as CollaborationsApi from './CollaborationsApi';

import * as AxiosUtils from '../utils/axios';
import { COLLABORATIONS_API } from '../constants/ApiNames';
import {
  ALL_PATH,
  DATABASE_PATH,
  DATA_SETS_PATH,
  ORGANIZATIONS_PATH,
  PROJECT_PATH,
} from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_COLLABORATION_ID = uuid();
const MOCK_ORG_1_ID = uuid();
const MOCK_ORG_2_ID = uuid();
const MOCK_DATA_SET_1_ID = uuid();
const MOCK_DATA_SET_2_ID = uuid();
const MOCK_NAME = 'test_collaboration';
const MOCK_COLLABORATION = {
  description: 'Test',
  id: MOCK_COLLABORATION_ID,
  name: MOCK_NAME,
  organizationIds: [MOCK_ORG_1_ID, MOCK_ORG_2_ID],
  title: 'Test Collaboration',
};

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(COLLABORATIONS_API, () => {
  runTestSuite(
    CollaborationsApi,
    COLLABORATIONS_API,
    {
      getAllCollaborations: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ALL_PATH}`],
            valid: [],
          },
        },
      },
      getCollaborations: {
        '': { params: { optional: [false], valid: [[MOCK_COLLABORATION_ID, MOCK_COLLABORATION_ID]] } },
        '()': {
          method: 'get',
          params: {
            axios: [`?ids=${MOCK_COLLABORATION_ID}%2C${MOCK_COLLABORATION_ID}`],
            valid: [[MOCK_COLLABORATION_ID, MOCK_COLLABORATION_ID]],
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
      getCollaborationsWithOrganization: {
        '': { params: { optional: [false], valid: [MOCK_ORG_1_ID] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATIONS_PATH}/${MOCK_ORG_1_ID}`],
            valid: [MOCK_ORG_1_ID],
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
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID] } },
        '(collaborationId, organzationId)': {
          method: 'patch',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`, [MOCK_ORG_1_ID]],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID],
          },
        },
        '(collaborationId, organzationIds)': {
          method: 'patch',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`, [MOCK_ORG_1_ID, MOCK_ORG_2_ID]],
            valid: [MOCK_COLLABORATION_ID, [MOCK_ORG_1_ID, MOCK_ORG_2_ID]],
          },
        },
      },
      removeOrganizationsFromCollaboration: {
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID] } },
        '(collaborationId, organzationId)': {
          method: 'delete',
          params: {
            axios: [
              `/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`,
              { data: [MOCK_ORG_1_ID] },
            ],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID],
          },
        },
        '(collaborationId, organzationIds)': {
          method: 'delete',
          params: {
            axios: [
              `/${MOCK_COLLABORATION_ID}/${ORGANIZATIONS_PATH}`,
              { data: [MOCK_ORG_1_ID, MOCK_ORG_2_ID] },
            ],
            valid: [MOCK_COLLABORATION_ID, [MOCK_ORG_1_ID, MOCK_ORG_2_ID]],
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
      renameCollaborationDatabase: {
        '': { params: { optional: [false, false], valid: [MOCK_COLLABORATION_ID, MOCK_NAME] } },
        '(collaborationId, name)': {
          method: 'patch',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${DATABASE_PATH}`, MOCK_NAME],
            valid: [MOCK_COLLABORATION_ID, MOCK_NAME],
          },
        },
      },
      addDataSetToCollaboration: {
        '': {
          params: {
            optional: [false, false, false],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID, MOCK_DATA_SET_1_ID]
          }
        },
        '(collaborationId, organizationId, dataSetId)': {
          method: 'patch',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${PROJECT_PATH}/${MOCK_ORG_1_ID}/${MOCK_DATA_SET_1_ID}`],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID, MOCK_DATA_SET_1_ID],
          },
        },
      },
      removeDataSetFromCollaboration: {
        '': {
          params: {
            optional: [false, false, false],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID, MOCK_DATA_SET_1_ID]
          }
        },
        '(collaborationId, organizationId, dataSetId)': {
          method: 'delete',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${PROJECT_PATH}/${MOCK_ORG_1_ID}/${MOCK_DATA_SET_1_ID}`],
            valid: [MOCK_COLLABORATION_ID, MOCK_ORG_1_ID, MOCK_DATA_SET_1_ID],
          },
        },
      },
      getOrganizationCollaborationDataSets: {
        '': {
          params: {
            optional: [false],
            valid: [MOCK_ORG_1_ID]
          }
        },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATIONS_PATH}/${MOCK_ORG_1_ID}/${DATA_SETS_PATH}`],
            valid: [MOCK_ORG_1_ID],
          },
        },
      },
      getCollaborationDataSets: {
        '': {
          params: {
            optional: [false],
            valid: [MOCK_COLLABORATION_ID]
          }
        },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${MOCK_COLLABORATION_ID}/${DATA_SETS_PATH}`],
            valid: [MOCK_COLLABORATION_ID],
          },
        },
      },
      getCollaborationsWithDataSets: {
        '': { params: { optional: [false], valid: [MOCK_DATA_SET_1_ID] } },
        '(dataSetId)': {
          method: 'post',
          params: {
            axios: [`/${DATA_SETS_PATH}`, [MOCK_DATA_SET_1_ID]],
            valid: [MOCK_DATA_SET_1_ID],
          },
        },
        '(dataSetIds)': {
          method: 'post',
          params: {
            axios: [`/${DATA_SETS_PATH}`, [MOCK_DATA_SET_1_ID, MOCK_DATA_SET_2_ID]],
            valid: [[MOCK_DATA_SET_1_ID, MOCK_DATA_SET_2_ID]],
          },
        },
      },
    },
  );
});
