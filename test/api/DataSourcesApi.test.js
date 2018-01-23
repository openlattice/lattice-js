/* eslint-disable no-use-before-define */

import * as AxiosUtils from '../../src/utils/axios';
import * as DataSourcesApi from '../../src/api/DataSourcesApi';

import { DATA_SOURCES_API } from '../../src/constants/ApiNames';
import { getMockAxiosInstance } from '../utils/MockUtils';

import {
  INVALID_PARAMS,
  INVALID_SS_PARAMS
} from '../constants/InvalidParams';

import {
  MOCK_DATA_SOURCE_DM
} from '../constants/MockDataModels';

import {
  testApiFunctionShouldGetCorrectAxiosInstance,
  testApiFunctionShouldReturnPromiseOnValidParameters,
  testApiFunctionShouldNotThrowOnInvalidParameters,
  testApiFunctionShouldRejectOnInvalidParameters
} from '../utils/ApiTestUtils';

const MOCK_SYNC_UUID = '8f79e123-3411-4099-a41f-88e5d22d0e8d';

let mockAxiosInstance = null;

describe('DataSourcesApi', () => {

  beforeEach(() => {
    mockAxiosInstance = getMockAxiosInstance();
    spyOn(AxiosUtils, 'getApiAxiosInstance').and.returnValue(mockAxiosInstance);
  });

  afterEach(() => {
    mockAxiosInstance = null;
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

    const validParams = [
      MOCK_DATA_SOURCE_DM.id
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a GET request with the correct URL path', (done) => {

      DataSourcesApi.getDataSource(...validParams)
        .then(() => {
          expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/${MOCK_DATA_SOURCE_DM.id}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testCreateOrUpdateDataSource() {

  describe('createOrUpdateDataSource()', () => {

    const functionToTest = DataSourcesApi.createOrUpdateDataSource;

    const validParams = [
      MOCK_DATA_SOURCE_DM
    ];

    const invalidParams = [
      INVALID_PARAMS
    ];

    it('should send a POST request with the correct URL path and data', (done) => {

      DataSourcesApi.createOrUpdateDataSource(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith('/', MOCK_DATA_SOURCE_DM);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testDeleteDataSource() {

  describe('deleteDataSource()', () => {

    const functionToTest = DataSourcesApi.deleteDataSource;

    const validParams = [
      MOCK_DATA_SOURCE_DM.id
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      DataSourcesApi.deleteDataSource(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/${MOCK_DATA_SOURCE_DM.id}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testStartSync() {

  describe('startSync()', () => {

    const functionToTest = DataSourcesApi.startSync;

    const validParams = [
      MOCK_DATA_SOURCE_DM.id
    ];

    const invalidParams = [
      INVALID_SS_PARAMS
    ];

    it('should send a POST request with the correct URL path', (done) => {

      DataSourcesApi.startSync(...validParams)
        .then(() => {
          expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.post).toHaveBeenCalledWith(`/${MOCK_DATA_SOURCE_DM.id}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}

function testSignalSyncCompleted() {

  describe('signalSyncCompleted()', () => {

    const functionToTest = DataSourcesApi.signalSyncCompleted;

    const validParams = [
      MOCK_DATA_SOURCE_DM.id,
      MOCK_SYNC_UUID
    ];

    const invalidParams = [
      INVALID_SS_PARAMS,
      INVALID_SS_PARAMS
    ];

    it('should send a DELETE request with the correct URL path', (done) => {

      DataSourcesApi.signalSyncCompleted(...validParams)
        .then(() => {
          expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(1);
          expect(mockAxiosInstance.delete).toHaveBeenCalledWith(`/${MOCK_DATA_SOURCE_DM.id}/${MOCK_SYNC_UUID}`);
          done();
        })
        .catch(() => {
          done.fail();
        });
    });

    testApiFunctionShouldGetCorrectAxiosInstance(functionToTest, validParams, DATA_SOURCES_API);
    testApiFunctionShouldReturnPromiseOnValidParameters(functionToTest, validParams);
    testApiFunctionShouldNotThrowOnInvalidParameters(functionToTest, validParams, invalidParams);
    testApiFunctionShouldRejectOnInvalidParameters(functionToTest, validParams, invalidParams);

  });
}
