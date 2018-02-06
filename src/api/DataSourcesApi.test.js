/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../utils/axios';
import * as DataSourcesApi from './DataSourcesApi';
import { DATA_SOURCES_API } from '../constants/ApiNames';
import { INVALID_PARAMS, INVALID_PARAMS_SS } from '../utils/testing/Invalid';
import { MOCK_DATA_SOURCE_DM } from '../utils/testing/MockDataModels';
import { genRandomUUID, getMockAxiosInstance } from '../utils/testing/MockUtils';

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

describe('DataSourcesApi', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  testGetDataSource();
  testCreateOrUpdateDataSource();
  testDeleteDataSource();
  testStartSync();
  testSignalSyncCompleted();
});

function testGetDataSource() {

  describe('getDataSource()', () => {

    const functionToTest = DataSourcesApi.getDataSource;

    const validParams = [MOCK_DATA_SOURCE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_DATA_SOURCE_DM.id}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectGetRequest(functionToTest, validParams, axiosParams);
  });
}

function testCreateOrUpdateDataSource() {

  describe('createOrUpdateDataSource()', () => {

    const functionToTest = DataSourcesApi.createOrUpdateDataSource;

    const validParams = [MOCK_DATA_SOURCE_DM];
    const invalidParams = [INVALID_PARAMS];
    const axiosParams = ['/', MOCK_DATA_SOURCE_DM];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testDeleteDataSource() {

  describe('deleteDataSource()', () => {

    const functionToTest = DataSourcesApi.deleteDataSource;

    const validParams = [MOCK_DATA_SOURCE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_DATA_SOURCE_DM.id}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(functionToTest, validParams, axiosParams);
  });
}

function testStartSync() {

  describe('startSync()', () => {

    const functionToTest = DataSourcesApi.startSync;

    const validParams = [MOCK_DATA_SOURCE_DM.id];
    const invalidParams = [INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_DATA_SOURCE_DM.id}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectPostRequest(functionToTest, validParams, axiosParams);
  });
}

function testSignalSyncCompleted() {

  describe('signalSyncCompleted()', () => {

    const functionToTest = DataSourcesApi.signalSyncCompleted;
    const mockSyncId = genRandomUUID();

    const validParams = [MOCK_DATA_SOURCE_DM.id, mockSyncId];
    const invalidParams = [INVALID_PARAMS_SS, INVALID_PARAMS_SS];
    const axiosParams = [`/${MOCK_DATA_SOURCE_DM.id}/${mockSyncId}`];

    testApiShouldReturnPromise(functionToTest, validParams);
    testApiShouldUseCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiShouldSendCorrectDeleteRequest(functionToTest, validParams, axiosParams);
  });
}
