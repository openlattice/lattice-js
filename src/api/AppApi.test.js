/* eslint-disable no-use-before-define */

import * as AppApi from './AppApi';
import * as AxiosUtils from '../utils/axios';
import PermissionTypes from '../constants/types/PermissionTypes';
import { APP_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import {
  MOCK_APP_DM,
  MOCK_APP_TYPE_DM,
  MOCK_ENTITY_SET_DM,
  MOCK_FQN,
  MOCK_ORGANIZATION_DM
} from '../utils/testing/MockDataModels';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH,
  UPDATE_PATH
} from '../constants/UrlConstants';

import {
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectDeleteRequest,
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
  testCreateApp();
  testCreateAppType();
  testGetAppType();
  testGetAppTypeByFqn();
  testDeleteApp();
  testDeleteAppType();
  testAddAppTypeToApp();
  testRemoveAppTypeFromApp();
  testUpdateAppEntitySetConfig();
  testUpdateAppConfigPermissions();
  testUpdateAppMetadata();
  testUpdateAppTypeMetadata();
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

function testCreateApp() {

  describe('createApp()', () => {

    const functionToTest = AppApi.createApp;

    const validParams = [MOCK_APP_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_APP_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testCreateAppType() {

  describe('createAppType()', () => {

    const functionToTest = AppApi.createAppType;

    const validParams = [MOCK_APP_TYPE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}`, MOCK_APP_TYPE_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testGetAppType() {

  describe('getAppType()', () => {

    const fnToTest = AppApi.getAppType;

    const validParams = [MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(fnToTest, validParams, axiosParams);
  });
}

function testGetAppTypeByFqn() {

  describe('getAppTypeByFqn()', () => {

    const fnToTest = AppApi.getAppTypeByFqn;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${LOOKUP_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(fnToTest, validParams, axiosParams);
  });
}

function testDeleteApp() {

  describe('deleteApp()', () => {

    const fnToTest = AppApi.deleteApp;

    const validParams = [MOCK_APP_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_APP_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(fnToTest, validParams, axiosParams);
  });
}

function testDeleteAppType() {

  describe('deleteAppType()', () => {

    const fnToTest = AppApi.deleteAppType;

    const validParams = [MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(fnToTest, validParams, axiosParams);
  });
}

function testAddAppTypeToApp() {

  describe('addAppTypeToApp()', () => {

    const fnToTest = AppApi.addAppTypeToApp;

    const validParams = [MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(fnToTest, validParams, axiosParams);
  });
}

function testRemoveAppTypeFromApp() {

  describe('removeAppTypeFromApp()', () => {

    const fnToTest = AppApi.removeAppTypeFromApp;

    const validParams = [MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(fnToTest, validParams, axiosParams);
  });
}

function testUpdateAppEntitySetConfig() {

  describe('updateAppEntitySetConfig()', () => {

    const fnToTest = AppApi.updateAppEntitySetConfig;

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id, MOCK_ENTITY_SET_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION_DM.id}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}/${MOCK_ENTITY_SET_DM.id}`
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(fnToTest, validParams, axiosParams);
  });
}

function testUpdateAppConfigPermissions() {

  describe('updateAppConfigPermissions()', () => {

    const fnToTest = AppApi.updateAppConfigPermissions;
    const permissions = [PermissionTypes.READ, PermissionTypes.WRITE];

    const validParams = [MOCK_ORGANIZATION_DM.id, MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id, permissions];
    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      [INVALID_PARAMS_SS, INVALID_PARAMS_SS]
    ];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION_DM.id}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`,
      permissions
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(fnToTest, validParams, axiosParams);
  });
}

function testUpdateAppMetadata() {

  describe('updateAppMetadata()', () => {

    const fnToTest = AppApi.updateAppMetadata;
    const MOCK_METADATA_UPDATE = {
      appTypeIds: [genRandomUUID(), genRandomUUID()],
      description: genRandomString(),
      id: genRandomUUID(),
      name: genRandomString(),
      title: genRandomString(),
      url: genRandomString()
    };

    const validParams = [MOCK_APP_DM.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP_DM.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(fnToTest, validParams, axiosParams);
  });
}

function testUpdateAppTypeMetadata() {

  describe('updateAppTypeMetadata()', () => {

    const fnToTest = AppApi.updateAppTypeMetadata;
    const MOCK_METADATA_UPDATE = {
      description: genRandomString(),
      entityTypeId: genRandomUUID(),
      id: genRandomUUID(),
      title: genRandomString(),
      type: MOCK_FQN
    };

    const validParams = [MOCK_APP_TYPE_DM.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${UPDATE_PATH}/${MOCK_APP_TYPE_DM.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(fnToTest, validParams, axiosParams);
  });
}
