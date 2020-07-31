import * as PersistentSearchApi from './PersistentSearchApi';

import * as AxiosUtils from '../utils/axios';
import { PERSISTENT_SEARCH_API } from '../constants/ApiNames';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_PS_ID = '4fdc5bf1-ac50-4c89-896a-5e37882d7daf';
const MOCK_EXPIRATION = '2020-03-24T15:22:13.079-07:00';
const MOCK_PS = {
  expiration: MOCK_EXPIRATION,
  constraints: {},
  type: 'TEST',
};

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(PERSISTENT_SEARCH_API, () => {
  runTestSuite(
    PersistentSearchApi,
    PERSISTENT_SEARCH_API,
    {
      createPersistentSearch: {
        '': { params: { optional: [false], valid: [MOCK_PS] } },
        '(persistentSearch)': {
          method: 'post',
          params: {
            axios: ['', MOCK_PS],
            valid: [MOCK_PS],
          },
        },
      },
      expirePersistentSearch: {
        '': { params: { optional: [false], valid: [MOCK_PS_ID] } },
        '(persistentSearchId)': {
          method: 'delete',
          params: {
            axios: [`/${MOCK_PS_ID}`],
            valid: [MOCK_PS_ID],
          },
        },
      },
      getPersistentSearches: {
        '': { params: { optional: [false], valid: [true] } },
        '(includeExpired=true)': {
          method: 'get',
          params: {
            axios: [`?includeExpired=${true}`],
            valid: [true],
          },
        },
        '(includeExpired=false)': {
          method: 'get',
          params: {
            axios: [`?includeExpired=${false}`],
            valid: [false],
          },
        },
      },
      updatePersistentSearchExpiration: {
        '': { params: { optional: [false], valid: [MOCK_PS_ID, MOCK_EXPIRATION] } },
        '(updatePersistentSearchExpiration)': {
          method: 'patch',
          params: {
            axios: [
              `/${MOCK_PS_ID}/expiration`,
              MOCK_EXPIRATION,
              { headers: { 'Content-Type': 'application/json' } }
            ],
            valid: [MOCK_PS_ID, MOCK_EXPIRATION],
          },
        },
      },
    },
  );
});
