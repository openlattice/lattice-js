import * as AuthorizationApi from './AuthorizationApi';

import * as AxiosUtils from '../utils/axios';
import { AUTHORIZATION_API } from '../constants/ApiNames';
import { ACCESS_CHECK_MOCK } from '../models/AccessCheck';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(AUTHORIZATION_API, () => {
  runTestSuite(
    AuthorizationApi,
    AUTHORIZATION_API,
    {
      getAuthorizations: {
        '': { params: { optional: [false], valid: [[ACCESS_CHECK_MOCK]] } },
        '(accessChecks)': {
          method: 'post',
          params: {
            axios: ['/', [ACCESS_CHECK_MOCK]],
            valid: [[ACCESS_CHECK_MOCK]],
          },
        },
      },
    },
  );
});
