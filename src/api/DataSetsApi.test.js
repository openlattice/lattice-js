import * as DataSetsApi from './DataSetsApi';

import * as AxiosUtils from '../utils/axios';
import { DATA_SETS_API } from '../constants/ApiNames';
import {
  DATA_PATH,
  EXTERNAL_DB_COLUMN_PATH,
  EXTERNAL_DB_TABLE_PATH,
  SCHEMA_PATH,
} from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import { ORGANIZATION_MOCK } from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_DATA_SET_ID = '8034b3e1-b149-4ca0-ba1f-282f055da71f';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(DATA_SETS_API, () => {
  runTestSuite(
    DataSetsApi,
    DATA_SETS_API,
    {
      getOrganizationDataSet: {
        '': { params: { optional: [false, false, true], valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID, true] } },
        '(organizationId, dataSetId)': {
          method: 'get',
          params: {
            axios: [
              `/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`
            ],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID],
          },
        },
        '(organizationId, dataSetId, columns=true)': {
          method: 'get',
          params: {
            axios: [
              `/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`
            ],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID, true],
          },
        },
        '(organizationId, dataSetId, columns=false)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/${EXTERNAL_DB_TABLE_PATH}`],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID, false],
          },
        },
      },
      getOrganizationDataSets: {
        '': { params: { optional: [false, true], valid: [ORGANIZATION_MOCK.id, true] } },
        '(organizationId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`],
            valid: [ORGANIZATION_MOCK.id],
          },
        },
        '(organizationId, columns=true)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${EXTERNAL_DB_TABLE_PATH}/${EXTERNAL_DB_COLUMN_PATH}`],
            valid: [ORGANIZATION_MOCK.id, true],
          },
        },
        '(organizationId, columns=false)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${EXTERNAL_DB_TABLE_PATH}`],
            valid: [ORGANIZATION_MOCK.id, false],
          },
        },
      },
      getOrganizationDataSetData: {
        '': { params: { optional: [false, false, true], valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID, 10] } },
        '(organizationId, dataSetId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/10/${DATA_PATH}`],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID],
          },
        },
        '(organizationId, dataSetId, count)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/97/${DATA_PATH}`],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID, 97],
          },
        },
      },
      getOrganizationDataSetSchema: {
        '': { params: { optional: [false, false], valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID] } },
        '(organizationId, dataSetId)': {
          method: 'get',
          params: {
            axios: [`/${ORGANIZATION_MOCK.id}/${MOCK_DATA_SET_ID}/${SCHEMA_PATH}`],
            valid: [ORGANIZATION_MOCK.id, MOCK_DATA_SET_ID],
          },
        },
      },
    },
  );
});
