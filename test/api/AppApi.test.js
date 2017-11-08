/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/AxiosUtils';
import * as AppApi from '../../src/api/AppApi';

import { APP_API } from '../../src/constants/ApiNames';
import { getMockAxiosInstance } from '../utils/MockDataUtils';

import {
  BULK_PATH,
  CONFIG_PATH,
  INSTALL_PATH,
  LOOKUP_PATH,
  TYPE_PATH
} from '../../src/constants/ApiPaths';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_ORGANIZATION_DM
} from '../constants/MockDataModels';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const MOCK_APP_ID = 'ec6865e6-e60e-424b-a071-6a9c1603d735';
const MOCK_APP_NAME = 'AppyApp';
const MOCK_PREFIX = 'prefix';

let mockAxiosInstance = null;

describe('AppApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
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

    it('should send a GET request with the correct URL path', (done) => {

      AppApi.getApps()
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith('/');
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetApp() {

  describe('getApp()', () => {

    const functionToTest = AppApi.getApp;

    const validParams = [MOCK_APP_ID];
    const invalidParams = [INVALID_SS_PARAMS];

    it('should send a GET request with the correct URL path', (done) => {

      AppApi.getApp(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${MOCK_APP_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAppByName() {

  describe('getAppByName', () => {

    const functionToTest = AppApi.getAppByName;

    const validParams = [MOCK_APP_NAME];
    const invalidParams = [INVALID_PARAMS];

    it('should send a GET request with the correct URL path', (done) => {

      AppApi.getAppByName(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${LOOKUP_PATH}/${MOCK_APP_NAME}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetAppTypesForAppTypeIds() {

  describe('getAppTypesForAppTypeIds', () => {

    const functionToTest = AppApi.getAppTypesForAppTypeIds;

    const validParams = [[MOCK_APP_ID]];
    const invalidParams = [INVALID_SS_PARAMS];

    it('should send a POST request with the correct URL path and data', (done) => {

      AppApi.getAppTypesForAppTypeIds(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            `/${TYPE_PATH}/${BULK_PATH}`,
            [MOCK_APP_ID]
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testGetConfigurations() {

  describe('getConfigurations()', () => {

    const functionToTest = AppApi.getConfigurations;

    const validParams = [MOCK_APP_ID];
    const invalidParams = [INVALID_SS_PARAMS];

    it('should send a GET request with the correct URL path', (done) => {

      AppApi.getConfigurations(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${CONFIG_PATH}/${MOCK_APP_ID}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testInstallApp() {

  describe('installApp()', () => {

    const functionToTest = AppApi.installApp;

    const validParams = [
      MOCK_APP_ID,
      MOCK_ORGANIZATION_DM.id,
      MOCK_PREFIX
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS,
      INVALID_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      AppApi.installApp(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            `/${INSTALL_PATH}/${MOCK_APP_ID}/${MOCK_ORGANIZATION_DM.id}/${MOCK_PREFIX}`
          );
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, APP_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
