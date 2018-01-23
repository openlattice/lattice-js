/* eslint-disable no-use-before-define */

import * as AppApi from './AppApi';
import * as AxiosUtils from '../utils/axios';
import { APP_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_ORGANIZATION_DM } from '../utils/testing/MockDataModels';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH
} from '../constants/ApiPaths';

import {
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectGetRequest,
  testApiShouldSendCorrectPostRequest,
  testApiShouldUseCorrectAxiosInstance
} from '../utils/testing/TestUtils';

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

  testGetApps();
  testGetApp();
  testGetAppByName();
  testGetAppTypesForAppTypeIds();
  testGetConfigurations();
  testInstallApp();
});

function testGetApps() {

  describe('getApps()', () => {

    const functionToTest = AppApi.getApps;

    const validParams = [];
    const invalidParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetApp() {

  describe('getApp()', () => {

    const functionToTest = AppApi.getApp;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${mockId}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetAppByName() {

  describe('getAppByName', () => {

    const functionToTest = AppApi.getAppByName;
    const mockName = genRandomString();

    const validParams = [mockName];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${LOOKUP_PATH}/${mockName}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetAppTypesForAppTypeIds() {

  describe('getAppTypesForAppTypeIds', () => {

    const functionToTest = AppApi.getAppTypesForAppTypeIds;
    const mockId = genRandomUUID();

    const validParams = [[mockId]];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [
      `/${TYPE_PATH}/${BULK_PATH}`,
      [mockId]
    ];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetConfigurations() {

  describe('getConfigurations()', () => {

    const functionToTest = AppApi.getConfigurations;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${CONFIG_PATH}/${mockId}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testInstallApp() {

  describe('installApp()', () => {

    const functionToTest = AppApi.installApp;
    const mockId = genRandomUUID();
    const mockPrefix = genRandomString();

    const validParams = [
      mockId,
      MOCK_ORGANIZATION_DM.id,
      mockPrefix
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${INSTALL_PATH}/${mockId}/${MOCK_ORGANIZATION_DM.id}/${mockPrefix}`
    ];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}
