/* eslint-disable no-use-before-define */

import * as AppApi from './AppApi';

import PermissionTypes from '../constants/types/PermissionTypes';
import * as AxiosUtils from '../utils/axios';
import { APP_API } from '../constants/ApiNames';
import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH,
  UPDATE_PATH,
} from '../constants/UrlConstants';
import { FQN } from '../models';
import { MOCK_APP } from '../models/App';
import { MOCK_APP_TYPE } from '../models/AppType';
import { MOCK_ENTITY_SET } from '../models/EntitySet';
import { MOCK_ORGANIZATION } from '../models/Organization';
import { INVALID_PARAMS, INVALID_PARAMS_REQUIRED_STRING } from '../utils/testing/InvalidParams';
import { genRandomString, genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';
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

    const fnToTest = AppApi.getApps;

    const validParams = [];
    const invalidParams = [];
    const axiosParams = ['/'];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetApp() {

  describe('getApp()', () => {

    const fnToTest = AppApi.getApp;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${mockId}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAppByName() {

  describe('getAppByName', () => {

    const fnToTest = AppApi.getAppByName;
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
}

function testGetAppTypesForAppTypeIds() {

  describe('getAppTypesForAppTypeIds', () => {

    const fnToTest = AppApi.getAppTypesForAppTypeIds;
    const mockId = genRandomUUID();

    const validParams = [[mockId]];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [
      `/${TYPE_PATH}/${BULK_PATH}`,
      [mockId]
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetConfigurations() {

  describe('getConfigurations()', () => {

    const fnToTest = AppApi.getConfigurations;
    const mockId = genRandomUUID();

    const validParams = [mockId];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${CONFIG_PATH}/${mockId}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testInstallApp() {

  describe('installApp()', () => {

    const fnToTest = AppApi.installApp;
    const mockId = genRandomUUID();
    const mockPrefix = genRandomString();

    const validParams = [
      mockId,
      MOCK_ORGANIZATION.id,
      mockPrefix,
    ];

    const invalidParams = [
      INVALID_PARAMS,
      INVALID_PARAMS,
      INVALID_PARAMS_REQUIRED_STRING,
    ];

    const axiosParams = [
      `/${INSTALL_PATH}/${mockId}/${MOCK_ORGANIZATION.id}/${mockPrefix}`
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreateApp() {

  describe('createApp()', () => {

    const fnToTest = AppApi.createApp;

    const validParams = [MOCK_APP];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_APP];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testCreateAppType() {

  describe('createAppType()', () => {

    const fnToTest = AppApi.createAppType;

    const validParams = [MOCK_APP_TYPE];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}`, MOCK_APP_TYPE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAppType() {

  describe('getAppType()', () => {

    const fnToTest = AppApi.getAppType;

    const validParams = [MOCK_APP_TYPE.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testGetAppTypeByFqn() {

  describe('getAppTypeByFqn()', () => {

    const fnToTest = AppApi.getAppTypeByFqn;

    const validParams = [MOCK_FQN];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${LOOKUP_PATH}/${MOCK_FQN.namespace}/${MOCK_FQN.name}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testDeleteApp() {

  describe('deleteApp()', () => {

    const fnToTest = AppApi.deleteApp;

    const validParams = [MOCK_APP.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${MOCK_APP.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testDeleteAppType() {

  describe('deleteAppType()', () => {

    const fnToTest = AppApi.deleteAppType;

    const validParams = [MOCK_APP_TYPE.id];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${MOCK_APP_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testAddAppTypeToApp() {

  describe('addAppTypeToApp()', () => {

    const fnToTest = AppApi.addAppTypeToApp;

    const validParams = [MOCK_APP.id, MOCK_APP_TYPE.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP.id}/${MOCK_APP_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testRemoveAppTypeFromApp() {

  describe('removeAppTypeFromApp()', () => {

    const fnToTest = AppApi.removeAppTypeFromApp;

    const validParams = [MOCK_APP.id, MOCK_APP_TYPE.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP.id}/${MOCK_APP_TYPE.id}`];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'delete');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdateAppEntitySetConfig() {

  describe('updateAppEntitySetConfig()', () => {

    const fnToTest = AppApi.updateAppEntitySetConfig;

    const validParams = [MOCK_ORGANIZATION.id, MOCK_APP.id, MOCK_APP_TYPE.id, MOCK_ENTITY_SET.id];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION.id}/${MOCK_APP.id}/${MOCK_APP_TYPE.id}/${MOCK_ENTITY_SET.id}`
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'get');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}

function testUpdateAppConfigPermissions() {

  describe('updateAppConfigPermissions()', () => {

    const fnToTest = AppApi.updateAppConfigPermissions;
    const permissions = [PermissionTypes.READ, PermissionTypes.WRITE];

    const validParams = [MOCK_ORGANIZATION.id, MOCK_APP.id, MOCK_APP_TYPE.id, permissions];
    const invalidParams = [
      INVALID_PARAMS,
      INVALID_PARAMS,
      INVALID_PARAMS,
      [INVALID_PARAMS, INVALID_PARAMS],
    ];
    const axiosParams = [
      `/${UPDATE_PATH}/${MOCK_ORGANIZATION.id}/${MOCK_APP.id}/${MOCK_APP_TYPE.id}`,
      permissions
    ];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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

    const validParams = [MOCK_APP.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${UPDATE_PATH}/${MOCK_APP.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
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
      type: MOCK_FQN,
    };

    const validParams = [MOCK_APP_TYPE.id, MOCK_METADATA_UPDATE];
    const invalidParams = [INVALID_PARAMS, INVALID_PARAMS];
    const axiosParams = [`/${TYPE_PATH}/${UPDATE_PATH}/${MOCK_APP_TYPE.id}`, MOCK_METADATA_UPDATE];

    testApiShouldReturnPromise(fnToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(fnToTest, validParams, APP_API);
    testApiShouldNotThrowOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(fnToTest, validParams, invalidParams);
    testApiShouldSendCorrectHttpRequest(fnToTest, validParams, axiosParams, 'post');
    testApiShouldCatchRejectedPromise(fnToTest, validParams);
  });
}
