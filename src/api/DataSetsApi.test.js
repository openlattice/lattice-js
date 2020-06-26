import * as DataSetsApi from './DataSetsApi';

import * as AxiosUtils from '../utils/axios';
import { DATA_SETS_API } from '../constants/ApiNames';
import {
  EXTERNAL_DB_COLUMN_PATH,
  EXTERNAL_DB_TABLE_PATH,
} from '../constants/UrlConstants';
import { ORGANIZATION_MOCK } from '../models/Organization';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(DATA_SETS_API, () => {
  runTestSuite(
    DataSetsApi,
    DATA_SETS_API,
    {
      getOrganizationDataSets: {
        '': { params: { optional: [false], valid: [ORGANIZATION_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${EXTERNAL_DB_TABLE_PATH}`],
            valid: [ORGANIZATION_MOCK.id],
          },
        },
      },
      getOrganizationDataSetsWithColumns: {
        '': { params: { optional: [false], valid: [ORGANIZATION_MOCK.id] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`],
            valid: [ORGANIZATION_MOCK.id],
          },
        },
      },
    },
  );
});
