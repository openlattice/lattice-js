import * as AuthorizationsApi from './AuthorizationsApi';

import * as AxiosUtils from '../utils/axios';
import { AUTHORIZATIONS_API } from '../constants/ApiNames';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { ACCESS_CHECK_MOCK } from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(AUTHORIZATIONS_API, () => {
  runTestSuite(
    AuthorizationsApi,
    AUTHORIZATIONS_API,
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
