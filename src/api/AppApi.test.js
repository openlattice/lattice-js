/* eslint-disable no-use-before-define */

import * as AppApi from './AppApi';
import * as AxiosUtils from '../utils/axios';
import PermissionTypes from '../constants/types/PermissionTypes';
import { APP_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import {
  MOCK_APP_DM,
  MOCK_APP_TYPE_DM,
  MOCK_ENTITY_SET,
  MOCK_FQN,
  MOCK_ORGANIZATION,
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
  testApiShouldCatchRejectedPromise,
  testApiShouldNotThrowOnInvalidParameters,
  testApiShouldRejectOnInvalidParameters,
  testApiShouldReturnPromise,
  testApiShouldSendCorrectHttpRequest,
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

    const apiToTest = AppApi.getApps;

    const validParams = [];
    const invalidParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetApp() {

  describe('getApp()', () => {

    const apiToTest = AppApi.getApp;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${mockId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAppByName() {

  describe('getAppByName', () => {

    const apiToTest = AppApi.getAppByName;
    const mockName = genRandomString();

    const validParams = [mockName];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${LOOKUP_PATH}/${mockName}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAppTypesForAppTypeIds() {

  describe('getAppTypesForAppTypeIds', () => {

    const apiToTest = AppApi.getAppTypesForAppTypeIds;
    const mockId = genRandomUUID();

    const validParams = [[mockId]];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [
      `/${TYPE_PATH}/${BULK_PATH}`,
      [mockId]
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetConfigurations() {

  describe('getConfigurations()', () => {

    const apiToTest = AppApi.getConfigurations;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${CONFIG_PATH}/${mockId}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testInstallApp() {

  describe('installApp()', () => {

    const apiToTest = AppApi.installApp;
    const mockId = genRandomUUID();
    const mockPrefix = genRandomString();

    const validParams = [
      mockId,
      MOCK_ORGANIZATION.id,
      mockPrefix
    ];

    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS
    ];

    const axiosParams = [
      `/${INSTALL_PATH}/${mockId}/${MOCK_ORGANIZATION.id}/${mockPrefix}`
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreateApp() {

  describe('createApp()', () => {

    const apiToTest = AppApi.createApp;

    const validParams = [MOCK_APP_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_APP_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testCreateAppType() {

  describe('createAppType()', () => {

    const apiToTest = AppApi.createAppType;

    const validParams = [MOCK_APP_TYPE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}`, MOCK_APP_TYPE_DM];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAppType() {

  describe('getAppType()', () => {

    const apiToTest = AppApi.getAppType;

    const validParams = [MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testGetAppTypeByFqn() {

  describe('getAppTypeByFqn()', () => {

    const apiToTest = AppApi.getAppTypeByFqn;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${LOOKUP_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testDeleteApp() {

  describe('deleteApp()', () => {

    const apiToTest = AppApi.deleteApp;

    const validParams = [MOCK_APP_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_APP_DM.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testDeleteAppType() {

  describe('deleteAppType()', () => {

    const apiToTest = AppApi.deleteAppType;

    const validParams = [MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testAddAppTypeToApp() {

  describe('addAppTypeToApp()', () => {

    const apiToTest = AppApi.addAppTypeToApp;

    const validParams = [MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testRemoveAppTypeFromApp() {

  describe('removeAppTypeFromApp()', () => {

    const apiToTest = AppApi.removeAppTypeFromApp;

    const validParams = [MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateAppEntitySetConfig() {

  describe('updateAppEntitySetConfig()', () => {

    const apiToTest = AppApi.updateAppEntitySetConfig;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id, MOCK_ENTITY_SET.id];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION.id}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}/${MOCK_ENTITY_SET.id}`
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateAppConfigPermissions() {

  describe('updateAppConfigPermissions()', () => {

    const apiToTest = AppApi.updateAppConfigPermissions;
    const permissions = [PermissionTypes.READ, PermissionTypes.WRITE];

    const validParams = [MOCK_ORGANIZATION.id, MOCK_APP_DM.id, MOCK_APP_TYPE_DM.id, permissions];
    const invalidParams = [
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      INVALID_PARAMS_SS,
      [INVALID_PARAMS_SS, INVALID_PARAMS_SS]
    ];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION.id}/${MOCK_APP_DM.id}/${MOCK_APP_TYPE_DM.id}`,
      permissions
    ];

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateAppMetadata() {

  describe('updateAppMetadata()', () => {

    const apiToTest = AppApi.updateAppMetadata;
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

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}

function testUpdateAppTypeMetadata() {

  describe('updateAppTypeMetadata()', () => {

    const apiToTest = AppApi.updateAppTypeMetadata;
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

    testApiShouldReturnPromise(apiToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(apiToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(apiToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(apiToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(apiToTest, validParams);
  });
}
