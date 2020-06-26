import * as AppApi from './AppApi';

import * as AxiosUtils from '../utils/axios';
import { APP_API } from '../constants/ApiNames';
import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH,
} from '../constants/UrlConstants';
import { runTestSuite } from '../utils/testing/APITestSuite';
import {
  APP_MOCK,
  APP_TYPE_MOCK,
  ORGANIZATION_MOCK as ORG_MOCK,
} from '../utils/testing/MockData';
import { getMockAxiosInstance } from '../utils/testing/MockUtils';

const MOCK_PREFIX = 'mock-prefix';

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

describe(APP_API, () => {
  runTestSuite(
    AppApi,
    APP_API,
    {
      getAllApps: {
        '': { params: { optional: [], valid: [] } },
        '()': {
          method: 'get',
          params: {
            axios: ['/'],
            valid: [],
          },
        },
      },
      getApp: {
        '': { params: { optional: [false], valid: [APP_MOCK.name] } },
        '(appId)': {
          method: 'get',
          params: {
            axios: [`/${APP_MOCK.id}`],
            valid: [APP_MOCK.id],
          },
        },
        '(appName)': {
          method: 'get',
          params: {
            axios: [`/${LOOKUP_PATH}/${APP_MOCK.name}`],
            valid: [APP_MOCK.name],
          },
        },
      },
      getAppConfigs: {
        '': { params: { optional: [false], valid: [APP_MOCK.id] } },
        '(appId)': {
          method: 'get',
          params: {
            axios: [`/${CONFIG_PATH}/${APP_MOCK.id}`],
            valid: [APP_MOCK.id],
          },
        },
      },
      getAppType: {
        '': { params: { optional: [false], valid: [APP_TYPE_MOCK.id] } },
        '(appTypeId)': {
          method: 'get',
          params: {
            axios: [`/${TYPE_PATH}/${APP_TYPE_MOCK.id}`],
            valid: [APP_TYPE_MOCK.id],
          },
        },
        '(appTypeFQN)': {
          method: 'get',
          params: {
            axios: [
              `/${TYPE_PATH}/${LOOKUP_PATH}/${APP_TYPE_MOCK.type.getNamespace()}/${APP_TYPE_MOCK.type.getName()}`
            ],
            valid: [APP_TYPE_MOCK.type],
          },
        },
      },
      getAppTypes: {
        '': { params: { optional: [false], valid: [[APP_TYPE_MOCK.id]] } },
        '(appTypeIds)': {
          method: 'post',
          params: {
            axios: [`/${TYPE_PATH}/${BULK_PATH}`, [APP_TYPE_MOCK.id]],
            valid: [[APP_TYPE_MOCK.id]],
          },
        },
      },
      installApp: {
        '': { params: { optional: [false, false, false], valid: [APP_MOCK.id, ORG_MOCK.id, MOCK_PREFIX] } },
        '(appId, organizationId, prefix)': {
          method: 'get',
          params: {
            axios: [`/${INSTALL_PATH}/${APP_MOCK.id}/${ORG_MOCK.id}/${MOCK_PREFIX}`],
            valid: [APP_MOCK.id, ORG_MOCK.id, MOCK_PREFIX],
          },
        },
      },
    },
  );
});
