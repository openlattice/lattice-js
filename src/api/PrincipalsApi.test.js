import * as PrincipalsApi from './PrincipalsApi';

import * as AxiosUtils from '../utils/axios';
import { PRINCIPALS_API } from '../constants/ApiNames';
import {
  CURRENT_PATH,
  DB_PATH,
  ROLES_PATH,
  SEARCH_PATH,
  SYNC_PATH,
  USERS_PATH,
} from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { PRINCIPAL_MOCK } from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_USER_ID = 'openlattice|12345678901234567890';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(PRINCIPALS_API, () => {
  runTestSuite(
    PrincipalsApi,
    PRINCIPALS_API,
    {
      getAllRoles: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ROLES_PATH}`],
            valid: [],
          },
        },
      },
      getAllUsers: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${USERS_PATH}`],
            valid: [],
          },
        },
      },
      getAtlasCredentials: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${DB_PATH}`],
            valid: [],
          },
        },
      },
      getCurrentRoles: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: [`/${ROLES_PATH}/${CURRENT_PATH}`],
            valid: [],
          },
        },
      },
      getSecurablePrincipal: {
        '': { params: { optional: [false], valid: [PRINCIPAL_MOCK] } },
        '(principals)': {
          method: 'post',
          params: {
            axios: ['/', PRINCIPAL_MOCK],
            valid: [PRINCIPAL_MOCK],
          },
        },
      },
      getUser: {
        '': { params: { optional: [false], valid: [MOCK_USER_ID] } },
        '(userId)': {
          method: 'get',
          params: {
            axios: [`/${USERS_PATH}/${MOCK_USER_ID}`],
            valid: [MOCK_USER_ID],
          },
        },
      },
      searchAllUsers: {
        '': { params: { optional: [false], valid: ['openlattice'] } },
        '(searchQuery)': {
          method: 'get',
          params: {
            axios: [`/${USERS_PATH}/${SEARCH_PATH}/openlattice`],
            valid: ['openlattice'],
          },
        },
      },
      syncUser: {
        '': { params: { optional: [], valid: [] } },
        '(searchQuery)': {
          method: 'get',
          params: {
            axios: [`/${SYNC_PATH}`],
            valid: [],
          },
        },
      },
    },
  );
});
