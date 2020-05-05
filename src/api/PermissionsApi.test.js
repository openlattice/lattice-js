import * as PermissionsApi from './PermissionsApi';

import * as AxiosUtils from '../utils/axios';
import { PERMISSIONS_API } from '../constants/ApiNames';
import { EXPLAIN_PATH, UPDATE_PATH } from '../constants/UrlConstants';
import { ACL_DATA_MOCK } from '../models/AclData';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_ACL_KEY = [
  'c7586209-552a-4dbd-b826-c6c262070291',
  'a0f46850-6115-4223-aa8b-abc269a7d375',
];

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(PERMISSIONS_API, () => {
  runTestSuite(
    PermissionsApi,
    PERMISSIONS_API,
    {
      getAcl: {
        '': { params: { optional: [false], valid: [MOCK_ACL_KEY] } },
        '(aclKey)': {
          method: 'post',
          params: {
            axios: ['/', MOCK_ACL_KEY],
            valid: [MOCK_ACL_KEY],
          },
        },
      },
      getAclExplanation: {
        '': { params: { optional: [false], valid: [MOCK_ACL_KEY] } },
        '(aclKey)': {
          method: 'post',
          params: {
            axios: [`/${EXPLAIN_PATH}`, MOCK_ACL_KEY],
            valid: [MOCK_ACL_KEY],
          },
        },
      },
      updateAcl: {
        '': { params: { optional: [false], valid: [ACL_DATA_MOCK] } },
        '(aclData)': {
          method: 'patch',
          params: {
            axios: ['/', ACL_DATA_MOCK],
            valid: [ACL_DATA_MOCK],
          },
        },
      },
      updateAcls: {
        '': { params: { optional: [false], valid: [[ACL_DATA_MOCK]] } },
        '(aclData)': {
          method: 'patch',
          params: {
            axios: [`/${UPDATE_PATH}`, [ACL_DATA_MOCK]],
            valid: [[ACL_DATA_MOCK]],
          },
        },
      },
    },
  );
});
