import * as DataIntegrationApi from './DataIntegrationApi';

import * as AxiosUtils from '../utils/axios';
import { DATA_INTEGRATION_API } from '../constants/ApiNames';
import { ENTITY_KEY_IDS_PATH } from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_ENTITY_KEYS = [
  { entitySetId: '9aed024f-6435-4500-91b5-79c055bc1559', entityId: 'entityId1' },
  { entitySetId: 'e28e2def-fade-4b2b-8be6-fd6c5b9ffbcd', entityId: 'entityId2' },
  { entitySetId: '22949a05-19c8-450c-8079-fcf478ab4b23', entityId: 'entityId3' },
];

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(DATA_INTEGRATION_API, () => {
  runTestSuite(
    DataIntegrationApi,
    DATA_INTEGRATION_API,
    {
      getEntityKeyIds: {
        '': { params: { optional: [false], valid: [MOCK_ENTITY_KEYS] } },
        '(entityKeys)': {
          method: 'post',
          params: {
            axios: [`/${ENTITY_KEY_IDS_PATH}`, MOCK_ENTITY_KEYS],
            valid: [MOCK_ENTITY_KEYS],
          },
        },
      },
    },
  );
});
