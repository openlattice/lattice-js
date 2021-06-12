import * as DataSetMetadataApi from './DataSetMetadataApi';

import * as AxiosUtils from '../utils/axios';
import { DATA_SET_METADATA_API } from '../constants/ApiNames';
import {
  COLUMNS_PATH,
  DATA_SETS_PATH,
  ORGANIZATIONS_PATH,
  UPDATE_PATH,
} from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import {
  ENTITY_SET_MOCK,
  METADATA_UPDATE_MOCK,
  ORGANIZATION_MOCK,
  PROPERTY_TYPE_MOCK,
} from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(DATA_SET_METADATA_API, () => {
  runTestSuite(
    DataSetMetadataApi,
    DATA_SET_METADATA_API,
    {
      getDataSetMetadata: {
        '': { params: { optional: [false], valid: [ENTITY_SET_MOCK.id] } },
        '(dataSetId)': {
          method: 'get',
          params: {
            axios: [`/${DATA_SETS_PATH}/${ENTITY_SET_MOCK.id}`],
            valid: [ENTITY_SET_MOCK.id],
          },
        },
      },
      getDataSetsMetadata: {
        '': { params: { optional: [false], valid: [[ENTITY_SET_MOCK.id]] } },
        '(dataSetIds)': {
          method: 'post',
          params: {
            axios: [`/${DATA_SETS_PATH}`, [ENTITY_SET_MOCK.id]],
            valid: [[ENTITY_SET_MOCK.id]],
          },
        },
      },
      getDataSetColumnMetadata: {
        '': { params: { optional: [false, false], valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id] } },
        '(dataSetId, columnId)': {
          method: 'get',
          params: {
            axios: [`/${COLUMNS_PATH}/${ENTITY_SET_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`],
            valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id],
          },
        },
      },
      getDataSetColumnsMetadata: {
        '': { params: { optional: [false, false], valid: [[ENTITY_SET_MOCK.id]] } },
        '(dataSetIds)': {
          method: 'post',
          params: {
            axios: [`/${COLUMNS_PATH}`, [ENTITY_SET_MOCK.id]],
            valid: [[ENTITY_SET_MOCK.id]],
          },
        },
      },
      getOrganizationDataSetsMetadata: {
        '': { params: { optional: [false], valid: [[ORGANIZATION_MOCK.id]] } },
        '(organizationId)': {
          method: 'post',
          params: {
            axios: [`/${DATA_SETS_PATH}/${ORGANIZATIONS_PATH}/${ORGANIZATION_MOCK.id}`],
            valid: [[ORGANIZATION_MOCK.id]],
          },
        },
      },
      updateDataSetMetadata: {
        '': { params: { optional: [false, false], valid: [ENTITY_SET_MOCK.id, METADATA_UPDATE_MOCK] } },
        '(dataSetId, metadata)': {
          method: 'patch',
          params: {
            axios: [`/${UPDATE_PATH}/${ENTITY_SET_MOCK.id}`, METADATA_UPDATE_MOCK],
            valid: [ENTITY_SET_MOCK.id, METADATA_UPDATE_MOCK],
          },
        },
      },
      updateDataSetColumnMetadata: {
        '': {
          params: {
            optional: [false, false, false],
            valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id, METADATA_UPDATE_MOCK],
          }
        },
        '(dataSetId, columnId, metadata)': {
          method: 'patch',
          params: {
            axios: [`/${UPDATE_PATH}/${ENTITY_SET_MOCK.id}/${PROPERTY_TYPE_MOCK.id}`, METADATA_UPDATE_MOCK],
            valid: [ENTITY_SET_MOCK.id, PROPERTY_TYPE_MOCK.id, METADATA_UPDATE_MOCK],
          },
        },
      },
    },
  );
});
