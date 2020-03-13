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
import { FQN } from '../models';
import { APP_MOCK } from '../models/App';
import { APP_TYPE_MOCK } from '../models/AppType';
import { ORGANIZATION_MOCK } from '../models/Organization';
import { INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING } from '../utils/testing/InvalidParams';
import { genRandomString, getMockAxiosInstance } from '../utils/testing/MockUtils';
import {
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
  testApiShouldUseCorrectAxiosInstance,
} from '../utils/testing/TestUtils';

const MOCK_FQN = FQN.of('mock.fqn');

/*
 * mocks
 */

jest.mock('../utils/axios');
AxiosUtils.getApiAxiosInstance.mockImplementation(() => getMockAxiosInstance());

/*
 * tests
 */

describe('AppApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllApps()', () => {

    const fnToTest = AppApi.getAllApps;

    const validParams = [];
    const invalidParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getApp()', () => {

    const fnToTest = AppApi.getApp;

    describe('by id', () => {

      const validParams = [APP_MOCK.id];
      const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
      const axiosParams = [`/${APP_MOCK.id}`];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

    describe('by name', () => {

      const mockName = genRandomString();
      const validParams = [mockName];
      const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
      const axiosParams = [`/${LOOKUP_PATH}/${mockName}`];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

  });

  describe('getAppConfigs()', () => {

    const fnToTest = AppApi.getAppConfigs;

    const validParams = [APP_MOCK.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${CONFIG_PATH}/${APP_MOCK.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('getAppType()', () => {

    const fnToTest = AppApi.getAppType;

    describe('by id', () => {

      const validParams = [APP_TYPE_MOCK.id];
      const invalidParams = [INVALID_PARAMS];
      const axiosParams = [`/${TYPE_PATH}/${APP_TYPE_MOCK.id}`];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });

    describe('by fqn', () => {

      const validParams = [APP_TYPE_MOCK.type];
      const invalidParams = [INVALID_PARAMS_REQUIRED_STRING];
      const axiosParams = [
        `/${TYPE_PATH}/${LOOKUP_PATH}/${APP_TYPE_MOCK.type.getNamespace()}/${APP_TYPE_MOCK.type.getName()}`
      ];

      testApiShouldReturnPromise(fnToTest, validParams);
      testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
      testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
      testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
      testApiShouldCatchRejectedPromise(fnToTest, validParams);
    });
  });

  describe('getAppTypes', () => {

    const fnToTest = AppApi.getAppTypes;

    const validParams = [[APP_TYPE_MOCK.id]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${BULK_PATH}`, [APP_TYPE_MOCK.id]];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

  describe('installApp()', () => {

    const fnToTest = AppApi.installApp;

    const mockPrefix = genRandomString();
    const validParams = [APP_MOCK.id, ORGANIZATION_MOCK.id, mockPrefix];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING];

    const axiosParams = [
      `/${INSTALL_PATH}/${APP_MOCK.id}/${ORGANIZATION_MOCK.id}/${mockPrefix}`
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });

});
